const parseString = require("../main");

describe("main", () => {
  it("test", () => {
    expect(parseString("dabAcCaCBAcCcaDA")).toBe(4);
  });
});
