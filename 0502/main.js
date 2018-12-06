function optimizeString(input) {
  const [letter, count] = Object.entries(
    [].reduce.call(
      input,
      (acc, char) => {
        char = char.toLowerCase();
        console.log(char);
        acc[char] = acc[char] != null ? acc[char] + 1 : 1;
        console.log(acc);
        return acc;
      },
      {}
    )
  ).sort(([_a, acount], [_b, bcount]) => bcount - acount)[0];
  console.log(letter, count, input);
  return input.replace(
    new RegExp(`[${letter}${letter.toUpperCase()}]`, "g"),
    ""
  );
}
function parseInput(input) {
  let outputs = [];
  for (let char = 97; char < 123; char++) {
    let letter = String.fromCharCode(char);
    let shortenInput = input.replace(
      new RegExp(`[${letter}${letter.toUpperCase()}]`, "g"),
      ""
    );
    if (shortenInput.length == input.length) {
      continue;
    }
    outputs.push(parseString(shortenInput));
    console.log(`${letter} Done`);
  }
  return outputs.sort((a, b) => a - b)[0];
}
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
module.exports = parseInput;
