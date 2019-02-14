module.exports = function(input) {
  let result = [];
  input = input
    .map(a => {
      a = a.replace(/[^A-Z]/g, "").split("");
      return [a[1], a[2]];
    })
    // .map(([incoming, outgoing]) => `[${incoming}]->[${outgoing}]`)
    // .join(", ");
    // console.log(input);
    .reduce(
      (acc, [incoming, out]) => {
        if (acc.outToIn[out] == null) {
          acc.outToIn[out] = [];
        }
        acc.outToIn[out] = [...acc.outToIn[out], incoming];
        if (acc.inToOut[incoming] == null) {
          acc.inToOut[incoming] = [];
        }
        acc.inToOut[incoming] = [...acc.inToOut[incoming], out];
        return acc;
      },
      { outToIn: {}, inToOut: {} }
    );

  let todo = getStart(input.outToIn);
  // console.log(todo);
  while (todo.length !== 0) {
    let nextStep = input.inToOut[todo[0]];
    if (
      input.outToIn[todo[0]] != undefined &&
      input.outToIn[todo[0]].some(a => !result.includes(a))
    ) {
      todo = [...todo.slice(1), todo[0]];
      continue;
    }
    result = [...result, todo[0]];
    todo = (nextStep != null
      ? [...todo.slice(1), ...nextStep]
      : [...todo.slice(1)]
    )
      .filter(
        (i, index, array) =>
          array.indexOf(i) === index &&
          (input.outToIn[i] != null
            ? !input.outToIn[i].some(a => {
                return array.includes(a);
              })
            : true)
      )
      .sort((a, b) => (a > b ? 1 : -1));
  }
  return result.join("");
};
function getStart(input) {
  let allPrerequists = [].concat(...Object.values(input));
  let allGoals = Object.keys(input);
  return allPrerequists.filter(
    (a, index, array) => !allGoals.includes(a) && array.indexOf(a) === index
  );
}
