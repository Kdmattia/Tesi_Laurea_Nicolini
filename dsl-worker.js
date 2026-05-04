// dsl-worker.js
console.log("DSL Worker started");

const ANTLR_URL  = "../../antlr4/runtime/JavaScript/dist/antlr4.js";
const EXIST_BASE = "http://localhost:8081/exist/rest/db/apps/tei-publisher/generated/";

let antlr4      = null;
let LexerClass  = null;
let ParserClass = null;

/* ---------------- UTILITY: patch and import a generated file ---------------- */
async function importPatched(url, blobRegistry = {}) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const source  = await response.text();
  const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);

  const patched = source

    // 1. Replace antlr4 import with global reference
    .replace(
      /import\s+antlr4\s+from\s+['"]antlr4['"]\s*;?/g,
      `const antlr4 = self.antlr4;`
    )

    // 2. Rewrite relative imports to pre-patched blob URLs if available,
    //    otherwise rewrite to full eXist-db URLs
    .replace(
      /from\s+['"](\.\/[^'"]+)['"]/g,
      (match, relativePath) => {
        const filename = relativePath.replace('./', '');
        const fullUrl  = baseUrl + filename;
        const blobUrl  = blobRegistry[fullUrl];
        return blobUrl ? `from '${blobUrl}'` : `from '${fullUrl}'`;
      }
    );

  const blob    = new Blob([patched], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);

  // Register so dependents can reference this patched version
  blobRegistry[url] = blobUrl;

  // Note: do NOT revoke here — dependent modules still need this blob URL alive
  const mod = await import(blobUrl);
  return mod;
}

/* ---------------- ERROR LISTENER ---------------- */
class CollectorErrorListener {
  constructor(errors) {
    this.errors = errors;
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg) {
    const endColumn = offendingSymbol?.text
      ? column + offendingSymbol.text.length
      : column + 1;

    this.errors.push({
      startLine: line,
      endLine:   line,
      startCol:  column,
      endCol:    endColumn,
      message:   msg
    });
  }
}

/* ---------------- WORKER ---------------- */
self.onmessage = async (event) => {
  console.log("Worker received message:", event.data);
  const msg = event.data;

  try {

    /* -------- LOAD DSL -------- */
    if (msg.type === "loadDSL") {
      const { id, name } = msg.data;

      // Step 1: Load ANTLR runtime once
      if (!antlr4) {
        self.window = self; // UMD bundle checks for window
        await import(ANTLR_URL);
        antlr4 = self.antlr4;
        console.log("ANTLR runtime loaded, CharStreams:", !!antlr4?.CharStreams);

        if (!antlr4?.CharStreams) {
          throw new Error("ANTLR runtime loaded but CharStreams is missing. Check antlr4.js bundle.");
        }
      }

      const base = EXIST_BASE + id + "/";

      // Shared registry: maps full eXist-db URL -> blob URL
      // Ensures parser's relative imports resolve to already-patched blobs
      const blobRegistry = {};

      // Step 2: Patch listener and visitor first so their blob URLs
      // are in the registry before the parser needs them
      console.log("Patching listener and visitor...");
      await importPatched(base + name + "Listener.js", blobRegistry);
      await importPatched(base + name + "Visitor.js",  blobRegistry);

      // Step 3: Patch lexer and parser
      // Relative imports inside parser will resolve to blob URLs from registry
      console.log("Patching lexer and parser...");
      const lexerModule  = await importPatched(base + name + "Lexer.js",  blobRegistry);
      const parserModule = await importPatched(base + name + "Parser.js", blobRegistry);

      // Step 4: Revoke all blob URLs — everything is imported and in memory now
      Object.values(blobRegistry).forEach(u => URL.revokeObjectURL(u));

      LexerClass  = lexerModule.default  ?? Object.values(lexerModule)[0];
      ParserClass = parserModule.default ?? Object.values(parserModule)[0];

      if (!LexerClass || !ParserClass) {
        throw new Error(`Could not extract Lexer/Parser classes for DSL: ${name}`);
      }

      console.log("DSL loaded successfully:", name, { LexerClass, ParserClass });
      self.postMessage({ type: "dslLoaded", id });
      return;
    }

  /* -------- PARSE -------- */
  if (msg.type === "parse") {
    if (!LexerClass || !ParserClass) {
      self.postMessage({ type: "error", error: "No DSL loaded yet" });
      return;
    }

    const errors = [];

    const chars = antlr4.CharStreams.fromString(msg.code);
    const lexer = new LexerClass(chars);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new CollectorErrorListener(errors));

    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ParserClass(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(new CollectorErrorListener(errors));
    parser.buildParseTrees = true;

    const startRule = parser.ruleNames[0];
    const tree      = parser[startRule]();

    // Build structured JSON tree instead of flat string
    function buildTreeObject(node, ruleNames) {
      const isTerminal = !node.children || node.children.length === 0;
      if (isTerminal) {
        return {
          label: node.symbol ? node.symbol.text : node.toString(),
          type:  "token"
        };
      }
      return {
        label:    ruleNames[node.ruleIndex] ?? "unknown",
        type:     "rule",
        children: node.children.map(child => buildTreeObject(child, ruleNames))
      };
    }

    self.postMessage({
      type:   "parsed",
      tree:   buildTreeObject(tree, parser.ruleNames),
      errors: errors
    });
  }

  } catch (err) {
    console.error("Worker error:", err);
    self.postMessage({ type: "error", error: err.message });
  }
};