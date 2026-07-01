grammar Euporia;

start
    : line+ EOF
    ;

line
    : MARKER? ref? BAR text NL
    ;

ref
    : folio side SECTION?
    ;

folio
    : NUM
    ;

side
    : CHARSEQ
    ;

text
    : textItem+
    ;

textItem
    : word
    | punct
    | choice
    | expan
    | supplied
    | del
    | entity
    ;

word
    : CHARSEQ
    | PAREN_WORD
    ;

punct
    : DOT
    | COMMA
    | COLON
    | SEMICOLON
    | QMARK
    | EMARK
    ;

choice
    : LB CHARSEQ RB
    ;

entity
    : HASH CHARSEQ SEMICOLON
    | SPECCHAR
    | NUM
    ;

expan
    : EXPAN
    ;

supplied
    : LG text RG
    ;

del
    : LC text RC
    ;

/* ===========================
   Lexer
   =========================== */

MARKER      : '%';
BAR         : '/';
HASH        : '#';

SECTION     : '§';

DOT         : '.';
COMMA       : ',';
SEMICOLON   : ';';
COLON       : ':';
QMARK       : '?';
EMARK       : '!';

LB          : '[';
RB          : ']';
BKBAR       : '¦';

LG          : '≼';
RG          : '≽';

LC          : '{';
RC          : '}';

SPECCHAR
    : [ᵉȃāãȇēħẽīōȏõȗū]
    ;

/*
 * Du(m)
 * p(ar)tir
 * q(ua)n(do)
 * g(e)n(er)ato
 */
EXPAN
    : [a-zA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj_•’']+
      (
        '('
        [a-zA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj_•’']+
        ')'
        [a-zA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj_•’']*
      )+
    ;

/*
 * (et)
 * (Et)
 */
PAREN_WORD
    : '(' [a-zA-ZA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj’']+ ')'
    ;

/*
 * parole normali:
 * Johannes
 * Antonius
 * po’
 * so’
 * Ysaac
 *
 * numeri romani abbreviati:
 * \.cj\.
 * \.lxxv\.
 * \.lxxxx\.
 */
CHARSEQ
    : (
          [a-zA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj_•’']+
        | '\\.' [a-zA-ZA-ZÇçÁÀÉÈÍÌÓÒÚÙáàéèíìóòúùYyJj]+ '\\.'
      )
    ;

NUM
    : [0-9]+
    ;

NL
    : '\r'? '\n'
    ;

WS
    : [ \t]+ -> skip
    ;