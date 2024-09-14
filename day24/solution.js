import { input } from "./input.js";

const presents = input.split("\n").map((x) => parseInt(x));

const getCombinations = (presents, n) => {
  const index = [];
  const max = presents.length;

  for (let j = 0; j < n; j++) index[j] = j;
  index[n] = max;

  let ok = true;
  const combinations = [];

  while (ok) {
    const combination = [];
    for (let j = 0; j < n; j++) combination[j] = presents[index[j]];
    combinations.push(combination);

    ok = false;

    for (let j = n; j > 0; j--) {
      if (index[j - 1] < index[j] - 1) {
        index[j - 1]++;
        for (let k = j; k < n; k++) index[k] = index[k - 1] + 1;
        ok = true;
        break;
      }
    }
  }

  return combinations;
};

const getWeight = (group) => group.reduce((prev, curr) => prev + curr, 0);
const getEntanglement = (group) => group.reduce((prev, curr) => prev * curr);
const getRemaining = (all, group) => all.filter((x) => !group.includes(x));

// ----------------PART1-----------------------------

let entanglement = Infinity;

for (let i = 1; i < presents.length; i++) {
  const firstGroups = getCombinations(presents, i);

  for (const group of firstGroups) {
    const weight = getWeight(group);
    const remaining = getRemaining(presents, group);
    const remainingWeight = getWeight(remaining);

    if (weight * 2 !== remainingWeight) continue;

    for (let j = 1; j < remaining.length; j++) {
      const secondGroups = getCombinations(remaining, j).filter(
        (x) => getWeight(x) === weight
      );

      if (!secondGroups.length) continue;

      for (const secondGroup of secondGroups) {
        const thirdGroup = getRemaining(remaining, secondGroup);

        if (!thirdGroup.length || getWeight(thirdGroup) !== weight) continue;

        entanglement = Math.min(entanglement, getEntanglement(group));
      }
    }
  }

  if (entanglement !== Infinity) break;
}

console.log(entanglement);

// ----------------PART2-----------------------------

entanglement = Infinity;

for (let i = 1; i < presents.length; i++) {
  const firstGroups = getCombinations(presents, i);

  for (const group of firstGroups) {
    const weight = getWeight(group);
    let remaining = getRemaining(presents, group);
    let remainingWeight = getWeight(remaining);

    if (weight * 3 !== remainingWeight) continue;

    for (let j = 1; j < remaining.length; j++) {
      const secondGroups = getCombinations(remaining, j).filter(
        (x) => getWeight(x) === weight
      );

      if (!secondGroups.length) continue;

      for (const secondGroup of secondGroups) {
        remaining = getRemaining(remaining, secondGroup);
        remainingWeight = getWeight(remaining);

        if (weight * 2 !== remainingWeight) continue;

        for (let k = 1; k < remaining.length; k++) {
          const thirdGroups = getCombinations(remaining, k).filter(
            (x) => getWeight(x) === weight
          );

          if (!thirdGroups.length) continue;

          for (const thirdGroup of thirdGroups) {
            const fourthGroup = getRemaining(remaining, thirdGroup);

            if (!fourthGroup.length || getWeight(fourthGroup) !== weight)
              continue;

            entanglement = Math.min(entanglement, getEntanglement(group));
          }
        }
      }
    }
  }

  if (entanglement !== Infinity) break;
}

console.log(entanglement);
