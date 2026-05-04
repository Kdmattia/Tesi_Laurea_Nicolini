importScripts("worker-base.js");                                // your base worker code
importScripts("antlr-bundle.js");

// 🔑 SAFETY CHECK
if (!self.antlrBundle) {
  throw new Error("antlrBundle not found. Check webpack output.");
}

const {
  antlr4,
  ANTLRv4Lexer: ANTLRv4LexerModule,
  ANTLRv4Parser: ANTLRv4ParserModule
} = self.antlrBundle;

// ES module default export workaround
const ANTLRv4Lexer = self.antlrBundle.ANTLRv4Lexer.default;
const ANTLRv4Parser = self.antlrBundle.ANTLRv4Parser.default;



console.log("antlrBundle:", self.antlrBundle);
console.log("antlr4:", antlr4);

// class for gathering errors and posting them to ACE editor
var AnnotatingErrorListener = function(annotations) {
    antlr4.error.ErrorListener.call(this);
    this.annotations = annotations;
    return this;
};

AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.annotations.push({
        row: line - 1,
        column: column,
        text: msg,
        type: "error"
 });
};


ace.define('worker-antlr',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var MyWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$dialect = null;
    };

    oop.inherits(MyWorker, Mirror);

    (function() {

        this.onUpdate = function() {
            var value = this.doc.getValue();
            var annotations = validate(value);
            this.sender.emit("annotate", annotations);
        };

    }).call(MyWorker.prototype);

    exports.MyWorker = MyWorker;
});

var validate = function(input) {
    var chars = new antlr4.CharStreams.fromString(input);
    var lexer = new ANTLRv4Lexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new ANTLRv4Parser(tokens);
    var annotations = [];
    var listener = new AnnotatingErrorListener(annotations)
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    parser.grammarSpec();
    return annotations;
};
