import { input } from "./input.js";

const part1 = [...input].reduce(
  (prev, curr) => (curr === "(" ? prev + 1 : prev - 1),
  0
);

console.log(part1);

let part2 = 0,
  floor = 0;

for (const step of [...input]) {
  part2++;

  step === "(" ? floor++ : floor--;

  if (floor === -1) break;
}

console.log(part2);
