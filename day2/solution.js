import { input } from "./input.js";

const dimensions = input.split("\n");

let part1 = 0;

for (const dimension of dimensions) {
  const [l, w, h] = dimension.split("x").map((x) => parseInt(x));

  const slack = [l, w, h]
    .toSorted((a, b) => a - b)
    .slice(0, 2)
    .reduce((prev, curr) => prev * curr);

  part1 += 2 * l * w + 2 * w * h + 2 * h * l + slack;
}

console.log(part1);

let part2 = 0;

for (const dimension of dimensions) {
  const [l, w, h] = dimension.split("x").map((x) => parseInt(x));

  const present = [l, w, h]
    .toSorted((a, b) => a - b)
    .slice(0, 2)
    .reduce((prev, curr) => prev * 2 + curr * 2);

  part2 += l * w * h + present;
}

console.log(part2);
