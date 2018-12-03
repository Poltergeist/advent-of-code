function stringDifference(a, b) {
  if (a.length != b.length) {
    return 2;
  }
  let diff = 0;
  for (let char = 0; char < a.length || diff < 1; char++) {
    if (a[char] != b[char]) {
      diff++;
    }
  }
  return diff;
}
module.exports = function(input) {
  input = input.sort();
  for (let c = 0; c < input.length - 1; c++) {
    for (let i = c + 1; i < input.length; i++) {
      if (stringDifference(input[c], input[i]) === 1) {
        return new Array(input[c].length)
          .fill(0)
          .map((a, index) => input[c][index])
          .filter((a, index) => input[i][index] === a)
          .join("");
      }
    }
  }
  return input;
};
