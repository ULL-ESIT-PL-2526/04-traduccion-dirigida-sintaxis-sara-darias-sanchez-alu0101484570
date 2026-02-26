# Syntax Directed Translation with Jison

Jison is a tool that receives as input a Syntax Directed Translation and produces as output a JavaScript parser  that executes
the semantic actions in a bottom up ortraversing of the parse tree.
 

## Compile the grammar to a parser

See file [grammar.jison](./src/grammar.jison) for the grammar specification. To compile it to a parser, run the following command in the terminal:
``` 
➜  jison git:(main) ✗ npx jison grammar.jison -o parser.js
```

## Use the parser

After compiling the grammar to a parser, you can use it in your JavaScript code. For example, you can run the following code in a Node.js environment:

```
➜  jison git:(main) ✗ node                                
Welcome to Node.js v25.6.0.
Type ".help" for more information.
> p = require("./parser.js")
{
  parser: { yy: {} },
  Parser: [Function: Parser],
  parse: [Function (anonymous)],
  main: [Function: commonjsMain]
}
> p.parse("2*3")
6
```

## Preguntas
### Describa la diferencia entre /* skip whitespace */ y devolver un token.
Cuando se devuelve un token estamos retornando el valor del identificador de ese token, como en los siguientes ejemplos:
``` JavaScript
[0-9]+ { return 'NUMBER'; }
"**" { return 'OP'; }
[-+*/] { return 'OP'; }
<<EOF>> { return 'EOF'; }
. { return 'INVALID'; }
```
Además lo que retorna se lo pasaría al analizador sintáctico 
En cambio cuando lo que estamos reconociendo son espacios en blanco, entonces lo que hacemos es saltarnos ese caracter y continuar sin devolver nada.   
``` JavaScript
\s+ { /* skip whitespace */; }
```

### Escriba la secuencia exacta de tokens producidos para la entrada 123**45+@.
123 -> NUMBER
** -> OP
45 -> NUMBER
+ -> OP
@ -> INVALID