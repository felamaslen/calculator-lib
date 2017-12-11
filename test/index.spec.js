const { expect } = require('chai');
const evaluateInfix = require('../src');

describe('Infix evaluator', () => {
    it('should respect the correct order of operations', () => {
        expect(evaluateInfix('1 + 2 + 3')).to.equal(6);
        expect(evaluateInfix('1 + 2 - 3')).to.equal(0);
        expect(evaluateInfix('1 + 2 * 3')).to.equal(7);
        expect(evaluateInfix('1 + 2 / 3')).to.equal(1 + 2 / 3);
        expect(evaluateInfix('1 - 2 + 3')).to.equal(2);
        expect(evaluateInfix('1 - 2 - 3')).to.equal(-4);
        expect(evaluateInfix('1 - 2 * 3')).to.equal(-5);
        expect(evaluateInfix('1 - 2 / 3')).to.equal(1 - 2 / 3);
        expect(evaluateInfix('1 * 2 + 3')).to.equal(5);
        expect(evaluateInfix('1 * 2 - 3')).to.equal(-1);
        expect(evaluateInfix('1 * 2 * 3')).to.equal(6);
        expect(evaluateInfix('1 * 2 / 3')).to.equal(2 / 3);
        expect(evaluateInfix('1 / 2 + 3')).to.equal(7 / 2);
        expect(evaluateInfix('1 / 2 - 3')).to.equal(-5 / 2);
        expect(evaluateInfix('1 / 2 * 3')).to.equal(3 / 2);
        expect(evaluateInfix('1 / 2 / 3')).to.equal(1 / 6);
    });

    it('should handle brackets', () => {
        expect(evaluateInfix('2 + 3 * (5 / 2)')).to.equal(19 / 2);
        expect(evaluateInfix('2 * 3 + (5 / 2)')).to.equal(17 / 2);
    });
    it('should handle negative numbers and decimal points', () => {
        expect(evaluateInfix('21 * -3.2')).to.equal(21 * -3.2);
        expect(evaluateInfix('21 * -3.2 + 5.3')).to.equal(21 * -3.2 + 5.3);
        expect(evaluateInfix('21 - 3.2 * -5.3')).to.equal(21 - 3.2 * -5.3);
    });
    it('should handle combinations of the above', () => {
        expect(evaluateInfix('(21 * -3.2) / (5 - 1)')).to.equal((21 * -3.2) / 4);
        expect(evaluateInfix('((3.2 * 5) * (-20 / -3))')).to.equal((3.2 * 5) * (20 / 3));
    });
    it('should handle powers', () => {
        expect(evaluateInfix('21 ^ 3 * 2 - 10')).to.equal(21 ** 3 * 2 - 10);
        expect(evaluateInfix('21 ^ (3 * 2) - 10')).to.equal(21 ** 6 - 10);
        expect(evaluateInfix('5 - 21 ^ 3 + 10')).to.equal(5 - 21 ** 3 + 10);
        expect(evaluateInfix('5 + 21 ^ 3 - 10')).to.equal(5 + 21 ** 3 - 10);
        expect(evaluateInfix('(5 + 21) ^ 3 - 10')).to.equal(26 ** 3 - 10);
        expect(evaluateInfix('2 ^ (2 ^ 3) - 34 / 2 + 17')).to.equal(2 ** 8 - 34 / 2 + 17);
    });
    it('should allow expressions with no spaces', () => {
        // this is tested more extensively in format-infix spec
        expect(evaluateInfix('2^3-5')).to.equal(3);
        expect(evaluateInfix('5-3*2')).to.equal(-1);
    });
    it('should correctly calculate the test case given in the readme', () => {
        expect(evaluateInfix('2+3/(5^-1)*-1.5')).to.equal(-20.5);
        expect(evaluateInfix('4 + 5')).to.equal(9);
    });
});

