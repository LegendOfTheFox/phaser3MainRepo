import 'phaser';
import Character from './Character';

import characterList from './characterList.js';
import CharacterMenu from './CharacterMenu';
import SelectionMenu from './SelectionMenu';
import BattleQueue from './BattleQueue';

export default class RpgBattleSystem extends Phaser.Scene {
  character: Character[];
  displayWidth: number;
  displayHeight: number;

  playersList: {
    name: string;
    currentHp: number;
    maxHp: number;
    currentMp: number;
    maxMp: number;
    config: { position: { x: number; y: number }; type: string };
  }[];
  battleQueue: BattleQueue;
  characterMenu: CharacterMenu;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  selectionMenu: SelectionMenu;

  constructor() {
    super('rpgBattleSystem');

    this.character = [];
    this.battleQueue = new BattleQueue();

    this.displayWidth = 1280;
    this.displayHeight = 720;

    this.characterMenu = new CharacterMenu(
      this,
      this.displayWidth,
      this.displayHeight
    );

    this.selectionMenu = new SelectionMenu(
      this,
      this.displayWidth,
      this.displayHeight
    );

    this.playersList = [
      {
        name: 'Bob',
        currentHp: 100,
        maxHp: 120,
        currentMp: 50,
        maxMp: 60,
        config: {
          position: { x: 200, y: 236 },
          type: 'knight',
        },
      },
      {
        name: 'Joe',
        currentHp: 100,
        maxHp: 120,
        currentMp: 50,
        maxMp: 60,
        config: {
          position: { x: 200, y: 436 },
          type: 'knight',
        },
      },
      {
        name: 'Sally',
        currentHp: 100,
        maxHp: 120,
        currentMp: 50,
        maxMp: 60,
        config: {
          position: { x: 200, y: 636 },
          type: 'knight',
        },
      },
    ];
  }

  init() {
    //this.cursors = this.input.keyboard.createCursorKeys();
    this.selectionMenu.init();
  }

  preload() {
    this.load.image('battleBackground', 'assets/testBattleBackground01.png');

    if (this.characterMenu) {
      this.characterMenu.preload();
    }

    this.selectionMenu.preload();

    this.createCharacters();
  }

  createCharacters() {
    this.playersList.forEach((player) => {
      const newCharacter = new Character(this, player.config);
      newCharacter.preload();
      this.character.push(newCharacter);
    });
  }

  addCharactersToScene() {
    this.character.forEach((character) => {
      character.create();
      this.battleQueue.addCharacter(character);
    });
  }

  create() {
    this.add
      .image(0, 0, 'battleBackground')
      .setOrigin(0)
      .setDisplaySize(this.displayWidth, this.displayHeight);

    this.addCharactersToScene();

    const playersList = this.playersList;

    this.characterMenu.create(playersList);
    this.selectionMenu.create();
  }

  async update(time: any, delta: number) {
    this.characterMenu.update(this.playersList);

    this.selectionMenu.update();
  }
}
