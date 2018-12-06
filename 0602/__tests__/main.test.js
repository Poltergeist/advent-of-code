const parseInput = require("../main");

describe("main", () => {
  it("test", () => {
    expect(
      parseInput(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"], 32)
    ).toBe(16);
  });
});
