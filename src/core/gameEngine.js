import { PHYSICS } from '../config/config';
import { gameState } from '../state/gameState';
import { loadAssets } from '../utils/assetsLoader';
import { InputHandler } from './inputHandler';
import { Renderer } from './renderer';

export const update = (inputHandler) => {
  // Actualizar jugador
  const mainChicken = gameState.chickens.find((c) => c.isPlayer);
  if (mainChicken) {
    mainChicken.update(inputHandler);

    // Manejar puesta de huevos
    if (inputHandler.isSpacePressed) {
      gameState.addEgg(mainChicken.x, mainChicken.y);
    }
  }
  // Actualizar NPCs y otras entidades
  gameState.checkCollisions();
  gameState.updateEggs();
  gameState.chickens
    .filter(c => !c.isPlayer)
    .forEach(chicken => chicken.update());
};

export const initGame = async () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const assets = await loadAssets();
  const inputHandler = new InputHandler();
  const renderer = new Renderer(canvas, ctx, assets);

  gameState.init(canvas);

  const gameLoop = () => {
    update(inputHandler);
    renderer.draw(gameState);
    globalThis.requestAnimationFrame(gameLoop);
  };

  gameLoop();
};
