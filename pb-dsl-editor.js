import { LitElement, html, css } from 'lit-element';
import '../node_modules/ace-builds/src-noconflict/ace.js';
import '../node_modules/ace-builds/src-noconflict/mode-xml.js';
import '../node_modules/ace-builds/src-noconflict/theme-textmate.js';
import '../ace-master/src/mode/my-mode.js';

import { pbMixin } from '@teipublisher/pb-components/src/pb-mixin';
import { translate } from "@teipublisher/pb-components/src/pb-i18n";

ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');

export class PbDslEditor extends pbMixin(LitElement) {

  static get properties() {
    return {
      ...super.properties,
      code:        { type: String, reflect: true },
      mode:        { type: String },
      dslId:       { type: String },
      dslName:     { type: String },
      dsls:        { type: Array },
      selectedDsl: { type: Object },
      label:       { type: String },
      placeholder: { type: String },
      tabSize:     { type: Number },
      linter:      { attribute: true },
    };
  }

  constructor() {
    super();
    this.code        = 'grammar Sample_Text;';
    this.mode        = 'xml';
    this.placeholder = 'odd.editor.model.empty';
    this.tabSize     = 2;
    this.dslId       = '';
    this.dslName     = '';
    this.dsls        = [];
    this.selectedDsl = null;
    this._editor        = null;
    this._monacoEditor  = null;
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
    ace.config.set("basePath",    "/ace-master/src");
    ace.config.set("themePath",   "/ace-master/src/theme");
    ace.config.set("modePath",    "/ace-master/src/mode");
    ace.config.set("workerPath",  "/ace-master/src/worker");
    ace.config.set("loadWorkerFromBlob", false);
    const editorDiv = this.shadowRoot.getElementById('editor');
    this._editor = ace.edit(editorDiv);
    this._editor.setTheme('ace/theme/textmate');
    this._editor.session.setMode('ace/mode/my-mode');
    this._editor.setValue(this.code || '', -1);
    this._editor.on('change', () => this._setCode());
    this._editor.focus();
  }

  getSource() { return this._editor ? this._editor.getValue() : ''; }

  _setCode() {
    this.dispatchEvent(new CustomEvent('code-changed', {
      composed: true, bubbles: true,
      detail: { code: this.getSource() },
    }));
  }

  /* ---------------- Monaco Editor ---------------- */
  _injectMonacoStyles() {
    if (this.shadowRoot.querySelector('#monaco-css')) return;
    const monacoCss = document.createElement('link');
    monacoCss.id  = "monaco-css";
    monacoCss.rel = "stylesheet";
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
        console.log("DSL loaded");
      }

