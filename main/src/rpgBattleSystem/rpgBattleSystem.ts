import 'phaser';
import Character from './Character';

export default class RpgBattleSystem extends Phaser.Scene {
  character: Character[];
  constructor() {
    super('rpgBattleSystem');

    this.character = [];
  }

  init() {}

  preload() {
    this.load.image('battleBackground', 'assets/testBattleBackground01.png');

    let config = {
      position: { x: 200, y: 236 },
      type: 'knight',
    };

    let config2 = {
      position: { x: 200, y: 436 },
      type: 'knight',
    };

    this.character.push(new Character(this, config));
    this.character.push(new Character(this, config2));

    this.character[0].preload();
    this.character[1].preload();
  }

  create() {
    this.add.image(0, 0, 'battleBackground').setOrigin(0);

    this.character[0].create();
    this.character[1].create();
  }

  update() {}
}
