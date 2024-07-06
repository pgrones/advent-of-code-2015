import { input } from "./input.js";

const createGrid = () => {
  const grid = [];
  for (const row of input.split("\n")) {
    grid.push(row.split("").map((x) => x === "#"));
  }

  return grid;
};

const getOnNeighbors = (x, y, grid, isStuck) => {
  const xMin = Math.max(0, x - 1);
  const yMin = Math.max(0, y - 1);
  const xMax = Math.min(grid[0].length - 1, x + 1);
  const yMax = Math.min(grid.length - 1, y + 1);

  if (isStuck) {
    if (
      (y === 0 && x === 0) ||
      (y === 0 && x === grid[0].length - 1) ||
      (y === grid.length - 1 && x === 0) ||
      (y === grid.length - 1 && x === grid[0].length - 1)
    )
      return 2;
  }

  let count = 0;
  for (let i = yMin; i <= yMax; i++) {
    for (let j = xMin; j <= xMax; j++) {
      if (i === y && j === x) continue;

      if (isStuck) {
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === grid[0].length - 1) ||
          (i === grid.length - 1 && j === 0) ||
          (i === grid.length - 1 && j === grid[0].length - 1)
        ) {
          count++;
          continue;
        }
      }

      if (grid[i][j]) count++;
    }
  }

  return count;
};

const execute = (grid, isStuck) => {
  for (let step = 0; step < 100; step++) {
    const newGrid = [];

    for (let y = 0; y < grid.length; y++) {
      const row = [];

      for (let x = 0; x < grid[0].length; x++) {
        const lightOn = grid[y][x];
        const neighborsOn = getOnNeighbors(x, y, grid, isStuck);

        if (lightOn) row.push(neighborsOn === 2 || neighborsOn === 3);
        else row.push(neighborsOn === 3);
      }

      newGrid.push(row);
    }

    grid = newGrid;
  }

  return grid.flat().reduce((prev, curr) => prev + curr);
};

console.log(execute(createGrid()));

const stuckGrid = createGrid();
stuckGrid[0][0] = true;
stuckGrid[stuckGrid.length - 1][0] = true;
stuckGrid[0][stuckGrid[0].length - 1] = true;
stuckGrid[stuckGrid.length - 1][stuckGrid[0].length - 1] = true;

console.log(execute(stuckGrid, true));
