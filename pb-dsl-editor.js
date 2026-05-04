import { LitElement, html, css } from 'lit-element';
import '../node_modules/ace-builds/src-noconflict/ace.js';
import '../node_modules/ace-builds/src-noconflict/mode-xml.js';
import '../node_modules/ace-builds/src-noconflict/theme-textmate.js';
import '../ace-master/src/mode/my-mode.js';

import { pbMixin } from '@teipublisher/pb-components/src/pb-mixin';
import { translate } from "@teipublisher/pb-components/src/pb-i18n";

ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');

/**
 * A dual-editor component for authoring and testing ANTLR-based Domain Specific
 * Languages (DSLs) within TEI Publisher.
 *
 * The component provides two editors:
 *
 * # Grammar Editor (ACE)
 *
 * An ACE-based editor for writing `.g4` ANTLR grammar files. When saved, the
 * grammar is sent to eXist-db where the ANTLR tool generates the corresponding
 * JavaScript lexer, parser, visitor and listener files. The DSL name is
 * extracted automatically from the grammar declaration line — no separate name
 * field is required.
 *
 * ```html
 * <pb-dsl-editor></pb-dsl-editor>
 * ```
 *
 * A unique id must be entered before saving. The grammar declaration must follow
 * standard ANTLR syntax:
 *
 * ```antlr
 * grammar calculator;
 * // ... rules ...
 * ```
 *
 * # DSL Playground (Monaco)
 *
 * A Monaco-based editor for testing expressions against a previously saved DSL.
 * Select a DSL from the dropdown to load its generated ANTLR files into the
 * Web Worker. As you type, the input is parsed in real time:
 *
 * - Syntax errors are highlighted inline as red underlines.
 * - A collapsible parse tree is displayed below the editor, with rule nodes
 *   shown in blue and token nodes in green.
 *
 * ```html
 * <pb-dsl-editor dsl-id="01" tab-size="2"></pb-dsl-editor>
 * ```
 *
 * # ID uniqueness
 *
 * The component validates that the chosen DSL id is not already taken before
 * saving. If a duplicate id is entered, an error message is shown and the save
 * is blocked. The dropdown shows both name and id to help distinguish DSLs that
 * share the same grammar name:
 *
 * ```
 * calculator (01)
 * calculator (02)
 * ```
 *
 * @fires code-changed - Fired whenever the content of the ACE grammar editor
 *   changes. The event detail contains the current grammar source.
 *   `detail: { code: String }`
 */
export class PbDslEditor extends pbMixin(LitElement) {

  static get properties() {
    return {
      ...super.properties,

      /**
       * The current grammar source displayed in the ACE editor.
       * Reflected as an attribute so it can be set declaratively.
       */
      code: { type: String, reflect: true },

      /**
       * The ACE editor mode (e.g. `"xml"`).
       */
      mode: { type: String },

      /**
       * The unique identifier for the DSL being authored. Must be unique
       * across all saved DSLs — duplicates are rejected before saving.
       */
      dslId: { type: String },

      /**
       * The name of the DSL. Automatically extracted from the grammar
       * declaration line (e.g. `grammar calculator;` → `"calculator"`).
       * This value must match the grammar name exactly for the generated
       * ANTLR files to load correctly in the Monaco playground.
       */
      dslName: { type: String },

      /**
       * List of all DSLs currently stored in eXist-db. Loaded on
       * initialisation and refreshed after each successful save.
       * Each entry has the shape `{ id: String, name: String, grammar: String }`.
       */
      dsls: { type: Array },

      /**
       * The currently selected DSL object from the playground dropdown.
       */
      selectedDsl: { type: Object },

      /**
       * Optional label for the component, for use in parent layouts.
       */
      label: { type: String },

      /**
       * Placeholder translation key shown when the ACE editor is empty.
       */
      placeholder: { type: String },

      /**
       * Number of spaces used for indentation in the ACE editor.
       */
      tabSize: { type: Number },

      /**
       * Attribute to enable or disable linting in the ACE editor.
       * @attr
       */
      linter: { attribute: true },

      /**
       * Internal status message shown below the Save button.
       * Shape: `{ text: String, type: 'error'|'success'|'info' }`.
       * Clears automatically after 4 seconds for success and info types.
       */
      _statusMessage: { type: Object },

      /**
       * The grammar name detected from the current ACE editor content.
       * Updated only when the grammar declaration line changes, to avoid
       * triggering unnecessary re-renders of the Monaco editor.
       */
      _detectedGrammarName: { type: String },

      /**
       * The last generated XML parse tree string, available for download.
       * Set each time a parse result is received from the Web Worker.
       */
      _lastXml: { type: String },
    };
  }

