import { PHYSICS } from '../config/config';
import { gameState } from '../state/gameState';
import { loadAssets } from '../utils/assetsLoader';
import { InputHandler } from './inputHandler';
import { Renderer } from './renderer';

export const update = (physics) => {
  gameState.chickens.forEach((chicken) => {
    return chicken.update(physics);
  });
  gameState.checkCollisions();
  gameState.updateEggs();
};

export const initGame = async () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const assets = await loadAssets();
  const inputHandler = new InputHandler();
  const renderer = new Renderer(ctx, ctx, assets);

  gameState.init(canvas);
  // gameState.addChicken(canvas.width / 2, canvas.height / 2, true);

  const gameLoop = () => {
    update(PHYSICS);
    renderer.draw(gameState);
    window.requestAnimationFrame(gameLoop);
  };

  gameLoop();
};
