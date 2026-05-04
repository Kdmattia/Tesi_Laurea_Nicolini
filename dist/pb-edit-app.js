import{p as e,_ as t,h as p,c as a,L as o}from"./pb-mixin-fdfbc739.js";import{t as i}from"./paper-inky-focus-behavior-b5e152b3.js";import"./paper-checkbox-d6ebdce3.js";import"./iron-form-1f9fbdaa.js";class n extends(e(o)){static get properties(){return t(t({},super.properties),{},{error:{type:String},url:{type:String},templates:{type:Array},odds:{type:Array}})}constructor(){super(),this.templates=[],this.odds=[]}connectedCallback(){super.connectedCallback()}firstUpdated(){const e=this.shadowRoot.getElementById("form"),t=this.shadowRoot.getElementById("defaultView"),p=this.shadowRoot.getElementById("index"),a=this.shadowRoot.getElementById("template");this.subscribeTo("pb-i18n-update",e=>{const t=this.shadowRoot.querySelector("#defaultView paper-listbox");let p=t.selected;t.selected=void 0,t.selected=p;const a=this.shadowRoot.querySelector("#index paper-listbox");p=a.selected,a.selected=void 0,a.selected=p},[]),n.waitOnce("pb-page-ready",e=>{fetch(e.endpoint+"/modules/lib/components-list-templates.xql",{method:"GET",mode:"cors",credentials:"same-origin"}).then(e=>e.json()).then(e=>{this.templates=e}),fetch(e.endpoint+"/modules/lib/components-list-odds.xql",{method:"GET",mode:"cors",credentials:"same-origin"}).then(e=>e.json()).then(e=>{this.odds=e});this.shadowRoot.querySelector("form").action=e.endpoint+"/modules/components-generate.xql"}),e.addEventListener("iron-form-presubmit",(function(){const e=t.selectedItem.getAttribute("value");this.request.body["default-view"]=e,this.request.body.index=p.selectedItem.getAttribute("value"),this.request.body.template=a.selectedItem.getAttribute("value")})),e.addEventListener("iron-form-response",e=>e.detail.completes.then(e=>{this.emitTo("pb-end-update");const t=e.parseResponse();if(console.log("<pb-edit-app> Received response: %o",t),"ok"===t.result){const e=window.location.href.replace(/^(.*)\/tei-publisher\/.*/,"$1");this.url=e+"/"+this.shadowRoot.querySelector("paper-input[name=abbrev]").value,this.error=null}else this.error=t.message;this.shadowRoot.getElementById("dialog").open()})),e.addEventListener("iron-form-invalid",()=>this.emitTo("pb-end-update"))}_doSubmit(){this.emitTo("pb-start-update");this.shadowRoot.getElementById("form").submit()}render(){return p`
            <iron-form id="form">
                <form action="modules/components-generate.xql" method="POST" accept="application/json" enctype="application/json">
                    <fieldset>
                        <legend>${i("document.selectODD")}</legend>
                        ${this.odds.map(e=>p`<paper-checkbox name="odd" value="${e.name}">${e.label}</paper-checkbox>`)}
                    </fieldset>
                    <paper-input name="uri" type="url" required placeholder="http://exist-db.org/apps/my-simple-app"
                        label="${i("appgen.uri")}" auto-validate></paper-input>
                    <paper-input id="abbrev" name="abbrev" pattern="[a-zA-Z0-9-_]+" required placeholder="${i("appgen.abbrev.placeholder")}"
                        label="${i("appgen.abbrev.label")}" auto-validate></paper-input>
                    <paper-input name="data-collection" pattern="[a-zA-Z0-9-_/]+" placeholder="data"
                        label="${i("appgen.collection")}" auto-validate></paper-input>
                    <paper-input name="title" required placeholder="${i("appgen.title.label")}"
                        label="${i("appgen.title.help")}"></paper-input>
                    <fieldset>
                        <legend>${i("appgen.template.help")}</legend>
                        <paper-dropdown-menu id="template" label="${i("appgen.template.label")}" name="template">
                            <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="value" selected="view.html">
                            ${this.templates.map(e=>p`<paper-item value="${e.name}">${e.title}</paper-item>`)}
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </fieldset>
                    <fieldset>
                        <legend>${i("appgen.view.help")}</legend>
                        <paper-dropdown-menu id="defaultView" label="${i("appgen.label")}" name="default-view">
                            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="div" attr-for-selected="value">
                                <paper-item value="div">${i("appgen.view.div")}</paper-item>
                                <paper-item value="page">${i("appgen.view.page")}</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </fieldset>
                    <fieldset>
                        <legend>${i("appgen.index.help")}</legend>
                        <paper-dropdown-menu id="index" label="${i("appgen.index.label")}" name="index">
                            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="tei:div" attr-for-selected="value">
                                <paper-item value="tei:div">${i("appgen.index.index-div")}</paper-item>
                                <paper-item value="tei:text">${i("appgen.index.index-text")}</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </fieldset>
                    <fieldset>
                        <legend>${i("appgen.account.user")}</legend>
                        <paper-input name="owner" required placeholder="${i("login.user")}"
                            label="${i("appgen.account.owner")}" auto-validate></paper-input>
                        <paper-input name="password" type="password" required placeholder="${i("login.password")}"
                            label="${i("appgen.account.password")}" auto-validate></paper-input>
                    </fieldset>
                    <paper-button id="submit" @click="${this._doSubmit}"><iron-icon icon="save"></iron-icon> ${i("appgen.submit")}</paper-button>
                </form>
            </iron-form>
            <paper-dialog id="dialog">
                <h2>${i("appgen.dialog.title")}</h2>
                <div id="dialogContent">
                ${this.error?p`<div id="error">${this.error}</div>`:p`<a href="${this.url}" target="_blank">
                            <paper-button><iron-icon icon="icons:open-in-new"></iron-icon> ${i("appgen.open")}</paper-button>
                        </a>
                        <p>${i("appgen.success")}</p>`}
                </div>
                <div class="buttons">
                    <paper-button dialog-dismiss autofocus>${i("dialogs.close")}</paper-button>
                </div>
            </paper-dialog>
        `}static get styles(){return a`
            :host {
                display: block;
            }
            paper-dropdown-menu {
                width: 100%;
                max-width: 864px;
            }
            fieldset {
                margin-top: 16px;
                margin-bottom: 16px;
                padding: 0;
                border: 0;
            }
            legend {
                color: #909090;
            }
            paper-checkbox {
                display: block;
                margin-left: 20px;
                margin-top: 10px;
            }
            paper-dialog {
                min-width: 420px;
                max-width: 640px;
                min-height: 128px;
            }

            paper-dialog h2 {
                background-color: #607D8B;
                padding: 16px 8px;
                margin-top: 0;
                color: #F0F0F0;
            }

            .content {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .content a {
                display: block;
                flex: 1 0;
            }
        `}}customElements.define("pb-edit-app",n);export{n as PbEditApp};
