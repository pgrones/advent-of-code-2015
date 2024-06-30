import { input } from "./input.js";

console.log(
  [...input.matchAll(/-*\d+/g)]
    .flat()
    .reduce((prev, curr) => prev + parseInt(curr), 0)
);

const traverse = (node) => {
  if (Array.isArray(node)) {
    let sum = 0;
    for (const n of node) {
      sum += traverse(n);
    }
    return sum;
  }

  if (typeof node === "object") {
    const values = Object.values(node);

    if (values.some((x) => x === "red")) return 0;

    let sum = 0;
    for (const v of values) {
      sum += traverse(v);
    }
    return sum;
  }

  if (typeof node === "string") return 0;

  return parseInt(node);
};

const doc = JSON.parse(input);

console.log(traverse(doc));
