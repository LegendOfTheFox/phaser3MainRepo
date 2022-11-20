import 'phaser';

export default class SelectionMenu {
  scene: Phaser.Scene;
  cursors: any;
  displayHeight: number;
  displayWidth: number;
  menuBackground!: Phaser.GameObjects.Image;
  menuText: any;
  private buttons: Phaser.GameObjects.Text[] = [];
  //buttonSelector: Phaser.GameObjects.Image;
  private buttonSelector!: Phaser.GameObjects.Image;
  private selectedButtonIndex = 0;
  constructor(
    scene: Phaser.Scene,
    displayWidth: number,
    displayHeight: number
  ) {
    this.scene = scene;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;

    this.menuText = {};
  }

  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preload() {
    this.scene.load.image(
      'battleMenuBackground',
      'assets/rpgBattleSystem/BattleMenu.png'
    );

    this.scene.load.image('cursor-hand', 'assets/cursor_hand.png');
  }

  create() {
    const leftSideOffset = this.getMenuWidth() / 5;
    const menuHeight = this.getMenuHeight();

    this.setMenuBackgroundImage('battleMenuBackground');

    this.addMenuText(
      'Attack',
      leftSideOffset,
      menuHeight,
      leftSideOffset,
      this.menuBackground.getTopLeft().y + menuHeight / 4
    );

    this.addMenuText(
      'Defend',
      leftSideOffset,
      menuHeight,
      leftSideOffset,
      this.menuBackground.getTopLeft().y + menuHeight / 2
    );

    this.buttonSelector = this.scene.add.image(0, 0, 'cursor-hand');
    this.selectButton(0);
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex];

    // set the current selected button to a white tint
    currentButton.setTint(0xffffff);

    const button = this.buttons[index];

    // set the newly selected button to a green tint
    button.setTint(0x66ff7f);

    // move the hand cursor to the right edge
    this.buttonSelector.x = button.x + button.displayWidth * 0.5;
    this.buttonSelector.y = button.y + 10;

    // store the new selected index
    this.selectedButtonIndex = index;
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change;

    // wrap the index to the front or end of array
    if (index >= this.buttons.length) {
      index = 0;
    } else if (index < 0) {
      index = this.buttons.length - 1;
    }

    this.selectButton(index);
  }

  confirmSelection() {
    // get the currently selected button
    const button = this.buttons[this.selectedButtonIndex];

    // emit the 'selected' event
    button.emit('selected');
  }

  getMenuHeight() {
    return this.displayHeight / 4;
  }

  getMenuWidth() {
    return this.displayWidth / 4;
  }

  getMenuText() {
    return this.menuText;
  }

  setMenuBackgroundImage(image: string) {
    const menuHeight = this.displayHeight / 4;
    const menuWidth = this.displayWidth / 2;

    const playerMenu = this.scene.add
      .image(this.displayWidth * 0.25, this.displayHeight * 0.8, image)
      .setDisplaySize(menuWidth, menuHeight);

    this.menuBackground = playerMenu;
  }

  addMenuText(
    text: string,
    menuWidth: number,
    menuHeight: number,
    x: number,
    y: number
  ) {
    const options = {
      font: '20px monospace',
      fill: '#ffffff',
    };
    const newText = this.scene.add.text(x, y, text, options);
    newText.setOrigin(0.5, 0.5);
    newText.setInteractive();

    this.buttons.push(newText);
  }

  update() {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!);
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
      this.cursors.space!
    );
    if (upJustPressed) {
      this.selectNextButton(-1);
    } else if (downJustPressed) {
      this.selectNextButton(1);
    } else if (spaceJustPressed) {
      this.confirmSelection();
    }
  }
}
