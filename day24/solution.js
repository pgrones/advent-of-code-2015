import { input } from "./input.js";

const combinationsOfNElements = (
  presents,
  n,
  data = new Array(n),
  start = 0,
  end = presents.length - 1,
  index = 0,
  result = []
) => {
  if (index == n) {
    result.push(data.slice(0, n));
  }

  for (let i = start; i <= end && end - i + 1 >= n - index; i++) {
    data[index] = presents[i];
    combinationsOfNElements(presents, n, data, i + 1, end, index + 1, result);
  }

  return result;
};

const presents = input.split("\n").map((x) => parseInt(x));
const results = new Set();

for (let group1Index = 1; group1Index < presents.length - 2; group1Index++) {
  const group1Combinations = combinationsOfNElements(presents, group1Index);

  if (
    [...results].map((x) => x.split(",").length).some((x) => x === group1Index)
  )
    continue;

  for (const group1Combination of group1Combinations) {
    for (
      let group2Index = 1;
      group2Index < presents.length - group1Index;
      group2Index++
    ) {
      const group2Combinations = combinationsOfNElements(
        presents.filter((x) => !group1Combination.includes(x)),
        group2Index
      );

      for (const group2Combination of group2Combinations) {
        for (
          let group3Index = presents.length - group2Index - group1Index;
          group3Index < presents.length;
          group3Index++
        ) {
          const group3Combinations = combinationsOfNElements(
            presents.filter(
              (x) =>
                !group1Combination.includes(x) && !group2Combination.includes(x)
            ),
            group3Index
          );

          for (const group3Combination of group3Combinations) {
            const lengths = [
              group1Combination.reduce((prev, curr) => prev + curr),
              group2Combination.reduce((prev, curr) => prev + curr),
              group3Combination.reduce((prev, curr) => prev + curr),
            ];

            if (lengths[0] === lengths[1] && lengths[0] === lengths[2]) {
              results.add(group1Combination.toSorted().toString());
            }
          }
        }
      }
    }
  }
}

console.log(
  [...results]
    .map((x) => x.split(","))
    .toSorted((a, b) => a.length - b.length)
    .filter((x, _, arr) => x.length === arr[0].length)
    .map((x) => x.reduce((prev, curr) => prev * curr))
    .toSorted()[0]
);
