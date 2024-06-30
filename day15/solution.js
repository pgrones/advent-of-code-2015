import { input } from "./input.js";

const ingredients = [];
for (const ingredient of input.split("\n")) {
  ingredients.push(
    [...ingredient.matchAll(/-*\d+/g)].flat().map((x) => parseInt(x))
  );
}

let highScore = 0;

for (let i = 100; i > 0; i--) {
  const firstScore = ingredients[0].slice(0, -1).map((x) => x * i);

  for (let j = 100 - i; j > 0; j--) {
    const secondScore = ingredients[1].slice(0, -1).map((x) => x * j);

    for (let k = 100 - i - j; k > 0; k--) {
      const thirdScore = ingredients[2].slice(0, -1).map((x) => x * k);

      for (let l = 100 - i - j - k; l > 0; l--) {
        const fourthScore = ingredients[3].slice(0, -1).map((x) => x * l);

        const score = firstScore
          .map(
            (x, index) =>
              x + secondScore[index] + thirdScore[index] + fourthScore[index]
          )
          .reduce(
            (prev, curr) => (prev < 0 ? 0 : prev) * (curr < 0 ? 0 : curr)
          );

        if (highScore < score) highScore = score;
      }
    }
  }
}

console.log(highScore);

highScore = 0;

for (let i = 100; i > 0; i--) {
  const firstScore = ingredients[0].slice(0, -1).map((x) => x * i);
  let calories = ingredients[0][ingredients[0].length - 1] * i;

  for (let j = 100 - i; j > 0; j--) {
    const secondScore = ingredients[1].slice(0, -1).map((x) => x * j);
    calories += ingredients[1][ingredients[1].length - 1] * j;

    for (let k = 100 - i - j; k > 0; k--) {
      const thirdScore = ingredients[2].slice(0, -1).map((x) => x * k);
      calories += ingredients[2][ingredients[2].length - 1] * k;

      for (let l = 100 - i - j - k; l > 0; l--) {
        const fourthScore = ingredients[3].slice(0, -1).map((x) => x * l);
        calories += ingredients[3][ingredients[3].length - 1] * l;

        const score = firstScore
          .map(
            (x, index) =>
              x + secondScore[index] + thirdScore[index] + fourthScore[index]
          )
          .reduce(
            (prev, curr) => (prev < 0 ? 0 : prev) * (curr < 0 ? 0 : curr)
          );

        if (calories === 500 && highScore < score) highScore = score;
      }
    }
  }
}

console.log(highScore);
