import 'phaser';

export default class Character {
  scene: Phaser.Scene;
  characterSprite!: Phaser.GameObjects.Sprite;
  position: any;
  type: any;
  constructor(scene: Phaser.Scene, config: { position: any; type: any }) {
    this.scene = scene;
    this.position = config.position;
    this.type = config.type;
  }

  preload() {
    this.scene.load.atlas(
      'knight',
      'assets/rpgBattleSystem/knight.png',
      'assets/rpgBattleSystem/knight.json'
    );
  }

  createAnimations() {
    //  Our animations
    this.scene.anims.create({
      key: 'guardStart',
      frames: this.scene.anims.generateFrameNames('knight', {
        prefix: 'guard_start/frame',
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 8,
    });

    this.scene.anims.create({
      key: 'guard',
      frames: this.scene.anims.generateFrameNames('knight', {
        prefix: 'guard/frame',
        start: 0,
        end: 5,
        zeroPad: 4,
      }),
      frameRate: 8,
      repeat: 2,
    });

    this.scene.anims.create({
      key: 'guardEnd',
      frames: this.scene.anims.generateFrameNames('knight', {
        prefix: 'guard_end/frame',
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 8,
    });

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('knight', {
        prefix: 'idle/frame',
        start: 0,
        end: 5,
        zeroPad: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  createSprite() {
    const sprite = this.scene.add.sprite(
      this.position.x,
      this.position.y,
      this.position.type
    );
    sprite.setOrigin(0.5, 1);
    sprite.setScale(3);
    return sprite;
  }

  setCharacterSprite(sprite: Phaser.GameObjects.Sprite) {
    this.characterSprite = sprite;
  }

  getCharacterSprite() {
    return this.characterSprite;
  }

  create() {
    this.createAnimations();

    let characterSprite = this.createSprite();
    this.setCharacterSprite(characterSprite);

    characterSprite.play('idle');

    characterSprite.on(
      Phaser.Animations.Events.ANIMATION_START,
      function (anim: { key: string }) {
        // can put a function here
      }
    );

    this.scene.input.on(
      'pointerdown',
      function () {
        if (characterSprite.anims.getName() === 'idle') {
          characterSprite.playAfterRepeat('guardStart');
          characterSprite.chain(['guard', 'guardEnd', 'idle']);
        }
      },
      this
    );
  }
}
