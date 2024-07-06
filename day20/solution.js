const input = 33_100_000;

// This solution is dumb
// we probably need some kind of reverse lcm
for (let i = 700_000; ; i++) {
  let presents = 10;
  const isUneven = i % 2 !== 0;

  for (let j = i; j > 1; j -= isUneven ? 2 : 1) {
    if (i % j === 0) presents += j * 10;
  }

  if (presents >= input) {
    console.log(i);
    break;
  }
}
