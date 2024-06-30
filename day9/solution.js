import { input } from "./input.js";

const distances = input.split("\n");

const nodes = [];

for (const distance of distances) {
  const source = distance.substring(0, distance.indexOf(" "));
  const destination = distance.substring(
    distance.indexOf("to ") + 3,
    distance.indexOf(" =")
  );
  const weight = parseInt(distance.match(/\d+/)[0]);

  let node = nodes.find((x) => x.name === source);
  if (!node) {
    node = { name: source, destinations: [] };
    nodes.push(node);
  }

  let destNode = nodes.find((x) => x.name === destination);
  if (!destNode) {
    destNode = { name: destination, destinations: [] };
    nodes.push(destNode);
  }

  node.destinations.push({ node: destNode, weight });
  destNode.destinations.push({ node, weight });
}

const traverse = (node, visited = [], weight = 0) => {
  visited.push({ name: node.name, weight });

  if (visited.length === nodes.length) return visited;

  const nextNodes = node.destinations.filter(
    (x) => !visited.find((y) => y.name === x.node.name)
  );

  const paths = [];
  for (const nextNode of nextNodes) {
    paths.push(traverse(nextNode.node, [...visited], nextNode.weight));
  }

  return paths;
};

let shortestPath = Infinity;
let longestPath = -Infinity;

for (const node of nodes) {
  const paths = traverse(node)
    .flat(nodes.length - 2)
    .map((x) => x.reduce((prev, curr) => prev + curr.weight, 0));

  const shortestLocalPath = Math.min(...paths);
  const longestLocalPath = Math.max(...paths);

  if (shortestPath > shortestLocalPath) {
    shortestPath = shortestLocalPath;
  }

  if (longestPath < longestLocalPath) {
    longestPath = longestLocalPath;
  }
}

console.log(shortestPath);
console.log(longestPath);
