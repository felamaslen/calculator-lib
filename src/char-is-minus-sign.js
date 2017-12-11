const { OPERATORS } = require('./operators');

module.exports = (chars, index) => index < chars.length - 1 &&
    chars[index] === '-' &&
    (index === 0 || chars[index - 1] in OPERATORS) &&
    chars[index + 1].match(/[\d.]/)

