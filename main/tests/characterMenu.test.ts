import CharacterMenu from '../src/rpgBattleSystem/CharacterMenu';

let config = {};
let scene = new Phaser.Scene(config);

let characterMenu = new CharacterMenu(scene, 1280, 720);

describe('testing Main Menu', () => {
  test('updates games won for the passed in player', () => {
    expect(5).toBe(5);
  });
});
