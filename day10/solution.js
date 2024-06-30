const execute = (input, iterations) => {
  for (let i = 0; i < iterations; i++) {
    const sequence = [];

    for (let j = 0; j < input.length; j++) {
      if (sequence[sequence.length - 1]?.digit !== input.charAt(j)) {
        sequence.push({ digit: input.charAt(j), occurrences: 1 });
      } else {
        sequence[sequence.length - 1].occurrences++;
      }
    }

    input = sequence.map((x) => x.occurrences.toString() + x.digit).join("");
  }

  return input.length;
};

const input = "1321131112";

console.log(execute(input, 40));
console.log(execute(input, 50));
