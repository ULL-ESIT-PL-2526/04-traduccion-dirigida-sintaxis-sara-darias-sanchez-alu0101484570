/* Lexer */
%lex
%%
\s+                                             { /* skip whitespace */; }
"//"[^\n]*                                      { /* skip line comments*/; }  
[0-9]+(\.[0-9]+)?([eE][+-][0-9]+)?              { return 'NUMBER';       }
"**"                                            { return 'OPOW';         }
[*/]                                            { return 'OPMU';         }
[-+]                                            { return 'OPAD';         }
"("                                             { return 'LEFTPAR';      }
")"                                             { return 'RIGHTPAR';     }
<<EOF>>                                         { return 'EOF';          }
.                                               { return 'INVALID';      }
/lex

/* Parser */
%start L
%token NUMBER
%%

L
    : E EOF
        { return $1; }
    ;

E
    : E OPAD T
        { $$ = operate($2, $1, $3); }
    | T
        { $$ = $1; }
    ;


T   : T OPMU R
        {$$ = operate($2, $1, $3)}
    | R
        {$$ = $1;}
    ;

R   : F OPOW R 
        {$$ = operate($2, $1, $3)}
    | F
        {$$ = $1;}
    ;

F   : NUMBER
        { $$ = Number(yytext); }
    | LEFTPAR E RIGHTPAR
        {$$ = $2;}
    ;

    
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}
