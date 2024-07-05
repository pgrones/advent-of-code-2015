import { input } from "./input.js";

const instructions = input.split("\n");

const createWires = () => {
  const wires = [];

  for (const instruction of instructions) {
    const name = instruction.substring(instruction.lastIndexOf(" ") + 1);

    let value;
    let operation;
    let leftValue;
    let rightValue;

    if (instruction.startsWith("NOT")) {
      operation = "NOT";

      rightValue = /(?<=NOT\s)[\w\d]+/.exec(instruction)[0];

      if (/^\d+$/.test(rightValue))
        rightValue = new Uint16Array([parseInt(rightValue)]);
    } else if (!/^\d+\s->/.test(instruction)) {
      leftValue = instruction.substring(0, instruction.indexOf(" "));

      if (/^\d+$/.test(leftValue))
        leftValue = new Uint16Array([parseInt(leftValue)]);

      if (/^[a-z]+(?=\s->)/.test(instruction)) {
        operation = "PIPE";
      } else {
        operation = /(?<=^[\w]+\s)\w+/.exec(instruction)[0];

        rightValue = /[\w]+(?=\s->)/.exec(instruction)[0];

        if (/^\d+$/.test(rightValue))
          rightValue = new Uint16Array([parseInt(rightValue)]);
      }
    } else {
      value = new Uint16Array([parseInt(/^\d+/.exec(instruction)[0])]);
    }

    wires.push({ name, value, operation, leftValue, rightValue });
  }
  return wires;
};

const hasValue = (value, wires) =>
  typeof value !== "string" || !!wires.find((x) => x.name === value).value;

const getValue = (value, wires) =>
  typeof value !== "string" ? value : wires.find((x) => x.name === value).value;

const execute = (wire, wires) => {
  const right =
    wire.operation === "PIPE" ? undefined : getValue(wire.rightValue, wires);
  const left =
    wire.operation === "NOT" ? undefined : getValue(wire.leftValue, wires);

  switch (wire.operation) {
    case "AND":
      return new Uint16Array([left[0] & right[0]]);
    case "OR":
      return new Uint16Array([left[0] | right[0]]);
    case "LSHIFT":
      return new Uint16Array([left[0] << right[0]]);
    case "RSHIFT":
      return new Uint16Array([left[0] >> right[0]]);
    case "NOT":
      return new Uint16Array([~right[0]]);
    case "PIPE":
      return new Uint16Array([left[0]]);
  }
};

const run = (wires) => {
  let done = false;

  while (!done) {
    done = true;

    for (const wire of wires) {
      if (wire.value) continue;

      if (hasValue(wire.rightValue, wires)) {
        if (wire.operation === "NOT" || hasValue(wire.leftValue, wires)) {
          done = false;
          wire.value = execute(wire, wires);
        }
      }
    }
  }

  return wires.find((x) => x.name === "a").value[0];
};

let wires = createWires();
const aValue = run(wires);
console.log(aValue);

wires = createWires();
wires.find((x) => x.name === "b").value = new Uint16Array([aValue]);
console.log(run(wires));
