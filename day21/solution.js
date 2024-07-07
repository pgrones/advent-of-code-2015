import { input } from "./input.js";

class Entity {
  hp = 0;
  atk = 0;
  def = 0;

  constructor(hp, atk, def) {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }

  takeDmg(entity) {
    this.hp -= Math.max(entity.atk - this.def, 1);
  }

  equip(weapon, armor, rings) {
    const ringStats = rings.reduce(
      (prev, curr) => ({ atk: prev.atk + curr.atk, def: prev.def + curr.def }),
      { atk: 0, def: 0 }
    );

    this.atk += weapon.atk + ringStats.atk;
    this.def += armor.def + ringStats.def;
  }
}

class Item {
  cost = 0;
  atk = 0;
  def = 0;

  constructor(cost, atk, def) {
    this.cost = cost;
    this.atk = atk;
    this.def = def;
  }
}

class Shop {
  weapons = [];
  armor = [new Item(0, 0, 0)];
  rings = [new Item(0, 0, 0), new Item(0, 0, 0)];

  constructor(input) {
    const items = input.split("\n");
    const weapons = items.slice(1, items.indexOf(""));
    const armor = items.slice(weapons.length + 3, items.lastIndexOf(""));
    const rings = items.slice(items.lastIndexOf("") + 2);

    this.#addItems(weapons, this.weapons);
    this.#addItems(armor, this.armor);
    this.#addItems(rings, this.rings);
  }

  #addItems(items, type) {
    for (const item of items) {
      type.push(this.#createItem(item));
    }
  }

  #createItem(description) {
    return new Item(
      ...[...description.matchAll(/(?<!\+)\d+/g)].map((x) => parseInt(x[0]))
    );
  }
}

const shop = new Shop(input);
let lowestCost = Infinity;
let highestCost = -Infinity;

for (const weapon of shop.weapons) {
  for (const armor of shop.armor) {
    for (let i = 0; i < shop.rings.length - 1; i++) {
      for (let j = i + 1; j < shop.rings.length; j++) {
        const cost =
          weapon.cost + armor.cost + shop.rings[i].cost + shop.rings[j].cost;

        const player = new Entity(100, 0, 0);
        const boss = new Entity(100, 8, 2);

        player.equip(weapon, armor, [shop.rings[i], shop.rings[j]]);

        for (let step = 0; boss.hp > 0 && player.hp > 0; step++) {
          if (step % 2 === 0) boss.takeDmg(player);
          else player.takeDmg(boss);

          if (boss.hp <= 0) lowestCost = Math.min(lowestCost, cost);
          if (player.hp <= 0) highestCost = Math.max(highestCost, cost);
        }
      }
    }
  }
}

console.log(lowestCost);
console.log(highestCost);
