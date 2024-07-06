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
