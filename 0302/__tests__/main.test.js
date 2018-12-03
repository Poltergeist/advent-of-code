const parseInput = require("../main");

describe("main", () => {
  it("test", () => {
    expect(
      parseInput(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"])
    ).toBe(3);
  });
});
