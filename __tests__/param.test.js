const parse = require("../src/parser.js").parse;
describe('Parser param Tests', () => {
    test('precedence is correct', () => {
      expect(parse("(2 + 2) / 4")).toBe(1); // (2 + 2) / 4 = 1
    });
    test('should handle nested parentheses correctly', () => {
      expect(parse("((2 + 3) * (4 - 1)) / 5")).toBe(3); // ((2 + 3) * (4 - 1)) / 5 = 3
    });
    test('should handle multiple levels of nested parentheses', () => {
      expect(parse("(((1 + 2) * (3 + 4)) - (5 + 6)) / 7")).toBeCloseTo(1.4285714285714286); // (((1 + 2) * (3 + 4)) - (5 + 6)) / 7 = 0
    });
    test('error handling for mismatched parentheses', () => {
      expect(() => parse("(2 + 3")).toThrow(); // Missing closing parenthesis
      expect(() => parse("2 + 3)")).toThrow(); // Missing opening parenthesis
    });
    describe('Basic parentheses', () => {
    test('should parse expression with single parentheses', () => {
      expect(parse('(5)')).toBe(5);
    });

    test('should parse addition with parentheses', () => {
      expect(parse('(2 + 3)')).toBe(5);
    });

    test('should parse multiplication with parentheses', () => {
      expect(parse('(4 * 5)')).toBe(20);
    });

    test('should handle nested parentheses', () => {
      expect(parse('((5))')).toBe(5);
    });

    test('should handle deeply nested parentheses', () => {
      expect(parse('(((2 + 3)))')).toBe(5);
    });
  });

  describe('Parentheses precedence', () => {
    test('should override addition precedence', () => {
      expect(parse('2 * (3 + 4)')).toBe(14);
    });

    test('should override multiplication precedence', () => {
      expect(parse('(2 + 3) * 4')).toBe(20);
    });

    test('should handle complex precedence', () => {
      expect(parse('2 + 3 * 4')).toBe(14);
      expect(parse('(2 + 3) * 4')).toBe(20);
    });

    test('should handle power operator with parentheses', () => {
      expect(parse('(2 + 3) ** 2')).toBe(25);
    });

    test('should handle nested precedence', () => {
      expect(parse('2 * (3 + 4 * 5)')).toBe(46);
    });
  });

  describe('Multiple parentheses groups', () => {
    test('should parse multiple parentheses groups', () => {
      expect(parse('(2 + 3) + (4 + 5)')).toBe(14);
    });

    test('should multiply parentheses groups', () => {
      expect(parse('(2 + 3) * (4 + 5)')).toBe(45);
    });

    test('should handle complex multiple groups', () => {
      expect(parse('(2 + 3) * (4 - 1) + (5 * 2)')).toBe(25);
    });
  });

  describe('Invalid parentheses', () => {
    test('should reject unmatched opening parenthesis', () => {
      expect(() => parse('(2 + 3')).toThrow();
    });

    test('should reject unmatched closing parenthesis', () => {
      expect(() => parse('2 + 3)')).toThrow();
    });

    test('should reject mismatched parentheses', () => {
      expect(() => parse('(2 + 3))')).toThrow();
    });

    test('should reject reversed parentheses', () => {
      expect(() => parse(')2 + 3(')).toThrow();
    });

    test('should reject empty parentheses', () => {
      expect(() => parse('()')).toThrow();
    });

    test('should reject consecutive opening parentheses without content', () => {
      expect(() => parse('(())')).toThrow();
    });
  });

  describe('Complex expressions with parentheses', () => {
    test('should handle deeply nested operations', () => {
      expect(parse('((2 + 3) * (4 + 5))')).toBe(45);
    });

    test('should handle mix of all operators', () => {
      expect(parse('(2 + 3) * 4 - (5 / 5) ** 2')).toBe(19);
    });

    test('should handle very nested expression', () => {
      expect(parse('(((2 + 3) * 4) - 5)')).toBe(15);
    });

    test('should handle whitespace in parentheses', () => {
      expect(parse('( 2 + 3 ) * ( 4 + 5 )')).toBe(45);
    });
  });

  describe('Edge cases', () => {
    test('should handle single number in multiple parentheses', () => {
      expect(parse('(((((5)))))')).toBe(5);
    });

    test('should handle decimal numbers in parentheses', () => {
      expect(parse('(2.5 + 3.5)')).toBe(6);
    });

    test('should handle scientific notation in parentheses', () => {
      expect(parse('(1.0e+2 + 50)')).toBe(150);
    });

    test('should handle negative results', () => {
      expect(parse('(2 - 5)')).toBe(-3);
    });
  });

});
