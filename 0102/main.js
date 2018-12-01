module.exports = function(input) {
  input = input.split("\n");
  let sumCollection = { 0: true };
  let sum = 0;

  for (let counter = 0; counter < input.length; counter++) {
    sum += input[counter] * 1;
    if (sumCollection[sum] === true) {
      return sum;
    }
    sumCollection[sum] = true;

    if (counter === input.length - 1) {
      counter = -1;
    }
  }
  return false;
};
