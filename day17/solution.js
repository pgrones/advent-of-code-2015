import { input } from "./input.js";

const containers = input
  .split("\n")
  .map((x, i) => ({ id: i.toString(), volume: parseInt(x) }));

for (let i = 0; i < containers.length; i++) {
  containers[i].neighbors = containers.filter((_, j) => j !== i);
}

const traverse = (node, foundPaths, visited = []) => {
  visited.push(node);

  const totalVolume = visited.reduce((prev, curr) => prev + curr.volume, 0);

  if (totalVolume > 150) return 0;

  if (totalVolume === 150) {
    const currPath = visited
      .map((x) => x.id)
      .toSorted((a, b) => a - b)
      .join();

    if (foundPaths.has(currPath)) return 0;

    foundPaths.add(currPath);
    return 1;
  }

  const notVisited = node.neighbors.filter(
    (x) => !visited.find((y) => y.id === x.id)
  );

  let sum = 0;
  for (const neighbor of notVisited) {
    sum += traverse(neighbor, foundPaths, [...visited]);
  }

  return sum;
};

const foundPaths = new Set();
for (const container of containers) {
  console.log(container.id);
  traverse(container, foundPaths);
}

console.log(foundPaths.size);
console.log(
  [...foundPaths]
    .map((x) => x.split(",").length)
    .toSorted((a, b) => a - b)
    .filter((x, _, arr) => x === arr[0]).length
);
