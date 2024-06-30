import { input } from "./input.js";

const attendees = input.split("\n");

const table = [];

for (const attendee of attendees) {
  const name = attendee.substring(0, attendee.indexOf(" "));

  let entry = table.find((x) => x.name === name);
  if (!entry) {
    entry = { name, neighbors: [] };
    table.push(entry);
  }

  let happiness = parseInt(attendee.match(/\d+/)[0]);
  if (attendee.includes("lose")) happiness *= -1;

  const neighbor = attendee.substring(
    attendee.indexOf("to ") + 3,
    attendee.length - 1
  );

  entry.neighbors.push({ name: neighbor, happiness });
}

const permute = (table) => {
  let res = [[]];
  for (let attendee of table) {
    const temp = [];
    for (let table of res) {
      for (let i = 0; i <= table.length; i++) {
        const newTable = [...table];
        newTable.splice(i, 0, attendee);
        temp.push(newTable);
      }
    }
    res = temp;
  }

  return res;
};

const computeOptimum = (table) => {
  let optimum = -Infinity;

  for (const permutation of permute(table)) {
    let localOptimum = 0;

    for (let i = 0; i < permutation.length; i++) {
      const curr = permutation[i];
      const next = permutation[i + 1 === permutation.length ? 0 : i + 1];

      localOptimum +=
        curr.neighbors.find((x) => x.name === next.name).happiness +
        next.neighbors.find((x) => x.name === curr.name).happiness;
    }

    if (localOptimum > optimum) optimum = localOptimum;
  }

  return optimum;
};

const optimum = computeOptimum(table);

console.log(optimum);

const me = { name: "Me", neighbors: [] };
for (const attendee of table) {
  attendee.neighbors.push({ name: "Me", happiness: 0 });
  me.neighbors.push({
    name: attendee.name,
    happiness: 0,
  });
}
table.push(me);

const optimumWithMe = computeOptimum(table);

console.log(optimumWithMe);
