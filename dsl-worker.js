console.log("DSL Worker started");

let LexerClass = null;
let ParserClass = null;

/* ---------------- ERROR LISTENER ---------------- */
class CollectorErrorListener {
  constructor(errors) {
    this.errors = errors;
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg) {

    let endColumn = column + 1;

    if (offendingSymbol && offendingSymbol.text) {
      endColumn = column + offendingSymbol.text.length;
    }

    this.errors.push({
      startLine: line,
      endLine: line,
      startCol: column,
      endCol: endColumn,
      message: msg
    });
  }
}

/* ---------------- WORKER ---------------- */
self.onmessage = function(event) {

  console.log("Worker received message:", event.data);

  const msg = event.data;

  try {

    /* -------- LOAD DSL -------- */
    if (msg.type === "loadDSL") {

      const { id, name } = msg.data;
      const base = "../../generated/" + id + "/";

      // Load ANTLR runtime ONCE
      if (!self.antlr4) {
        importScripts("../../dsl-worker/antlr-bundle.js");
      }

      const antlr4 = self.antlr4;

      // Load generated lexer & parser
      importScripts(base + name + "Lexer.js");
      importScripts(base + name + "Parser.js");

      LexerClass = self[name + "Lexer"];
      ParserClass = self[name + "Parser"];

      console.log("DSL loaded in worker:", name);

      self.postMessage({
        type: "dslLoaded",
        id: id
      });

      return;
    }

    /* -------- PARSE + VALIDATE -------- */
    if (msg.type === "parse") {

      if (!LexerClass || !ParserClass) {
        self.postMessage({
          type: "error",
          error: "No DSL loaded"
        });
        return;
      }
      
      const antlr4 = self.antlr4;
      const input = msg.code;

      const errors = [];

      const chars = antlr4.CharStreams.fromString(input);
      const lexer = new LexerClass(chars);

      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new ParserClass(tokens);

      parser.removeErrorListeners();
      parser.addErrorListener(new CollectorErrorListener(errors));

      parser.buildParseTrees = true;

      const startRule = parser.ruleNames[0];
      const tree = parser[startRule]();

      self.postMessage({
        type: "parsed",
        tree: tree.toStringTree(parser.ruleNames).replace(/\(/g, '(\n').replace(/\)/g, '\n)'),
        errors: errors
      });
    }

  } catch (err) {

    console.error("Worker error:", err);

    self.postMessage({
      type: "error",
      error: err.message
    });

  }
};