const parseInput = require("../main");

describe("0101", () => {
  it("add", () => {
    expect(
      parseInput(`+1
    +1
    +1`)
    ).toBe(3);
  });

  it("mixed", () => {
    expect(
      parseInput(`+1
    +1
    -2`)
    ).toBe(0);
  });

  it("sub", () => {
    expect(
      parseInput(`-1
    -2
    -3`)
    ).toBe(-6);
  });
});
