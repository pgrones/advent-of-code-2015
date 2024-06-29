import { input } from "./input.js";

const moves = [...input];

const executeMove = (move, houses, pos) => {
  switch (move) {
    case "^":
      pos.y++;
      break;
    case ">":
      pos.x++;
      break;
    case "v":
      pos.y--;
      break;
    case "<":
      pos.x--;
      break;
  }

  houses.add(pos.x.toString() + "," + pos.y.toString());
};

const houses = new Set();

const pos = { x: 0, y: 0 };

houses.add(pos.x.toString() + "," + pos.y.toString());

for (const move of moves) {
  executeMove(move, houses, pos);
}

console.log(houses.size);

pos.x = 0;
pos.y = 0;
houses.clear();
houses.add(pos.x.toString() + "," + pos.y.toString());

const robotPos = { x: 0, y: 0 };
const robotHouses = new Set();

let i = 0;

for (const move of moves) {
  if (i % 2 === 0) executeMove(move, houses, pos);
  else executeMove(move, robotHouses, robotPos);

  i++;
}

console.log(new Set([...houses, ...robotHouses]).size);
