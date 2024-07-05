import { input, compoundsInput } from "./input.js";

const compounds = compoundsInput.split("\n").map((x) => x + ",");
const sues = input.split("\n").map((x) => x + ",");

console.log(
  parseInt(
    /\d+/.exec(
      sues.filter((sue) =>
        compounds.every(
          (compound) =>
            !sue.includes(compound.split(":")[0]) || sue.includes(compound)
        )
      )[0]
    )[0]
  )
);

const compoundMap = {};
for (const compound of compounds) {
  const temp = compound.split(": ");
  compoundMap[temp[0]] = parseInt(temp[1]);
}

let suesList = [];
for (const sue of sues) {
  const sueObj = { number: parseInt(/\d+/.exec(sue)[0]) };

  for (const key of Object.keys(compoundMap)) {
    if (sue.includes(key)) {
      sueObj[key] = parseInt(new RegExp(`(?<=${key}:\\s)\\d+`).exec(sue)[0]);
    }
  }

  suesList.push(sueObj);
}

for (const [key, value] of Object.entries(compoundMap)) {
  suesList = suesList.filter((sue) => {
    if (!Object.keys(sue).includes(key)) return true;

    if (key === "cats" || key === "trees") return sue[key] > value;

    if (key === "pomeranians" || key === "goldfish") return sue[key] < value;

    return sue[key] === value;
  });
}

console.log(suesList[0].number);
