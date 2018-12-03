const parseString = require("../main").parseString;
const parseInput = require("../main").parseInput;

describe("parseString", () => {
  it("case 0", () => {
    expect(parseString("abcdef")).toEqual({ 2: 0, 3: 0 });
  });

  it("case 1", () => {
    expect(parseString("bababc")).toEqual({ 2: 1, 3: 1 });
  });

  it("case 2", () => {
    expect(parseString("abbcde")).toEqual({ 2: 1, 3: 0 });
  });
  it("case 3", () => {
    expect(parseString("abcccd")).toEqual({ 2: 0, 3: 1 });
  });
  it("case 4", () => {
    expect(parseString("aabcdd")).toEqual({ 2: 1, 3: 0 });
  });
  it("case 5", () => {
    expect(parseString("abcdee")).toEqual({ 2: 1, 3: 0 });
  });
  it("case 6", () => {
    expect(parseString("ababab")).toEqual({ 2: 0, 3: 1 });
  });

  describe("parseInput", () => {
    it("case 0", () => {
      const keys = [
        "abcdef",
        "bababc",
        "abbcde",
        "abcccd",
        "aabcdd",
        "abcdee",
        "ababab"
      ];
      expect(parseInput(keys)).toBe(12);
    });
  });
});