  constructor() {
    super();
    this.code                 = 'grammar Sample_Text;';
    this.mode                 = 'xml';
    this.placeholder          = 'odd.editor.model.empty';
    this.tabSize              = 2;
    this.dslId                = '';
    this.dslName              = '';
    this.dsls                 = [];
    this.selectedDsl          = null;
    this._statusMessage       = null;
    this._detectedGrammarName = this._extractGrammarName(this.code) ?? null;
    this._lastXml             = null;
    this._editor              = null;
    this._monacoEditor        = null;
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated() {
    super.firstUpdated();
    this._injectAceStyles();
    this._initAceEditor();
    this._injectMonacoStyles();
    this._loadMonaco().then(() => this._initMonacoEditor());
    this._loadDsls();
  }

  /* ---------------- ACE Editor ---------------- */

  _injectAceStyles() {
    if (this.shadowRoot.querySelector('#ace-css')) return;
    const aceCss = document.createElement('link');
    aceCss.rel = 'stylesheet';
    aceCss.href = '/node_modules/ace-builds/css/ace.css';
    const themeCss = document.createElement('link');
    themeCss.rel = 'stylesheet';
    themeCss.href = '/node_modules/ace-builds/css/theme/textmate.css';
    this.shadowRoot.prepend(themeCss);
    this.shadowRoot.prepend(aceCss);
  }

  _initAceEditor() {
    const ace = window.ace;
    if (!ace) { console.error('Ace not loaded'); return; }
    ace.config.set("basePath",           "/ace-master/src");
    ace.config.set("themePath",          "/ace-master/src/theme");
    ace.config.set("modePath",           "/ace-master/src/mode");
    ace.config.set("workerPath",         "/ace-master/src/worker");
    ace.config.set("loadWorkerFromBlob", false);
    const editorDiv = this.shadowRoot.getElementById('editor');
    this._editor = ace.edit(editorDiv);
    this._editor.setTheme('ace/theme/textmate');
    this._editor.session.setMode('ace/mode/my-mode');
    this._editor.setValue(this.code || '', -1);
    this._editor.on('change', () => {
      this._setCode();
      // Only re-render when the detected grammar name actually changes,
      // not on every keystroke — avoids destroying the Monaco editor instance
      const newName = this._extractGrammarName(this._editor.getValue());
      if (newName !== this._detectedGrammarName) {
        this._detectedGrammarName = newName;
        this.requestUpdate();
      }
    });
    this._editor.focus();
  }

  /**
   * Returns the current content of the ACE grammar editor.
   * @returns {String} The grammar source currently in the editor.
   */
  getSource() { return this._editor ? this._editor.getValue() : ''; }

  _setCode() {
    this.dispatchEvent(new CustomEvent('code-changed', {
      composed: true, bubbles: true,
      detail: { code: this.getSource() },
    }));
  }

  _extractGrammarName(source) {
    if (!source) return null;
    const match = source.match(/^\s*grammar\s+(\w+)\s*;/m);
    return match ? match[1] : null;
  }

  _setStatus(text, type = 'info') {
    this._statusMessage = { text, type };
    if (type === 'success' || type === 'info') {
      setTimeout(() => { this._statusMessage = null; }, 4000);
    }
  }

  /* ---------------- Monaco Editor ---------------- */

  _injectMonacoStyles() {
    if (this.shadowRoot.querySelector('#monaco-css')) return;
    const monacoCss = document.createElement('link');
    monacoCss.id   = "monaco-css";
    monacoCss.rel  = "stylesheet";
    monacoCss.href = "/node_modules/monaco-editor/min/vs/editor/editor.main.css";
    this.shadowRoot.prepend(monacoCss);
  }

  _loadMonaco() {
    return new Promise(resolve => {
      if (window.monaco) { resolve(); return; }
      window.MonacoEnvironment = {
        getWorkerUrl: () => "/node_modules/monaco-editor/min/vs/base/worker/workerMain.js"
      };
      const script = document.createElement("script");
      script.src = "/node_modules/monaco-editor/min/vs/loader.js";
      script.onload = () => {
        window.require.config({ paths: { vs: "/node_modules/monaco-editor/min/vs" } });
        window.require(["vs/editor/editor.main"], () => resolve());
      };
      document.head.appendChild(script);
    });
  }

  _initMonacoEditor() {
    const container = this.shadowRoot.getElementById("playground-editor");

    this._monacoEditor = monaco.editor.create(container, {
      value: "// Write DSL expressions here",
      language: "plaintext",
      theme: "vs-light",
      automaticLayout: true
    });

    this._worker = new Worker(
      new URL("./workers/dsl-worker.js", import.meta.url),
      { type: "module" }
    );
    this._dslLoaded = false;

    this._worker.onmessage = (event) => {
      const msg = event.data;

      if (msg.type === "error") {
        console.error(msg.error);
        return;
      }

      if (msg.type === "dslLoaded") {
        this._dslLoaded = true;
      }

      if (msg.type === "parsed") {
        this._renderXmlTree(msg.tree);
        this._showErrors(msg.errors || []);
      }
    };

    this._monacoEditor.onDidChangeModelContent(() => {
      if (!this._dslLoaded) return;
      this._worker.postMessage({
        type: "parse",
        code: this._monacoEditor.getValue()
      });
    });
  }

  /* ---------------- Parse Tree Renderer ---------------- */

  _buildXmlString(node, indent = 0) {
    const pad = '  '.repeat(indent);

    if (node.type === 'token') {
      // Escape XML special characters in token text
      const escaped = node.label
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      return `${pad}${escaped}`;
    }

    const tag      = node.label;
    const children = (node.children || [])
      .map(child => this._buildXmlString(child, indent + 1))
      .join('\n');

    return `${pad}<${tag}>\n${children}\n${pad}</${tag}>`;
  }

  _renderXmlTree(tree) {
    // Build and store raw XML for the download button
    this._lastXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                    this._buildXmlString(tree, 0);

    // Syntax-highlight for display — escape HTML first, then re-apply spans
    const highlighted = this._lastXml
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/(&lt;\/?)([\w-]+)(&gt;)/g,
        '<span class="xml-tag">$1<span class="xml-name">$2</span>$3</span>')
      .replace(/(&lt;\?xml[^&]*\?&gt;)/g,
        '<span class="xml-decl">$1</span>');

    const container = this.shadowRoot.getElementById("parse-tree");
    container.innerHTML = `<pre class="xml-content">${highlighted}</pre>`;
  }

