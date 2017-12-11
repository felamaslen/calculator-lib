# Calculator lib

Provides functions for evaluating infix (and RPN postfix) expressions, in JavaScript.

Source is in ES6, released as ES5. Transpiled using Babel.

## Installation:

`npm install calculator-lib`

## Usage:

### Evaluation of infix expressions

```javascript
const calculator = require('calculator-lib');

calculator('4 + 5'); // -> 9

calculator('2+3/(5^-1)*-1.5'); // -> -20.5
```

### Supported operators

Currently, operations are limited to the following:

- Multiplication (`*`)
- Division (`/`)
- Addition (`+`)
- Subtraction (`-`)
- Exponentiation (`^`)

Feel free to add more in a pull request! For example, trigonometric operations would come in handy...

### Other methods:

### Evaluation of (RPN) postfix expressions

```javascript
const evaluatePostfix = require('calculator-lib/dist/evaluate-postfix');

evaluatePostfix('1 2 + 3 +'); // -> 6

evaluatePostfix('21 -3.2 *'); // -> -67.2
```

### Conversion of infix expressions to (RPN) postfix expressions

```javascript
const infixToPostfix = require('calculator-lib/dist/infix-to-postfix');

infixToPostfix('21 ^ 3 * 2 - 10'); // -> '21 3 ^ 2 * 10 -'
```

