class Square {
  constructor(id) {
    this.id = id;
    this.overlap = false;
  }
  setOverlap() {
    this.overlap = true;
  }
  isOverlapping() {
    return this.overlap;
  }
}
module.exports = function(input) {
  let fabric = [];
  let squares = [];
  input = input.forEach(string => {
    let [_, id, x, y, width, height] = string
      .match(/#(\d*)\s\@\s(\d*),(\d*):\s(\d*)x(\d*)/)
      .map(a => a * 1);
    let square = new Square(id);
    squares.push(square);

    for (let cx = x; cx < x + width; cx++) {
      for (let cy = y; cy < y + height; cy++) {
        if (fabric[cx] == null) {
          fabric[cx] = [];
        }
        if (fabric[cx][cy] != null) {
          fabric[cx][cy].setOverlap();
          square.setOverlap();
          continue;
        }
        fabric[cx][cy] = square;
      }
    }
  });
  return squares.filter(s => !s.isOverlapping())[0].id;
};
