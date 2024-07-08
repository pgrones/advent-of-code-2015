import { input } from "./input.js";

class Entity {
  hp = 0;

  constructor(hp) {
    this.hp = hp;
  }
}

class Player extends Entity {
  mana = 0;
  def = 0;

  constructor(hp, def, mana) {
    super(hp);
    this.def = def;
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
    // console.log(`Player casts ${this.constructor.name}, dealing 4 damage.`);
  }
}

class Drain {
  cost = 73;

  cast(boss, player) {
    boss.hp -= 2;
    player.hp += 2;
    // console.log(
    //   `Player casts ${this.constructor.name}, dealing 2 damage, and healing 2 hit points.`
    // );
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
    if (this.remainingTurns === 6) {
      player.def += 7;
      // console.log(`Shield provides 7 armor`);
    }
    this.countTurn();
    if (this.remainingTurns === 0) player.def -= 7;
    // console.log(`Shield's timer is now ${this.remainingTurns}.`);
  }
}

class Poison extends EffectSpell {
  constructor() {
    super(173, 6);
  }

  cast(boss) {
    boss.hp -= 3;
    this.countTurn();
    // console.log(
    //   `Poison deals 3 damage; its timer is now ${this.remainingTurns}.`
    // );
  }
}

class Recharge extends EffectSpell {
  constructor() {
    super(229, 5);
  }

  cast(_, player) {
    player.mana += 101;
    this.countTurn();
    // console.log(
    //   `Recharge provides 101 mana; its timer is now ${this.remainingTurns}.`
    // );
  }
}

let leastMana = Infinity;

const castSpell = (spell, boss, player, effects, turn, totalCost, hardMode) => {
  if (player.mana - spell.cost <= 0) return;

  const newBoss = new Boss(boss.hp, boss.atk);
  const newPlayer = new Player(player.hp, player.def, player.mana - spell.cost);
  const newEffects = effects.map((x) => {
    const effect = new x.constructor();
    effect.remainingTurns = x.remainingTurns;
    return effect;
  });

  spell.cast(newBoss, newPlayer);

  battle(
    newPlayer,
    newBoss,
    newEffects,
    turn + 1,
    totalCost + spell.cost,
    hardMode
  );
};

const castEffect = (
  spell,
  boss,
  player,
  effects,
  turn,
  totalCost,
  hardMode
) => {
  if (player.mana - spell.cost <= 0) return;

  if (effects.some((x) => x.constructor.name === spell.constructor.name))
    return;

  // console.log(`Player casts ${spell.constructor.name}.`);

  const newBoss = new Boss(boss.hp, boss.atk);
  const newPlayer = new Player(player.hp, player.def, player.mana - spell.cost);
  const newEffects = effects.map((x) => {
    const effect = new x.constructor();
    effect.remainingTurns = x.remainingTurns;
    return effect;
  });

  battle(
    newPlayer,
    newBoss,
    [...newEffects, spell],
    turn + 1,
    totalCost + spell.cost,
    hardMode
  );
};

const bossTurn = (boss, player, effects, turn, totalCost, hardMode) => {
  // console.log(`Boss attacks for ${Math.max(boss.atk - player.def, 1)} damage.`);

  battle(
    new Player(
      player.hp - Math.max(boss.atk - player.def, 1),
      player.def,
      player.mana
    ),
    new Boss(boss.hp, boss.atk),
    effects.map((x) => {
      const effect = new x.constructor();
      effect.remainingTurns = x.remainingTurns;
      return effect;
    }),
    turn + 1,
    totalCost,
    hardMode
  );
};

const battle = (
  prevPlayer,
  boss,
  effects = [],
  turn = 0,
  totalCost = 0,
  hardMode = false
) => {
  // console.log(`\n-- ${turn % 2 !== 0 ? "Boss" : "Player"} turn ${turn} --`);
  // console.log(
  //   `- Player has ${player.hp} hit points, ${player.def} armor, ${player.mana} mana`
  // );
  // console.log(`- Boss has ${boss.hp} hit points`);
  const player = new Player(prevPlayer.hp, prevPlayer.def, prevPlayer.mana);
  if (hardMode && turn % 2 === 0) {
    player.hp--;
  }

  if (player.hp <= 0) return;

  const remainingEffects = effects.filter((x) => x.remainingTurns);
  remainingEffects.forEach((x) => x.cast(boss, player));

  if (boss.hp <= 0) {
    leastMana = Math.min(leastMana, totalCost);
    return;
  }

  if (turn % 2 !== 0) {
    bossTurn(boss, player, remainingEffects, turn, totalCost, hardMode);
    return;
  }

  castSpell(
    new MagicMissile(),
    boss,
    player,
    remainingEffects,
    turn,
    totalCost,
    hardMode
  );
  castSpell(
    new Drain(),
    boss,
    player,
    remainingEffects,
    turn,
    totalCost,
    hardMode
  );
  castEffect(
    new Shield(),
    boss,
    player,
    remainingEffects,
    turn,
    totalCost,
    hardMode
  );
  castEffect(
    new Poison(),
    boss,
    player,
    remainingEffects,
    turn,
    totalCost,
    hardMode
  );
  castEffect(
    new Recharge(),
    boss,
    player,
    remainingEffects,
    turn,
    totalCost,
    hardMode
  );
};

let boss = new Boss(...[...input.matchAll(/\d+/g)].map((x) => parseInt(x[0])));
let player = new Player(50, 0, 500);

battle(player, boss);
console.log(leastMana);

boss = new Boss(...[...input.matchAll(/\d+/g)].map((x) => parseInt(x[0])));
player = new Player(50, 0, 500);
leastMana = Infinity;

battle(player, boss, [], 0, 0, true);
console.log(leastMana);
