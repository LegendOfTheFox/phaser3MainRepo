import 'phaser';

export default class CharacterMenu {
  scene: Phaser.Scene;
  displayHeight: number;
  displayWidth: number;
  playerMenuText: any;
  playerMenuBackground!: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    displayWidth: number,
    displayHeight: number
  ) {
    this.scene = scene;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;

    this.playerMenuText = {};
  }

  preload() {
    this.scene.load.image(
      'battleMenuBackground',
      'assets/rpgBattleSystem/BattleMenu.png'
    );
  }

  create(players: any) {
    const menuWidth = this.getMenuWidth();
    const menuHeight = this.getMenuHeight();

    this.setMenuBackgroundImage('battleMenuBackground');

    const currentPlayers = players;
    const heightAdjustments = [-menuHeight / 2.5, 0, menuHeight / 3];

    for (let i = 0; i < currentPlayers.length; i++) {
      this.addCharacterToMenu(
        currentPlayers[i],
        menuWidth,
        menuHeight,
        this.displayWidth * 0.75,
        this.displayHeight * 0.8,
        heightAdjustments[i]
      );
    }
  }

  getMenuHeight() {
    return this.displayHeight / 4;
  }

  getMenuWidth() {
    return this.displayWidth / 2;
  }

  getPlayerMenuText() {
    return this.playerMenuText;
  }

  setMenuBackgroundImage(imageKey: string) {
    const menuHeight = this.displayHeight / 4;
    const menuWidth = this.displayWidth / 2;

    const playerMenu = this.scene.add
      .image(this.displayWidth * 0.75, this.displayHeight * 0.8, imageKey)
      .setDisplaySize(menuWidth, menuHeight);

    this.playerMenuBackground = playerMenu;
  }

  getMenuBackgroundImage() {
    return this.playerMenuBackground;
  }

  addCharacterToMenu(
    playerInformation: {
      name: any;
      currentHp: any;
      maxHp: any;
      currentMp: any;
      maxMp: any;
    },
    menuWidth: number,
    menuHeight: number,
    positionX: number,
    positionY: number,
    heightAdjustment: number
  ) {
    const xAdjust = 2.2;
    const hpAdjust = 80;
    const mpAdjust = 240;

    const name = this.scene.add.text(
      positionX - menuWidth / xAdjust,
      positionY + heightAdjustment,
      playerInformation.name
    );

    const hp = this.scene.add.text(
      positionX - menuWidth / xAdjust + hpAdjust,
      positionY + heightAdjustment,
      `HP: ${playerInformation.currentHp}/${playerInformation.maxHp}`
    );

    const mp = this.scene.add.text(
      positionX - menuWidth / xAdjust + mpAdjust,
      positionY + heightAdjustment,
      `MP: ${playerInformation.currentMp}/${playerInformation.maxMp}`
    );

    this.playerMenuText[playerInformation.name] = {
      name,
      hp,
      mp,
    };
  }

  update(playerInformation: any[]) {
    playerInformation.forEach((player) => {
      const playerText = this.playerMenuText[player.name];

      playerText.hp.setText(`HP: ${player.currentHp}/${player.maxHp}`);
      playerText.mp.setText(`MP: ${player.currentMp}/${player.maxMp}`);
    });
  }
}
