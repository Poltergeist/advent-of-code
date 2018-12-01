const parseInput = require("../main");

describe("main", () => {
  it("0", () => {
    expect(
      parseInput(`+1
    -1`)
    ).toBe(0);
  });
  it("10", () => {
    expect(
      parseInput(`+3
 +3
 +4
 -2
 -4`)
    ).toBe(10);
  });
  it("5", () => {
    expect(
      parseInput(`-6
       +3
 +8
 +5
 -6`)
    ).toBe(5);
  });
  it("14", () => {
    expect(
      parseInput(`+7
 +7
 -2
 -7
 -4`)
    ).toBe(14);
  });
});
