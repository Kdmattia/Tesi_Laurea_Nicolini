// Generated from /tmp/antlr_gen8289900296528230961/Euporia.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import EuporiaListener from './EuporiaListener.js';
import EuporiaVisitor from './EuporiaVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u001a`\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002\u0006",
    "\u0002 \n\u0002\r\u0002\u000e\u0002!\u0003\u0002\u0003\u0002\u0003\u0003",
    "\u0005\u0003\'\n\u0003\u0003\u0003\u0005\u0003*\n\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0005\u00043\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0006\u0007:\n\u0007\r\u0007\u000e\u0007;\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bE\n\b\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\fT\n\f\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0002\u0002\u0010\u0002\u0004\u0006\b",
    "\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u0002\u0004\u0003",
    "\u0002\u0016\u0017\u0003\u0002\u0007\f\u0002^\u0002\u001f\u0003\u0002",
    "\u0002\u0002\u0004&\u0003\u0002\u0002\u0002\u0006/\u0003\u0002\u0002",
    "\u0002\b4\u0003\u0002\u0002\u0002\n6\u0003\u0002\u0002\u0002\f9\u0003",
    "\u0002\u0002\u0002\u000eD\u0003\u0002\u0002\u0002\u0010F\u0003\u0002",
    "\u0002\u0002\u0012H\u0003\u0002\u0002\u0002\u0014J\u0003\u0002\u0002",
    "\u0002\u0016S\u0003\u0002\u0002\u0002\u0018U\u0003\u0002\u0002\u0002",
    "\u001aW\u0003\u0002\u0002\u0002\u001c[\u0003\u0002\u0002\u0002\u001e",
    " \u0005\u0004\u0003\u0002\u001f\u001e\u0003\u0002\u0002\u0002 !\u0003",
    "\u0002\u0002\u0002!\u001f\u0003\u0002\u0002\u0002!\"\u0003\u0002\u0002",
    "\u0002\"#\u0003\u0002\u0002\u0002#$\u0007\u0002\u0002\u0003$\u0003\u0003",
    "\u0002\u0002\u0002%\'\u0007\u0003\u0002\u0002&%\u0003\u0002\u0002\u0002",
    "&\'\u0003\u0002\u0002\u0002\')\u0003\u0002\u0002\u0002(*\u0005\u0006",
    "\u0004\u0002)(\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+,\u0007\u0004\u0002\u0002,-\u0005\f\u0007\u0002-",
    ".\u0007\u0019\u0002\u0002.\u0005\u0003\u0002\u0002\u0002/0\u0005\b\u0005",
    "\u000202\u0005\n\u0006\u000213\u0007\u0006\u0002\u000221\u0003\u0002",
    "\u0002\u000223\u0003\u0002\u0002\u00023\u0007\u0003\u0002\u0002\u0002",
    "45\u0007\u0018\u0002\u00025\t\u0003\u0002\u0002\u000267\u0007\u0017",
    "\u0002\u00027\u000b\u0003\u0002\u0002\u00028:\u0005\u000e\b\u000298",
    "\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002\u0002;9\u0003\u0002\u0002",
    "\u0002;<\u0003\u0002\u0002\u0002<\r\u0003\u0002\u0002\u0002=E\u0005",
    "\u0010\t\u0002>E\u0005\u0012\n\u0002?E\u0005\u0014\u000b\u0002@E\u0005",
    "\u0018\r\u0002AE\u0005\u001a\u000e\u0002BE\u0005\u001c\u000f\u0002C",
    "E\u0005\u0016\f\u0002D=\u0003\u0002\u0002\u0002D>\u0003\u0002\u0002",
    "\u0002D?\u0003\u0002\u0002\u0002D@\u0003\u0002\u0002\u0002DA\u0003\u0002",
    "\u0002\u0002DB\u0003\u0002\u0002\u0002DC\u0003\u0002\u0002\u0002E\u000f",
    "\u0003\u0002\u0002\u0002FG\t\u0002\u0002\u0002G\u0011\u0003\u0002\u0002",
    "\u0002HI\t\u0003\u0002\u0002I\u0013\u0003\u0002\u0002\u0002JK\u0007",
    "\r\u0002\u0002KL\u0007\u0017\u0002\u0002LM\u0007\u000e\u0002\u0002M",
    "\u0015\u0003\u0002\u0002\u0002NO\u0007\u0005\u0002\u0002OP\u0007\u0017",
    "\u0002\u0002PT\u0007\t\u0002\u0002QT\u0007\u0014\u0002\u0002RT\u0007",
    "\u0018\u0002\u0002SN\u0003\u0002\u0002\u0002SQ\u0003\u0002\u0002\u0002",
    "SR\u0003\u0002\u0002\u0002T\u0017\u0003\u0002\u0002\u0002UV\u0007\u0015",
    "\u0002\u0002V\u0019\u0003\u0002\u0002\u0002WX\u0007\u0010\u0002\u0002",
    "XY\u0005\f\u0007\u0002YZ\u0007\u0011\u0002\u0002Z\u001b\u0003\u0002",
    "\u0002\u0002[\\\u0007\u0012\u0002\u0002\\]\u0005\f\u0007\u0002]^\u0007",
    "\u0013\u0002\u0002^\u001d\u0003\u0002\u0002\u0002\t!&)2;DS"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class EuporiaParser extends antlr4.Parser {

    static grammarFileName = "Euporia.g4";
    static literalNames = [ null, "'%'", "'/'", "'#'", "'\u00A7'", "'.'", 
                            "','", "';'", "':'", "'?'", "'!'", "'['", "']'", 
                            "'\u00A6'", "'\u227C'", "'\u227D'", "'{'", "'}'" ];
    static symbolicNames = [ null, "MARKER", "BAR", "HASH", "SECTION", "DOT", 
                             "COMMA", "SEMICOLON", "COLON", "QMARK", "EMARK", 
                             "LB", "RB", "BKBAR", "LG", "RG", "LC", "RC", 
                             "SPECCHAR", "EXPAN", "PAREN_WORD", "CHARSEQ", 
                             "NUM", "NL", "WS" ];
    static ruleNames = [ "start", "line", "ref", "folio", "side", "text", 
                         "textItem", "word", "punct", "choice", "entity", 
                         "expan", "supplied", "del" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = EuporiaParser.ruleNames;
        this.literalNames = EuporiaParser.literalNames;
        this.symbolicNames = EuporiaParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	start() {
	    let localctx = new StartContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, EuporiaParser.RULE_start);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 28;
	            this.line();
	            this.state = 31; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << EuporiaParser.MARKER) | (1 << EuporiaParser.BAR) | (1 << EuporiaParser.NUM))) !== 0));
	        this.state = 33;
	        this.match(EuporiaParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	line() {
	    let localctx = new LineContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, EuporiaParser.RULE_line);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===EuporiaParser.MARKER) {
	            this.state = 35;
	            this.match(EuporiaParser.MARKER);
	        }

	        this.state = 39;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===EuporiaParser.NUM) {
	            this.state = 38;
	            this.ref();
	        }

	        this.state = 41;
	        this.match(EuporiaParser.BAR);
	        this.state = 42;
	        this.text();
	        this.state = 43;
	        this.match(EuporiaParser.NL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ref() {
	    let localctx = new RefContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, EuporiaParser.RULE_ref);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 45;
	        this.folio();
	        this.state = 46;
	        this.side();
	        this.state = 48;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===EuporiaParser.SECTION) {
	            this.state = 47;
	            this.match(EuporiaParser.SECTION);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	folio() {
	    let localctx = new FolioContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, EuporiaParser.RULE_folio);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 50;
	        this.match(EuporiaParser.NUM);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	side() {
	    let localctx = new SideContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, EuporiaParser.RULE_side);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 52;
	        this.match(EuporiaParser.CHARSEQ);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	text() {
	    let localctx = new TextContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, EuporiaParser.RULE_text);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 54;
	            this.textItem();
	            this.state = 57; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << EuporiaParser.HASH) | (1 << EuporiaParser.DOT) | (1 << EuporiaParser.COMMA) | (1 << EuporiaParser.SEMICOLON) | (1 << EuporiaParser.COLON) | (1 << EuporiaParser.QMARK) | (1 << EuporiaParser.EMARK) | (1 << EuporiaParser.LB) | (1 << EuporiaParser.LG) | (1 << EuporiaParser.LC) | (1 << EuporiaParser.SPECCHAR) | (1 << EuporiaParser.EXPAN) | (1 << EuporiaParser.PAREN_WORD) | (1 << EuporiaParser.CHARSEQ) | (1 << EuporiaParser.NUM))) !== 0));
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	textItem() {
	    let localctx = new TextItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, EuporiaParser.RULE_textItem);
	    try {
	        this.state = 66;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case EuporiaParser.PAREN_WORD:
	        case EuporiaParser.CHARSEQ:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 59;
	            this.word();
	            break;
	        case EuporiaParser.DOT:
	        case EuporiaParser.COMMA:
	        case EuporiaParser.SEMICOLON:
	        case EuporiaParser.COLON:
	        case EuporiaParser.QMARK:
	        case EuporiaParser.EMARK:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 60;
	            this.punct();
	            break;
	        case EuporiaParser.LB:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 61;
	            this.choice();
	            break;
	        case EuporiaParser.EXPAN:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 62;
	            this.expan();
	            break;
	        case EuporiaParser.LG:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 63;
	            this.supplied();
	            break;
	        case EuporiaParser.LC:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 64;
	            this.del();
	            break;
	        case EuporiaParser.HASH:
	        case EuporiaParser.SPECCHAR:
	        case EuporiaParser.NUM:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 65;
	            this.entity();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	word() {
	    let localctx = new WordContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, EuporiaParser.RULE_word);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 68;
	        _la = this._input.LA(1);
	        if(!(_la===EuporiaParser.PAREN_WORD || _la===EuporiaParser.CHARSEQ)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	punct() {
	    let localctx = new PunctContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, EuporiaParser.RULE_punct);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 70;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << EuporiaParser.DOT) | (1 << EuporiaParser.COMMA) | (1 << EuporiaParser.SEMICOLON) | (1 << EuporiaParser.COLON) | (1 << EuporiaParser.QMARK) | (1 << EuporiaParser.EMARK))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	choice() {
	    let localctx = new ChoiceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, EuporiaParser.RULE_choice);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 72;
	        this.match(EuporiaParser.LB);
	        this.state = 73;
	        this.match(EuporiaParser.CHARSEQ);
	        this.state = 74;
	        this.match(EuporiaParser.RB);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	entity() {
	    let localctx = new EntityContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, EuporiaParser.RULE_entity);
	    try {
	        this.state = 81;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case EuporiaParser.HASH:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 76;
	            this.match(EuporiaParser.HASH);
	            this.state = 77;
	            this.match(EuporiaParser.CHARSEQ);
	            this.state = 78;
	            this.match(EuporiaParser.SEMICOLON);
	            break;
	        case EuporiaParser.SPECCHAR:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 79;
	            this.match(EuporiaParser.SPECCHAR);
	            break;
	        case EuporiaParser.NUM:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 80;
	            this.match(EuporiaParser.NUM);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expan() {
	    let localctx = new ExpanContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, EuporiaParser.RULE_expan);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 83;
	        this.match(EuporiaParser.EXPAN);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	supplied() {
	    let localctx = new SuppliedContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, EuporiaParser.RULE_supplied);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 85;
	        this.match(EuporiaParser.LG);
	        this.state = 86;
	        this.text();
	        this.state = 87;
	        this.match(EuporiaParser.RG);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	del() {
	    let localctx = new DelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, EuporiaParser.RULE_del);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 89;
	        this.match(EuporiaParser.LC);
	        this.state = 90;
	        this.text();
	        this.state = 91;
	        this.match(EuporiaParser.RC);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

EuporiaParser.EOF = antlr4.Token.EOF;
EuporiaParser.MARKER = 1;
EuporiaParser.BAR = 2;
EuporiaParser.HASH = 3;
EuporiaParser.SECTION = 4;
EuporiaParser.DOT = 5;
EuporiaParser.COMMA = 6;
EuporiaParser.SEMICOLON = 7;
EuporiaParser.COLON = 8;
EuporiaParser.QMARK = 9;
EuporiaParser.EMARK = 10;
EuporiaParser.LB = 11;
EuporiaParser.RB = 12;
EuporiaParser.BKBAR = 13;
EuporiaParser.LG = 14;
EuporiaParser.RG = 15;
EuporiaParser.LC = 16;
EuporiaParser.RC = 17;
EuporiaParser.SPECCHAR = 18;
EuporiaParser.EXPAN = 19;
EuporiaParser.PAREN_WORD = 20;
EuporiaParser.CHARSEQ = 21;
EuporiaParser.NUM = 22;
EuporiaParser.NL = 23;
EuporiaParser.WS = 24;

EuporiaParser.RULE_start = 0;
EuporiaParser.RULE_line = 1;
EuporiaParser.RULE_ref = 2;
EuporiaParser.RULE_folio = 3;
EuporiaParser.RULE_side = 4;
EuporiaParser.RULE_text = 5;
EuporiaParser.RULE_textItem = 6;
EuporiaParser.RULE_word = 7;
EuporiaParser.RULE_punct = 8;
EuporiaParser.RULE_choice = 9;
EuporiaParser.RULE_entity = 10;
EuporiaParser.RULE_expan = 11;
EuporiaParser.RULE_supplied = 12;
EuporiaParser.RULE_del = 13;

class StartContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_start;
    }

	EOF() {
	    return this.getToken(EuporiaParser.EOF, 0);
	};

	line = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LineContext);
	    } else {
	        return this.getTypedRuleContext(LineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterStart(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitStart(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitStart(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LineContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_line;
    }

	BAR() {
	    return this.getToken(EuporiaParser.BAR, 0);
	};

	text() {
	    return this.getTypedRuleContext(TextContext,0);
	};

	NL() {
	    return this.getToken(EuporiaParser.NL, 0);
	};

	MARKER() {
	    return this.getToken(EuporiaParser.MARKER, 0);
	};

	ref() {
	    return this.getTypedRuleContext(RefContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterLine(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitLine(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitLine(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RefContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_ref;
    }

	folio() {
	    return this.getTypedRuleContext(FolioContext,0);
	};

	side() {
	    return this.getTypedRuleContext(SideContext,0);
	};

	SECTION() {
	    return this.getToken(EuporiaParser.SECTION, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterRef(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitRef(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitRef(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FolioContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_folio;
    }

	NUM() {
	    return this.getToken(EuporiaParser.NUM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterFolio(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitFolio(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitFolio(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SideContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_side;
    }

	CHARSEQ() {
	    return this.getToken(EuporiaParser.CHARSEQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterSide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitSide(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitSide(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TextContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_text;
    }

	textItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextItemContext);
	    } else {
	        return this.getTypedRuleContext(TextItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterText(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitText(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitText(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TextItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_textItem;
    }

	word() {
	    return this.getTypedRuleContext(WordContext,0);
	};

	punct() {
	    return this.getTypedRuleContext(PunctContext,0);
	};

	choice() {
	    return this.getTypedRuleContext(ChoiceContext,0);
	};

	expan() {
	    return this.getTypedRuleContext(ExpanContext,0);
	};

	supplied() {
	    return this.getTypedRuleContext(SuppliedContext,0);
	};

	del() {
	    return this.getTypedRuleContext(DelContext,0);
	};

	entity() {
	    return this.getTypedRuleContext(EntityContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterTextItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitTextItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitTextItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class WordContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_word;
    }

	CHARSEQ() {
	    return this.getToken(EuporiaParser.CHARSEQ, 0);
	};

	PAREN_WORD() {
	    return this.getToken(EuporiaParser.PAREN_WORD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterWord(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitWord(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitWord(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PunctContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_punct;
    }

	DOT() {
	    return this.getToken(EuporiaParser.DOT, 0);
	};

	COMMA() {
	    return this.getToken(EuporiaParser.COMMA, 0);
	};

	COLON() {
	    return this.getToken(EuporiaParser.COLON, 0);
	};

	SEMICOLON() {
	    return this.getToken(EuporiaParser.SEMICOLON, 0);
	};

	QMARK() {
	    return this.getToken(EuporiaParser.QMARK, 0);
	};

	EMARK() {
	    return this.getToken(EuporiaParser.EMARK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterPunct(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitPunct(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitPunct(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ChoiceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_choice;
    }

	LB() {
	    return this.getToken(EuporiaParser.LB, 0);
	};

	CHARSEQ() {
	    return this.getToken(EuporiaParser.CHARSEQ, 0);
	};

	RB() {
	    return this.getToken(EuporiaParser.RB, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterChoice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitChoice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitChoice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class EntityContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_entity;
    }

	HASH() {
	    return this.getToken(EuporiaParser.HASH, 0);
	};

	CHARSEQ() {
	    return this.getToken(EuporiaParser.CHARSEQ, 0);
	};

	SEMICOLON() {
	    return this.getToken(EuporiaParser.SEMICOLON, 0);
	};

	SPECCHAR() {
	    return this.getToken(EuporiaParser.SPECCHAR, 0);
	};

	NUM() {
	    return this.getToken(EuporiaParser.NUM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterEntity(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitEntity(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitEntity(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpanContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_expan;
    }

	EXPAN() {
	    return this.getToken(EuporiaParser.EXPAN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterExpan(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitExpan(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitExpan(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SuppliedContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_supplied;
    }

	LG() {
	    return this.getToken(EuporiaParser.LG, 0);
	};

	text() {
	    return this.getTypedRuleContext(TextContext,0);
	};

	RG() {
	    return this.getToken(EuporiaParser.RG, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterSupplied(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitSupplied(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitSupplied(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = EuporiaParser.RULE_del;
    }

	LC() {
	    return this.getToken(EuporiaParser.LC, 0);
	};

	text() {
	    return this.getTypedRuleContext(TextContext,0);
	};

	RC() {
	    return this.getToken(EuporiaParser.RC, 0);
	};

	enterRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.enterDel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof EuporiaListener ) {
	        listener.exitDel(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof EuporiaVisitor ) {
	        return visitor.visitDel(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




EuporiaParser.StartContext = StartContext; 
EuporiaParser.LineContext = LineContext; 
EuporiaParser.RefContext = RefContext; 
EuporiaParser.FolioContext = FolioContext; 
EuporiaParser.SideContext = SideContext; 
EuporiaParser.TextContext = TextContext; 
EuporiaParser.TextItemContext = TextItemContext; 
EuporiaParser.WordContext = WordContext; 
EuporiaParser.PunctContext = PunctContext; 
EuporiaParser.ChoiceContext = ChoiceContext; 
EuporiaParser.EntityContext = EntityContext; 
EuporiaParser.ExpanContext = ExpanContext; 
EuporiaParser.SuppliedContext = SuppliedContext; 
EuporiaParser.DelContext = DelContext; 
