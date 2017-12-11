const { OPERATORS } = require('./operators');
const charIsMinusSign = require('./char-is-minus-sign');

function formatInfix(infix) {
    // ensure the right spacing between items, to make it look good / readable
    const chars = infix.split('');

    return chars
        .reduce(({ stack, next }, char, index) => {
            const isWhitespace = char.match(/\s/);
            if (isWhitespace) {
                return { stack, next: true };
            }

            const isMinusSign = charIsMinusSign(chars, index);
            const isOperator = !isMinusSign && char in OPERATORS;

            if (isOperator) {
                return {
                    stack: [...stack, ' ', char],
                    next: true
                };
            }

            if (isMinusSign || next) {
                return {
                    stack: [...stack, ' ', char],
                    next: false
                };
            }

            return {
                stack: [...stack, char],
                next: false
            };
        }, { stack: [], next: true })
        .stack
        .slice(1)
        .join('');
}

module.exports = formatInfix;

