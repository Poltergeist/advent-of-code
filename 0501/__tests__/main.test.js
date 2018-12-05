const parseInput = require("../main");

describe("main", () => {
  it("test", () => {
    expect(parseInput("dabAcCaCBAcCcaDA")).toBe(10);
  });
});
