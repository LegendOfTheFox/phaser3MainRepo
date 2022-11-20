import SelectionMenu from '../src/rpgBattleSystem/SelectionMenu';
import 'jest-canvas-mock';

let config = {};
let scene = new Phaser.Scene(config);

let selectionMenu = new SelectionMenu(scene, 1280, 720);

describe('Selection Menu', () => {
  test('returns the action selected after a player input', () => {
    let playerSelection = selectionMenu.update();

    expect(4).toBe(5);
  });

  test('returns the action selected after a player input', () => {
    expect(4).toBe(5);
  });
});
