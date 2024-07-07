import { input } from "./input.js";

class Computer {
  a = 0;
  b = 0;
  pointer = 0;

  reset() {
    this.a = 0;
    this.b = 0;
    this.pointer = 0;
  }

  next() {
    this.pointer++;
  }

  hlf(r) {
    this[r] /= 2;
    this.next();
  }

  tpl(r) {
    this[r] *= 3;
    this.next();
  }

  inc(r) {
    this[r]++;
    this.next();
  }

  jmp(offset) {
    this.pointer += parseInt(offset);
  }

  jie(r, offset) {
    if (this[r] % 2 === 0) this.jmp(offset);
    else this.next();
  }

  jio(r, offset) {
    if (this[r] === 1) this.jmp(offset);
    else this.next();
  }

  run(program) {
    while (true) {
      if (this.pointer < 0 || this.pointer >= program.length) return this.b;

      const instruction = program[this.pointer];
      const command = instruction.substring(0, 3);
      const args = instruction.substring(4).split(", ");

      this[command](...args);
    }
  }
}

const program = input.split("\n");
const computer = new Computer();

console.log(computer.run(program));

computer.reset();
computer.a = 1;

console.log(computer.run(program));
