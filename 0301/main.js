module.exports = function(input) {
  let fabric = [];
  input = input.forEach(string => {
    let [_, id, x, y, width, height] = string
      .match(/#(\d*)\s\@\s(\d*),(\d*):\s(\d*)x(\d*)/)
      .map(a => a * 1);

    for (let cx = x; cx < x + width; cx++) {
      for (let cy = y; cy < y + height; cy++) {
        if (fabric[cx] == null) {
          fabric[cx] = [];
        }
        if (fabric[cx][cy] != 2) {
          fabric[cx][cy] = (fabric[cx][cy] || 0) + 1;
        }
      }
    }
  });
  return fabric
    .map(a => a.join(""))
    .join("")
    .replace(/[^2]/g, "").length;
};
