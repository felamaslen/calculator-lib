const { expect } = require('chai');
const infixToPostfix = require('../src/infix-to-postfix');

describe('Infix to Postfix converter', () => {
    it('should respect the correct order of operations', () => {
        expect(infixToPostfix('1 + 2 + 3')).to.equal('1 2 + 3 +');
        expect(infixToPostfix('1 + 2 - 3')).to.equal('1 2 + 3 -');
        expect(infixToPostfix('1 + 2 * 3')).to.equal('1 2 3 * +');
        expect(infixToPostfix('1 + 2 / 3')).to.equal('1 2 3 / +');
        expect(infixToPostfix('1 - 2 + 3')).to.equal('1 2 - 3 +');
        expect(infixToPostfix('1 - 2 - 3')).to.equal('1 2 - 3 -');
        expect(infixToPostfix('1 - 2 * 3')).to.equal('1 2 3 * -');
        expect(infixToPostfix('1 - 2 / 3')).to.equal('1 2 3 / -');
        expect(infixToPostfix('1 * 2 + 3')).to.equal('1 2 * 3 +');
        expect(infixToPostfix('1 * 2 - 3')).to.equal('1 2 * 3 -');
        expect(infixToPostfix('1 * 2 * 3')).to.equal('1 2 * 3 *');
        expect(infixToPostfix('1 * 2 / 3')).to.equal('1 2 * 3 /');
        expect(infixToPostfix('1 / 2 + 3')).to.equal('1 2 / 3 +');
        expect(infixToPostfix('1 / 2 - 3')).to.equal('1 2 / 3 -');
        expect(infixToPostfix('1 / 2 * 3')).to.equal('1 2 / 3 *');
        expect(infixToPostfix('1 / 2 / 3')).to.equal('1 2 / 3 /');
    });

    it('should handle brackets', () => {
        expect(infixToPostfix('2 + 3 * (5 / 2)')).to.equal('2 3 5 2 / * +');
        expect(infixToPostfix('2 * 3 + (5 / 2)')).to.equal('2 3 * 5 2 / +');
    });
    it('should handle negative numbers and decimal points', () => {
        expect(infixToPostfix('21 * -3.2')).to.equal('21 -3.2 *');
        expect(infixToPostfix('21 * -3.2 + 5.3')).to.equal('21 -3.2 * 5.3 +');
        expect(infixToPostfix('21 - 3.2 * -5.3')).to.equal('21 3.2 -5.3 * -');
    });
    it('should handle combinations of the above', () => {
        expect(infixToPostfix('(21 * -3.2) / (5 - 1)')).to.equal('21 -3.2 * 5 1 - /');
        expect(infixToPostfix('((3.2 * 5) * (-20 / -3))')).to.equal('3.2 5 * -20 -3 / *');
    });
    it('should handle powers', () => {
        expect(infixToPostfix('21 ^ 3 * 2 - 10')).to.equal('21 3 ^ 2 * 10 -');
        expect(infixToPostfix('21 ^ (3 * 2) - 10')).to.equal('21 3 2 * ^ 10 -');
        expect(infixToPostfix('5 - 21 ^ 3 + 10')).to.equal('5 21 3 ^ - 10 +');
        expect(infixToPostfix('5 + 21 ^ 3 - 10')).to.equal('5 21 3 ^ + 10 -');
        expect(infixToPostfix('(5 + 21) ^ 3 - 10')).to.equal('5 21 + 3 ^ 10 -');
        expect(infixToPostfix('2 ^ (2 ^ 3) - 34 / 2 + 17')).to.equal('2 2 3 ^ ^ 34 2 / - 17 +');
    });
    it('should not require spaces between numbers and operators', () => {
        expect(infixToPostfix('1/2 /3')).to.equal('1 2 / 3 /');
        expect(infixToPostfix('2*3+(5/2)')).to.equal('2 3 * 5 2 / +');
        expect(infixToPostfix('21-3.2*-5.3')).to.equal('21 3.2 -5.3 * -');
        expect(infixToPostfix('((3.2*5)*(-20/-3))')).to.equal('3.2 5 * -20 -3 / *');
        expect(infixToPostfix('2 ^(2^ 3) -34/ 2+17')).to.equal('2 2 3 ^ ^ 34 2 / - 17 +');
    });
});

