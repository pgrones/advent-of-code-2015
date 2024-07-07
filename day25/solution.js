import { input } from "./input.js";

const [goalY, goalX] = [...input.matchAll(/(?<!\+)\d+/g)].map((x) =>
  parseInt(x[0])
);

let y = 2;
let value = 20151125;

outer: while (true) {
  let currX = 1;
  let currY = y;

  while (currY > 0) {
    value = (value * 252533) % 33554393;

    if (currX === goalX && currY == goalY) break outer;

    currX++;
    currY--;
  }

  y++;
}

console.log(value);
