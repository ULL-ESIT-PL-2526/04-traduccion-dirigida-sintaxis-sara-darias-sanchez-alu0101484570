const parse = require("../src/parser.js").parse;
describe('Parser Failing Tests', () => {
  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14); // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7); // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13); // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3); // (20 / 4) - 2 = 3
  });
  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11); // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18); // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2); // 10 - (2 ** 3) = 2
  });
  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512); // 2 ** (3 ** 2) = 2 ** 9 = 512
    expect(parse("3 ** 2 ** 2")).toBe(81); // 3 ** (2 ** 2) = 3 ** 4 = 81
  });
  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3); // 1 + (2 * 3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15 / 3) + (2 * 4) = 13
    expect(parse("10 - 3 * 2 + 1")).toBe(5); // 10 - (3 * 2) + 1 = 5
  });
  test('should handle expressions with exponentiation precedence', () => {
    expect(parse("2 ** 3 + 1")).toBe(9); // (2 ** 3) + 1 = 9
    expect(parse("3 + 2 ** 4")).toBe(19); // 3 + (2 ** 4) = 19
    expect(parse("2 * 3 ** 2 + 1")).toBe(19); // 2 * (3 ** 2) + 1 = 19
  });
  test('should handle various realistic calculations with correct precedence', () => {
    expect(parse("1 + 2 * 3")).toBe(7); // 1 + (2 * 3) = 7
    expect(parse("6 / 2 + 4")).toBe(7); // (6 / 2) + 4 = 7
    expect(parse("2 ** 2 + 1")).toBe(5); // (2 ** 2) + 1 = 5
    expect(parse("10 / 2 / 5")).toBe(1); // (10 / 2) / 5 = 1
    expect(parse("100 - 50 + 25")).toBe(75); // (100 - 50) + 25 = 75
    expect(parse("2 * 3 + 4 * 5")).toBe(26); // (2 * 3) + (4 * 5) = 26
  });
  describe('floating point precision', () => { 
    test('should handle floating point precision correctly', () => {
      expect(parse("0.1 + 0.2")).toBeCloseTo(0.3); // 0.1 + 0.2 = 0.3
      expect(parse("0.1 * 0.2")).toBeCloseTo(0.02); // 0.1 * 0.2 = 0.02
      expect(parse("0.3 - 0.1")).toBeCloseTo(0.2); // 0.3 - 0.1 = 0.2
      expect(parse("0.3 / 0.1")).toBeCloseTo(3); // 0.3 / 0.1 = 3
    });
    test('should handle scientific notation', () => {
      expect(parse("1e+10 + 1e+10")).toBe(2e10);
      expect(parse("1e-10 + 1e-10")).toBe(2e-10);
    });
    test('should handle very large and very small numbers', () => {
      expect(parse("1e+100 + 1e+100")).toBe(2e100);
      expect(parse("1e-100 + 1e-100")).toBe(2e-100);
    });
    test('should handle precision in complex expressions', () => {
      expect(parse("0.1 + 0.2 * 0.3")).toBeCloseTo(0.16); // 0.1 + (0.2 * 0.3) = 0.16
      expect(parse("(0.1 + 0.2) * 0.3")).toBeCloseTo(0.09); // (0.1 + 0.2) * 0.3 = 0.09
    });
    test('should handle precision in scientific notation in complex expressions', () => {
      expect(parse("1e+10 + 1e+10 * 1e-10")).toBeCloseTo(10000000001); // 1e+10 + (1e+10 * 1e-10) = 2e+10
    });
  });
});