const parseInput = require("../main");

describe("main", () => {
  it("test", () => {
    expect(
      parseInput([
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
        "fguij",
        "axcye",
        "wvxyz"
      ])
    ).toBe("fgij");
  });
});
