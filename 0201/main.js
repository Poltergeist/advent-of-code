function parseString(input) {
  const counts = {};
  for (let counter = 0; counter < input.length; counter++) {
    if (!counts[input[counter]]) {
      counts[input[counter]] = 1;
      continue;
    }
    counts[input[counter]]++;
  }
  const value = Object.values(counts);
  const results = {
    2: value.includes(2) ? 1 : 0,
    3: value.includes(3) ? 1 : 0
  };

  return results;
}
module.exports = {
  parseInput(input = []) {
    let multiplies = input.map(parseString).reduce(
      (acc, item) => {
        acc.a += item[2];
        acc.b += item[3];
        return acc;
      },
      { a: 0, b: 0 }
    );
    return multiplies.a * multiplies.b;
  },
  parseString
};
