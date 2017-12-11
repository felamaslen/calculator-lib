const { expect } = require('chai');
const { formatInfix } = require('../src');

describe('formatInfix', () => {
    it('should handle spaces after numbers', () => {
        expect(formatInfix('2 + 3')).to.equal('2 + 3');
        expect(formatInfix('2  + 3')).to.equal('2 + 3');
        expect(formatInfix('2    + 3')).to.equal('2 + 3');
        expect(formatInfix('2.34  + 3.5')).to.equal('2.34 + 3.5');
    });

    it('should handle spaces before numbers', () => {
        expect(formatInfix('2+ 3')).to.equal('2 + 3');
        expect(formatInfix('2+  3')).to.equal('2 + 3');
        expect(formatInfix('2.3+ 3.3^   2 -   5')).to.equal('2.3 + 3.3 ^ 2 - 5');
    });

    it('should handle brackets', () => {
        expect(formatInfix('2+(3 + 4)')).to.equal('2 + (3 + 4)');
        expect(formatInfix('2 + 3^(6 /3)')).to.equal('2 + 3 ^ (6 / 3)');
    });
});