  _downloadXml() {
    if (!this._lastXml) return;

    const filename = (this.selectedDsl?.name ?? 'parse-tree') + '.xml';
    const blob     = new Blob([this._lastXml], { type: 'application/xml' });
    const url      = URL.createObjectURL(blob);

    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  /* ---------------- Error Display ---------------- */

  _showErrors(errors) {
    const model   = this._monacoEditor.getModel();
    const markers = errors.map(err => ({
      startLineNumber: err.startLine,
      endLineNumber:   err.endLine,
      startColumn:     err.startCol + 1,
      endColumn:       err.endCol + 1,
      message:         err.message,
      severity:        monaco.MarkerSeverity.Error
    }));
    monaco.editor.setModelMarkers(model, "dsl", markers);
  }

  /* ---------------- DSL Selector ---------------- */

  _loadDsls() {
    fetch("http://localhost:8081/exist/apps/tei-publisher/api/dsls")
      .then(r => r.json())
      .then(data => { this.dsls = data; })
      .catch(e => { console.error("Failed to load DSLs:", e); this.dsls = []; });
  }

  _selectDsl(e) {
    const id = e.target.value;
    this.selectedDsl = this.dsls.find(d => d.id === id);
    this._worker.postMessage({ type: "loadDSL", data: this.selectedDsl });

    const onMessage = (event) => {
      if (event.data.loadedDsl === this.selectedDsl.id) {
        this._dslLoaded = true;
        this._worker.removeEventListener("message", onMessage);
      }
    };
    this._worker.addEventListener("message", onMessage);
  }

  /* ---------------- DSL Save ---------------- */

  /**
   * Loads an existing DSL from eXist-db by id and populates the ACE editor
   * with its grammar content. Can be called programmatically by a parent
   * component to pre-load a specific DSL for editing.
   *
   * @param {String} id - The unique DSL id to load.
   * @returns {Promise<void>}
   */
  async loadDsl(id) {
    const response = await fetch(`http://localhost:8081/exist/apps/tei-publisher/api/dsls/${id}`);
    const data     = await response.json();
    this.dslId     = data.id;
    this.dslName   = data.name;
    this.code      = data.grammar;
    if (this._editor) { this._editor.setValue(this.code, -1); }
  }

  async _saveDsl() {
    if (!this.dslId) {
      this._setStatus('DSL id is required.', 'error');
      return;
    }

    const grammarName = this._extractGrammarName(this.getSource());
    if (!grammarName) {
      this._setStatus(
        'No valid grammar declaration found. Make sure your grammar starts with "grammar YourName;"',
        'error'
      );
      return;
    }

    this.dslName = grammarName;

    const duplicate = this.dsls.find(d => d.id === this.dslId);
    if (duplicate) {
      this._setStatus(
        `ID "${this.dslId}" is already taken by "${duplicate.name}". Please choose a different ID.`,
        'error'
      );
      return;
    }

    this._setStatus(`Saving DSL "${this.dslName}"...`, 'info');

    try {
      const payload  = { id: this.dslId, name: this.dslName, grammar: this.getSource() };
      const response = await fetch(
        'http://localhost:8081/exist/apps/tei-publisher/api/dsls',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }

      this._setStatus(`DSL "${this.dslName}" saved successfully.`, 'success');
      this._loadDsls();

    } catch(e) {
      this._setStatus(`Save failed: ${e.message}`, 'error');
    }
  }

  /* ---------------- UI ---------------- */

  render() {
    return html`
      <div class="dsl-meta">
        <input type="text" placeholder="DSL id"
          .value=${this.dslId}
          @input=${e => { this.dslId = e.target.value; this._statusMessage = null; }} />
        <span class="grammar-name-hint">
          ${this._detectedGrammarName
            ? html`Grammar: <strong>${this._detectedGrammarName}</strong>`
            : html`<em>No grammar declaration found</em>`}
        </span>
      </div>

      <h3>Grammar Editor</h3>
      <div id="editor" class="editor"></div>

      <button @click=${this._saveDsl}>Save grammar</button>

      ${this._statusMessage ? html`
        <div class="status-message status-${this._statusMessage.type}">
          ${this._statusMessage.text}
        </div>` : ''}

      <hr>

      <h3>DSL Playground</h3>
      <select @change=${this._selectDsl}>
        <option value="">Select DSL</option>
        ${this.dsls.map(d => html`<option value=${d.id}>${d.name} (${d.id})</option>`)}
      </select>

      <div id="playground-editor" class="editor"></div>

      <div class="parse-tree-header">
        <span>Parse Tree</span>
        <button
          class="download-btn"
          @click=${this._downloadXml}
          ?disabled=${!this._lastXml}>
          ⬇ Download XML
        </button>
      </div>
      <div id="parse-tree" class="parse-tree"></div>
    `;
  }

  refresh() {}

  static get styles() {
    return css`
      :host { display: block; width: 100%; }

      .editor {
        width: 500px;
        height: 300px;
        border: 1px solid #ccc;
        margin-top: 10px;
      }

      .dsl-meta {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        align-items: center;
      }

      .grammar-name-hint        { font-size: 13px; color: #555; align-self: center; }
      .grammar-name-hint strong { color: #1a1aa6; }
      .grammar-name-hint em     { color: #f44336; }

      .status-message {
        margin-top: 8px;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 13px;
        width: 500px;
        box-sizing: border-box;
      }

      .status-error   { background: #fdecea; border: 1px solid #f44336; color: #b71c1c; }
      .status-success { background: #e8f5e9; border: 1px solid #4caf50; color: #1b5e20; }
      .status-info    { background: #e3f2fd; border: 1px solid #2196f3; color: #0d47a1; }

      .parse-tree-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 500px;
        margin-top: 10px;
        font-size: 13px;
        font-weight: bold;
        color: #333;
      }

      .download-btn {
        font-size: 12px;
        padding: 3px 10px;
        cursor: pointer;
        border: 1px solid #2196f3;
        border-radius: 4px;
        background: #e3f2fd;
        color: #0d47a1;
      }

      .download-btn:hover:not(:disabled) {
        background: #2196f3;
        color: white;
      }

      .download-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .parse-tree {
        font-family: monospace;
        font-size: 13px;
        margin-top: 4px;
        padding: 10px;
        border: 1px solid #ccc;
        background: #fafafa;
        max-height: 400px;
        overflow-y: auto;
        width: 500px;
        box-sizing: border-box;
      }

      .xml-content {
        margin: 0;
        white-space: pre;
        font-family: monospace;
        font-size: 13px;
      }

      .xml-decl { color: #888; }
      .xml-tag  { color: #1a1aa6; }
      .xml-name { color: #1a1aa6; font-weight: bold; }
    `;
  }
}

customElements.define('pb-dsl-editor', PbDslEditor);