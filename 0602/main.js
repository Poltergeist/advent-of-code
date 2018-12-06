function distance({ x: ax, y: ay }, { x: bx, y: by }) {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}
function closest({ coordx, coordy }, coordinates) {
  let closest = 0;
  const distances = coordinates
    .map(({ x, y, index }) => {
      return {
        distance: distance({ x, y }, { x: coordy, y: coordy }),
        xy: index
      };
    })
    .sort((a, b) => a.distance - b.distance);
  if (distances[0].distance === distances[1].distance) {
    return null;
  }
  return distances[0];
}
module.exports = function(input, maxDistance = 10000) {
  let max = { x: 0, y: 0 };
  let min = { x: Infinity, y: Infinity };
  input = input.map((coordinates, index) => {
    let [x, y] = coordinates.split(", ");
    max.x = Math.max(x, max.x);
    max.y = Math.max(y, max.y);
    min.x = Math.min(x, min.x);
    min.y = Math.min(y, min.y);
    return { x, y, index };
  });

  let grid = new Array(max.y + 1)
    .fill(0)
    .map(() => new Array(max.x + 1).fill(0));
  for (let coordx = 0; coordx <= max.x; coordx++) {
    for (let coordy = 0; coordy <= max.y; coordy++) {
      grid[coordy][coordx] = input.reduce(
        (acc, { x, y }) => acc + distance({ x, y }, { x: coordx, y: coordy }),
        0
      );
    }
  }
  return grid.reduce((acc, a) => acc.concat(a), []).filter(i => i < maxDistance)
    .length;
};
