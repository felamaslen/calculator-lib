const { OPERATORS } = require('./operators');

function evaluatePostfix(raw) {
    if (!raw.length) {
        throw new Error('invalid string');
    }

    const result = raw
        .replace(/(\s+|,)/, ' ')
        .split(' ')
        .reduce((stack, char) => {
            if (char in OPERATORS) {
                const arg2 = stack.pop();
                const arg1 = stack.pop();

                return [...stack, OPERATORS[char](arg1, arg2)];
            }

            return [...stack, Number(char)];

        }, []);

    if (result.length !== 1) {
        throw new Error('invalid string');
    }

    return result[0];
}

module.exports = evaluatePostfix;

