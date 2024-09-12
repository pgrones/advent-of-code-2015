const input = 33100000;

console.time();

let houseNumber = 1;

while (true) {
  const divisors = new Set();

  for (let i = 1; i <= Math.sqrt(houseNumber); i++) {
    if (houseNumber % i == 0) {
      divisors.add(i);
      divisors.add(houseNumber / i);
    }
  }

  if ([...divisors].reduce((a, b) => a + b, 0) * 10 >= input) break;

  houseNumber++;
}

console.log(houseNumber);
console.timeLog();

// -----PART 2---------------------------------------

const elvesByHouses = new Map();
houseNumber = 1;

while (true) {
  const divisors = new Set();

  for (let i = 1; i <= Math.sqrt(houseNumber); i++) {
    if (houseNumber % i == 0) {
      const pairedDivisor = houseNumber / i;

      if (!divisors.has(i)) {
        const houses = (elvesByHouses.get(i) ?? 0) + 1;
        elvesByHouses.set(i, houses);

        if (houses <= 50) divisors.add(i);
      }

      if (pairedDivisor !== i && !divisors.has(pairedDivisor)) {
        const houses = (elvesByHouses.get(pairedDivisor) ?? 0) + 1;
        elvesByHouses.set(pairedDivisor, houses);

        if (houses <= 50) divisors.add(pairedDivisor);
      }
    }
  }

  if ([...divisors].reduce((a, b) => a + b, 0) * 11 >= input) break;

  houseNumber++;
}

console.log(houseNumber);

console.timeEnd();
