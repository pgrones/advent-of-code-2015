import { input, molecule } from "./input.js";

const replacements = input.split("\n").map((x) => ({
  from: x.substring(0, x.indexOf(" ")),
  to: x.substring(x.lastIndexOf(" ") + 1),
}));

const distinctMolecules = new Set();

for (const replacement of replacements) {
  for (let i = 0; i < molecule.length; i++) {
    if (molecule.substring(i).startsWith(replacement.from)) {
      distinctMolecules.add(
        molecule.substring(0, i) +
          replacement.to +
          molecule.substring(i + replacement.from.length)
      );
    }
  }
}

console.log(distinctMolecules.size);

let shortestPath = Infinity;

const replace = (molecule, replacements, pathLength = 0) => {
  if (pathLength >= shortestPath) return;

  if (molecule.includes("e")) {
    if (molecule.length === 1) {
      shortestPath = pathLength;
      console.log(pathLength);
    }

    return;
  }

  for (const replacement of replacements) {
    const indices = [];

    for (let i = 0; i <= molecule.length - replacement.to.length; i++) {
      if (molecule.substring(i).startsWith(replacement.to)) indices.push(i);
    }

    for (const index of indices) {
      replace(
        molecule.substring(0, index) +
          replacement.from +
          molecule.substring(index + replacement.to.length),
        replacements,
        pathLength + 1
      );
    }
  }
};

replace(molecule, replacements);

console.log(shortestPath);
