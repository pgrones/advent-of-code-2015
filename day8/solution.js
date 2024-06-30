import { input } from "./input.js";

const strings = input.split("\n");

let codeLength = 0;
let memoryLength = 0;
let encodedLength = 0;

for (const string of strings) {
  codeLength += string.length;

  const slashes = [...string.matchAll(/\\\\/g)].length;
  const quotes = [...string.matchAll(/(?<![^\\]\\)\\"/g)].length;
  const hexChars = [...string.matchAll(/\\x[\dabcdef]{2}/g)].length;

  memoryLength += string.length - 2 - slashes - quotes - hexChars * 3;
  encodedLength += string.length + 4 + slashes * 2 + quotes * 2 + hexChars;
}

console.log(codeLength - memoryLength);
console.log(encodedLength - codeLength);