      if (msg.type === "parsed") {
        // Render structured parse tree
        const treeContainer = this.shadowRoot.getElementById("parse-tree");
        treeContainer.innerHTML = "";
        treeContainer.appendChild(this._renderTree(msg.tree));

        this._showErrors(msg.errors || []);
      }
    };

    this._monacoEditor.onDidChangeModelContent(() => {
      if (!this._dslLoaded) return;
      const code = this._monacoEditor.getValue();
      console.log("Sending parse request");
      this._worker.postMessage({ type: "parse", code });
    });
  }

  /* ---------------- Parse Tree Renderer ---------------- */
  _renderTree(node) {
    const item = document.createElement("div");
    item.className = "tree-node";

    const label = document.createElement("span");
    label.className = node.type === "rule" ? "tree-rule" : "tree-token";

    if (node.children && node.children.length > 0) {
      // Collapsible rule node
      label.textContent = "▾ " + node.label;
      label.style.cursor = "pointer";

      const childContainer = document.createElement("div");
      childContainer.className = "tree-children";

      node.children.forEach(child => {
        childContainer.appendChild(this._renderTree(child));
      });

      label.addEventListener("click", () => {
        const collapsed = childContainer.style.display === "none";
        childContainer.style.display = collapsed ? "block" : "none";
        label.textContent = (collapsed ? "▾ " : "▸ ") + node.label;
      });

      item.appendChild(label);
      item.appendChild(childContainer);
    } else {
      // Leaf token node
      label.textContent = node.label;
      item.appendChild(label);
    }

    return item;
  }

  /* ---------------- Error Display ---------------- */
  _showErrors(errors) {
    const model = this._monacoEditor.getModel();
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
  async _loadDsls() {
    try {
      const response = await fetch("http://localhost:8081/exist/apps/tei-publisher/api/dsls");
      this.dsls = await response.json();
    } catch(e) {
      console.error("Failed to load DSLs:", e);
      this.dsls = [];
    }
  }

  _selectDsl(e) {
    const id = e.target.value;
    this.selectedDsl = this.dsls.find(d => d.id === id);
    console.log("Selected DSL:", this.selectedDsl);
    this._worker.postMessage({ type: "loadDSL", data: this.selectedDsl });

    const onMessage = (event) => {
      const msg = event.data;
      if (msg.loadedDsl === this.selectedDsl.id) {
        console.log("DSL loaded in worker:", this.selectedDsl.name);
        this._dslLoaded = true;
        this._worker.removeEventListener("message", onMessage);
      }
    };
    this._worker.addEventListener("message", onMessage);
  }

  /* ---------------- DSL Save ---------------- */
  async _saveDsl() {
    if (!this.dslId || !this.dslName) { alert('DSL id and name are required'); return; }
    const payload = { id: this.dslId, name: this.dslName, grammar: this.getSource() };
    console.log("SAVING:", payload);
    const response = await fetch(
      'http://localhost:8081/exist/apps/tei-publisher/api/dsls',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    if (!response.ok) { const text = await response.text(); throw new Error(text || response.statusText); }
    const text = await response.text();
    if (text) { console.log('DSL saved:', JSON.parse(text).id); }
    else      { console.log('DSL saved (empty response)'); }
    this._loadDsls();
  }

  async loadDsl(id) {
    const response = await fetch(`http://localhost:8081/exist/apps/tei-publisher/api/dsls/${id}`);
    const data = await response.json();
    this.dslId   = data.id;
    this.dslName = data.name;
    this.code    = data.grammar;
    if (this._editor) { this._editor.setValue(this.code, -1); }
  }

  /* ---------------- UI ---------------- */
  render() {
    return html`
      <div class="dsl-meta">
        <input type="text" placeholder="DSL id"   .value=${this.dslId}   @input=${e => this.dslId   = e.target.value} />
        <input type="text" placeholder="DSL name" .value=${this.dslName} @input=${e => this.dslName = e.target.value} />
      </div>

      <h3>Grammar Editor</h3>
      <div id="editor" class="editor"></div>
      <button @click=${this._saveDsl}>Save grammar</button>

      <hr>

      <h3>DSL Playground</h3>
      <select @change=${this._selectDsl}>
        <option value="">Select DSL</option>
        ${this.dsls.map(d => html`<option value=${d.id}>${d.name}</option>`)}
      </select>

      <div id="playground-editor" class="editor"></div>
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
      }

      .parse-tree {
        font-family: monospace;
        font-size: 13px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        background: #fafafa;
        max-height: 400px;
        overflow-y: auto;
        width: 500px;
        box-sizing: border-box;
      }

      .tree-node {
        margin-left: 16px;
      }

      .tree-rule {
        color: #1a1aa6;
        font-weight: bold;
        display: block;
        padding: 1px 0;
        user-select: none;
      }

      .tree-rule:hover {
        background: #e8f0fe;
      }

      .tree-token {
        color: #2e7d32;
        display: block;
        padding: 1px 0;
        margin-left: 16px;
      }

      .tree-children {
        border-left: 1px dashed #ccc;
        margin-left: 8px;
      }
    `;
  }
}

customElements.define('pb-dsl-editor', PbDslEditor);