const { expect } = require('chai');
const evaluatePostfix = require('../src/evaluate-postfix');

describe('Postfix evaluator', () => {
    it('should respect the correct order of operations', () => {
        expect(evaluatePostfix('1 2 + 3 +')).to.equal(6);
        expect(evaluatePostfix('1 2 + 3 -')).to.equal(0);
        expect(evaluatePostfix('1 2 3 * +')).to.equal(7);
        expect(evaluatePostfix('1 2 3 / +')).to.equal(1 + 2 / 3);
        expect(evaluatePostfix('1 2 - 3 +')).to.equal(2);
        expect(evaluatePostfix('1 2 - 3 -')).to.equal(-4);
        expect(evaluatePostfix('1 2 3 * -')).to.equal(-5);
        expect(evaluatePostfix('1 2 3 / -')).to.equal(1 - 2 / 3);
        expect(evaluatePostfix('1 2 * 3 +')).to.equal(5);
        expect(evaluatePostfix('1 2 * 3 -')).to.equal(-1);
        expect(evaluatePostfix('1 2 * 3 *')).to.equal(6);
        expect(evaluatePostfix('1 2 * 3 /')).to.equal(2 / 3);
        expect(evaluatePostfix('1 2 / 3 +')).to.equal(7 / 2);
        expect(evaluatePostfix('1 2 / 3 -')).to.equal(-5 / 2);
        expect(evaluatePostfix('1 2 / 3 *')).to.equal(3 / 2);
        expect(evaluatePostfix('1 2 / 3 /')).to.equal(1 / 6);
    });

    it('should handle negative numbers and decimal points', () => {
        expect(evaluatePostfix('21 -3.2 *')).to.equal(-67.2);
        expect(evaluatePostfix('21 -3.2 * 5.3 +')).to.equal(21 * -3.2 + 5.3);
        expect(evaluatePostfix('21 3.2 -5.3 * -')).to.equal(21 - 3.2 * -5.3);
    });
    it('should handle powers', () => {
        expect(evaluatePostfix('21 3 ^ 2 * 10 -')).to.equal(21 ** 3 * 2 - 10);
        expect(evaluatePostfix('21 3 2 * ^ 10 -')).to.equal(21 ** 6 - 10);
        expect(evaluatePostfix('5 21 3 ^ - 10 +')).to.equal(5 - 21 ** 3 + 10);
        expect(evaluatePostfix('5 21 3 ^ + 10 -')).to.equal(5 + 21 ** 3 - 10);
        expect(evaluatePostfix('5 21 + 3 ^ 10 -')).to.equal(26 ** 3 - 10);
        expect(evaluatePostfix('2 2 3 ^ ^ 34 2 / - 17 +')).to.equal(2 ** 8 - 34 / 2 + 17);
    });
});

