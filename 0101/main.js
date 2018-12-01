module.exports = function(input) {
  let sum = "";
  input = input.split("\n");
  return input.reduce((a, b) => a * 1 + b * 1, 0);
};
