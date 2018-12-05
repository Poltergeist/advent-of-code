function parseString(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (i === input.length - 1) {
      output += input[i];
      continue;
    }
    if (
      input[i] != input[i + 1] &&
      input[i].toUpperCase() === input[i + 1].toUpperCase()
    ) {
      i++;
      continue;
    }
    output += input[i];
  }
  if (input.length != output.length) {
    return parseString(output);
  }
  return output.length;
}
module.exports = parseString;
