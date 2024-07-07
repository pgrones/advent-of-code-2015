import { input } from "./input.js";

const [goalY, goalX] = [...input.matchAll(/(?<!\+)\d+/g)].map((x) =>
  parseInt(x[0])
);

let x = 1;
let y = 2;
let value = 20151125;

outer: while (true) {
  let currX = x;
  let currY = y;

  while (currY > 0) {
    value = (value * 252533) % 33554393;

    if (currX === goalX && currY == goalY) {
      console.log(value);
      break outer;
    }

    currX++;
    currY--;
  }

  x = 1;
  y++;
}
