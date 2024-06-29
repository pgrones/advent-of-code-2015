import { input } from "./input.js";

const instructions = input.split("\n");

const grid = [];
for (let i = 0; i < 1000; i++) {
  grid.push(new Array(1000).fill(false));
}

const grid2 = [];
for (let i = 0; i < 1000; i++) {
  grid2.push(new Array(1000).fill(0));
}

for (const instruction of instructions) {
  const coords = [...instruction.matchAll(/\d+,\d+/g)].map((x) => ({
    x: parseInt(x[0].split(",")[0]),
    y: parseInt(x[0].split(",")[1]),
  }));

  for (let x = coords[0].x; x <= coords[1].x; x++) {
    for (let y = coords[0].y; y <= coords[1].y; y++) {
      if (instruction.startsWith("turn on")) {
        grid[x][y] = true;
        grid2[x][y]++;
      }

      if (instruction.startsWith("turn off")) {
        grid[x][y] = false;
        grid2[x][y] = grid2[x][y] > 0 ? grid2[x][y] - 1 : 0;
      }

      if (instruction.startsWith("toggle")) {
        grid[x][y] = !grid[x][y];
        grid2[x][y] += 2;
      }
    }
  }
}

const part1 = grid.reduce(
  (prev, curr) => prev + curr.reduce((x, y) => (y ? x + 1 : x), 0),
  0
);

console.log(part1);

const part2 = grid2.reduce(
  (prev, curr) => prev + curr.reduce((x, y) => x + y),
  0
);

console.log(part2);
