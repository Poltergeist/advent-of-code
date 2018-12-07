function closest({ coordx, coordy }, coordinates) {
  let closest = 0;
  const distances = coordinates
    .map(({ x, y, index }) => {
      return {
        distance: Math.abs(x - coordx) + Math.abs(y - coordy),
        xy: index
      };
    })
    // .filter(a => a.distance != 0)
    .sort((a, b) => a.distance - b.distance);
  if (distances[0].distance === distances[1].distance) {
    return null;
  }
  return distances[0];
}
module.exports = function(input) {
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
      const closestDistance = closest({ coordx, coordy }, input);
      grid[coordy][coordx] = closestDistance != null ? closestDistance.xy : ".";
    }
  }
  let infiniteKeys = [];
  grid[0].forEach(x => infiniteKeys.push(x));
  grid[grid.length - 1].forEach(x => infiniteKeys.push(x));
  grid.forEach(a => {
    infiniteKeys.push(a[0]);
    infiniteKeys.push(a[a.length - 1]);
  });
  infiniteKeys = Object.keys(
    infiniteKeys.reduce((acc, a) => {
      acc[a] = true;
      return acc;
    }, {})
  );
  let result = Object.entries(
    grid
      .reduce((acc, a) => acc.concat(a), [])
      .filter(a => a != ".")
      .reduce((acc, a) => {
        acc[a] = acc[a] != null ? acc[a] + 1 : 1;
        return acc;
      }, [])
  )
    .filter(([key]) => {
      return !infiniteKeys.includes(key) && key != ".";
    })
    .sort(([_key, bvalue], [_bkey, avalue]) => avalue - bvalue);
  return result[0][1];
};
