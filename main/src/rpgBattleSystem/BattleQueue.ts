import Character from './Character';

export default class BattleQueue {
  queue: Character[];
  constructor() {
    this.queue = [];
  }

  addCharacter(character: Character) {
    this.queue.push(character);
  }

  removeCharacter(character: Character) {
    this.queue = this.queue.filter((item) => item !== character);
  }

  getCharacter() {
    return this.queue[0];
  }

  getQueue() {
    return this.queue;
  }

  nextCharacter() {
    const character = this.queue.shift();

    if (character) {
      this.queue.push(character);
    }
  }

  getQueueSize() {
    return this.queue.length;
  }
}
