const formatInfix = require('./format-infix');
const infixToPostfix = require('./infix-to-postfix');
const evaluatePostfix = require('./evaluate-postfix');

function evaluateInfix(raw) {
    const formatted = formatInfix(raw);

    const postfix = infixToPostfix(formatted);

    const result = evaluatePostfix(postfix);

    if (result === null || isNaN(result)) {
        throw new Error('invalid string');
    }

    return result;
}

module.exports = {
    formatInfix,
    infixToPostfix,
    evaluateInfix,
    evaluatePostfix
};

