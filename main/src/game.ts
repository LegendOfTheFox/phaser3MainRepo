import 'phaser';
import MainMenu from './mainMenu';
import TicTacToe from './ticTacToe/ticTacToe';
import RpgBattleSystem from './rpgBattleSystem/rpgBattleSystem';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 1280,
  height: 720,
  scene: [RpgBattleSystem, MainMenu, TicTacToe],
};

const game = new Phaser.Game(config);
