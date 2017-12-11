const { OPERATORS, PRECEDENCE } = require('./operators');
const charIsMinusSign = require('./char-is-minus-sign');
const BRACKET = 0xB00000;

const TYPE_NUMBER = 'NUMBER';
const TYPE_OPERATOR = 'OPERATOR';
const TYPE_GROUP = 'GROUP';

function getBracketSections(infix) {
    return infix
        .split('')
        .reduce((sections, char, index) => {
            if (char === '(') {
                const remove = index > 0 && sections.findIndex(section => section.close === null) > -1;

                return [...sections, { open: index, close: null, remove }];
            }
            if (char === ')') {
                const lastNotClosed = sections
                    .slice()
                    .reverse()
                    .findIndex(section => section.close === null);

                if (lastNotClosed === -1) {
                    throw new Error('invalid brackets');
                }

                const closeIndex = sections.length - 1 - lastNotClosed;

                sections[closeIndex].close = index;
            }

            return sections;

        }, [])
        .filter(section => !section.remove);
}

function getCharsWithBrackets(bracketSections, infix) {
    if (!bracketSections.length) {
        return infix.split('');
    }

    return [
        ...bracketSections
            .reduce(({ items, start }, { open, close }) => ({
                items: [
                    ...items,
                    ...infix.substring(start, open)
                        .split(''),
                    BRACKET
                ],
                start: close + 1
            }), {
                items: [],
                start: 0
            })
            .items,
        ...infix
            .substring(bracketSections[bracketSections.length - 1].close + 1)
            .split('')
    ];
}

function processCharsWithBrackets(chars) {
    const stacks = chars
        .reduce(({ items, ops, continueNumber }, char, index) => {
            const isBracket = char === BRACKET;
            if (isBracket) {
                return {
                    items: [...items, { char, type: TYPE_GROUP }],
                    ops,
                    continueNumber: false
                };
            }

            const isMinusSign = charIsMinusSign(chars, index);
            const nextIsMinusSign = charIsMinusSign(chars, index + 1);

            const isOperator = index > 0 && index < chars.length - 1 &&
                !isMinusSign &&
                char in OPERATORS &&
                !(chars[index - 1] in OPERATORS) &&
                !(chars[index + 1] in OPERATORS && !nextIsMinusSign);

            if (isOperator) {
                const poppedOps = ops
                    .slice()
                    .reverse()
                    .reduce(({ stop, popped }, op) => {
                        if (stop) {
                            return { stop, popped };
                        }

                        const higherPrecedence = PRECEDENCE[op.char] > PRECEDENCE[char];

                        if (higherPrecedence) {
                            return { stop: true, popped };
                        }

                        return { stop, popped: [...popped, op] };

                    }, { stop: false, popped: [] })
                    .popped;

                return {
                    items: [...items, ...poppedOps],
                    ops: [...ops.slice(0, ops.length - poppedOps.length), { char, type: TYPE_OPERATOR }],
                    continueNumber: false
                };
            }

            if (continueNumber) {
                return {
                    items: [...items.slice(0, items.length - 1), {
                        char: `${items[items.length - 1].char}${char}`,
                        type: TYPE_NUMBER
                    }],
                    ops,
                    continueNumber: true
                };
            }

            return {
                items: [...items, { char, type: TYPE_NUMBER }],
                ops,
                continueNumber: true
            };

        }, { items: [], ops: [], continueNumber: false });

    return [...stacks.items, ...stacks.ops.reverse()];
}

function infixToPostfix(infix = '2 + 3 * (5 / 2)', level = 0) {
    const bracketSections = getBracketSections(infix);

    const invalidBrackets = bracketSections.length && bracketSections[bracketSections.length - 1].close === null;
    if (invalidBrackets) {
        throw new Error('invalid string');
    }

    const chars = getCharsWithBrackets(bracketSections, infix)
        .filter(item => !(typeof item === 'string' && item.match(/\s/)));

    const bits = processCharsWithBrackets(chars);

    let bracketIndex = -1;

    return bits
        .map(({ char }) => char)
        .join(' ')
        .replace(new RegExp(BRACKET, 'g'), () => {
            bracketIndex++;

            return infixToPostfix(infix.substring(
                bracketSections[bracketIndex].open + 1, bracketSections[bracketIndex].close
            ), level + 1);
        });
}

module.exports = infixToPostfix;

