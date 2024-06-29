import { input } from "./input.js";

const strings = input.split("\n");

const naughtySubStrings = ["ab", "cd", "pq", "xy"];

let niceStrings = 0;

for (const string of strings) {
  if (naughtySubStrings.some((x) => string.includes(x))) continue;

  if ((string.match(/[aeiou]/g)?.length ?? 0) >= 3 && /(.)\1/.test(string))
    niceStrings++;
}

console.log(niceStrings);

niceStrings = 0;

for (const string of strings) {
  let hasTwoPairs = false;
  let i = 0;

  while (i < string.length - 1) {
    const pattern = string.slice(i, i + 2);

    if (
      string.substring(0, i).includes(pattern) ||
      string.substring(i + 2).includes(pattern)
    ) {
      hasTwoPairs = true;
      break;
    }

    i++;
  }

  if (!hasTwoPairs) continue;

  for (let k = 0; k < string.length - 2; k++) {
    const window = string.slice(k, k + 3);

    if (window[0] === window[2]) {
      niceStrings++;
      console.log(string);
      break;
    }
  }
}

console.log(niceStrings);
