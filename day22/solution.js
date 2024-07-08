import { input } from "./input.js";

class Entity {
  hp = 0;
  def = 0;

  constructor(hp, def) {
    this.hp = hp;
    this.def = def ?? 0;
  }
}

class Player extends Entity {
  mana = 0;

  constructor(hp, def, mana) {
    super(hp, def);
    this.mana = mana;
  }
}

class Boss extends Entity {
  atk = 0;

  constructor(hp, atk) {
    super(hp);
    this.atk = atk;
  }
}

class MagicMissile {
  cost = 53;

  cast(boss) {
    boss.hp -= 4;
  }
}

class Drain {
  cost = 73;

  cast(boss, player) {
    boss.hp -= 2;
    player.hp += 2;
  }
}

class EffectSpell {
  cost = 0;
  remainingTurns = 0;

  constructor(cost, turns) {
    this.cost = cost;
    this.remainingTurns = turns;
  }

  countTurn() {
    this.remainingTurns--;
  }
}

class Shield extends EffectSpell {
  constructor() {
    super(113, 6);
  }

  cast(_, player) {
    if (super.remainingTurns === 6) player.def += 7;
    super.countTurn();
    if (super.remainingTurns === 0) player.def = 0;
  }
}

class Poison extends EffectSpell {
  constructor() {
    super(173, 6);
  }

  cast(boss) {
    boss.hp -= 3;
    super.countTurn();
  }
}

class Recharge extends EffectSpell {
  constructor() {
    super(229, 5);
  }

  cast(_, player) {
    player.mana += 101;
    super.countTurn();
  }
}

let leastMana = Infinity;

const castSpell = (spell, boss, player, effects, turn) => {
  if (player.mana - spell.cost <= 0) return;

  const newBoss = new Boss(boss.hp, boss.atk);
  const newPlayer = new Player(player.hp, player.def, player.mana - spell.cost);
  spell.cast(newBoss, newPlayer);
  battle(newPlayer, newBoss, effects, turn + 1);
};

const castEffect = (spell, boss, player, effects, turn) => {
  if (player.mana - spell.cost <= 0) return;

  if (!effects.some((x) => x.constructor.name === spell.constructor.name))
    effects = [...effects, spell];

  const newBoss = new Boss(boss.hp, boss.atk);
  const newPlayer = new Player(player.hp, player.def, player.mana - spell.cost);
  battle(newPlayer, newBoss, effects, turn + 1);
};

const bossTurn = (boss, player, effects, turn) => {
  battle(
    new Player(player.hp - boss.atk, player.def, player.mana),
    new Boss(boss.hp, boss.atk),
    effects,
    turn + 1
  );
};

const battle = (player, boss, effects = [], turn = 0) => {
  if (player.hp <= 0) return;

  const newEffects = effects.filter((x) => x.remainingTurns);
  newEffects.forEach((x) => x.cast(boss, player));

  if (boss.hp <= 0) {
    leastMana = Math.max(leastMana, player.mana);
    return;
  }

  if (turn % 2 !== 0) {
    bossTurn(boss, player, newEffects, turn);
    return;
  }

  castSpell(new MagicMissile(), boss, player, newEffects, turn);
  castSpell(new Drain(), boss, player, newEffects, turn);
  castEffect(new Shield(), boss, player, newEffects, turn);
  castEffect(new Poison(), boss, player, newEffects, turn);
  castEffect(new Recharge(), boss, player, newEffects, turn);
};

const boss = new Boss(
  ...[...input.matchAll(/\d+/g)].map((x) => parseInt(x[0]))
);
const player = new Player(50, 0, 500);

battle(player, boss);
console.log(leastMana);
