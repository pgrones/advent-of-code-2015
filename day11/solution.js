const nextChar = (c) => {
  return c === "z" ? "a" : String.fromCharCode(c.charCodeAt(0) + 1);
};

const incrementAt = (input, index) =>
  input.substring(0, index) +
  nextChar(input.charAt(index)) +
  input.substring(index + 1);

const hasIncreasingStraight = (password) => {
  if (password.length < 3) return false;

  for (let i = 0; i < password.length - 2; i++) {
    const first = password.charCodeAt(i);
    const second = password.charCodeAt(i + 1);
    const third = password.charCodeAt(i + 2);

    if (second === first + 1 && third === second + 1) return true;
  }

  return false;
};

const hasConfusingLetters = (password) =>
  ["i", "l", "o"].some((x) => password.includes(x));

const hasLetterPairs = (password) => {
  if (password.length < 4) return false;

  const pairs = new Set();

  for (let i = 0; i < password.length - 1; i++) {
    const pair = password.substring(i, i + 2);

    if (pair.charAt(0) === pair.charAt(1)) {
      pairs.add(pair);
      i++;
    }

    if (pairs.size >= 2) return true;
  }

  return false;
};

const generateNewPassword = (input) => {
  do {
    input = incrementAt(input, input.length - 1);

    let index = input.length - 1;
    while (input.charAt(index) === "a") {
      input = incrementAt(input, index - 1);
      index--;
    }
  } while (
    hasConfusingLetters(input) ||
    !hasIncreasingStraight(input) ||
    !hasLetterPairs(input)
  );

  return input;
};

const input = "vzbxkghb";

const nextPassword = generateNewPassword(input);

console.log(nextPassword);
console.log(generateNewPassword(nextPassword));
