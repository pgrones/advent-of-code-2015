import { input } from "./input.js";

class Reindeer {
  distance = 0;
  flying = true;
  score = 0;

  constructor(name, speed, flightDuration, restDuration) {
    this.name = name;
    this.speed = speed;
    this.flightDuration = flightDuration;
    this.duration = flightDuration;
    this.restDuration = restDuration;
  }

  computeSecond() {
    if (this.duration === 0) {
      this.flying = !this.flying;
      this.duration = this.flying ? this.flightDuration : this.restDuration;
    }

    if (this.flying) {
      this.distance += this.speed;
    }

    this.duration--;
  }
}

const rawReindeers = input.split("\n");
const reindeers = [];

for (const reindeer of rawReindeers) {
  const name = reindeer.substring(0, reindeer.indexOf(" "));
  const [speed, flightDuration, restDuration] = [...reindeer.matchAll(/\d+/g)]
    .flat()
    .map((x) => parseInt(x));

  reindeers.push(new Reindeer(name, speed, flightDuration, restDuration));
}

for (let second = 0; second < 2503; second++) {
  for (const reindeer of reindeers) {
    reindeer.computeSecond();
  }

  const lead = Math.max(...reindeers.map((x) => x.distance));
  const leadingReindeers = reindeers.filter((x) => x.distance === lead);
  leadingReindeers.forEach((x) => x.score++);
}

console.log(Math.max(...reindeers.map((x) => x.distance)));
console.log(Math.max(...reindeers.map((x) => x.score)));
