// js/state/gameState.js
import { Chicken } from '../entities/chicken.js';
import { Egg } from '../entities/Egg.js';
import { PHYSICS } from '../config/config.js';

export const gameState = {
  // Propiedades del estado
  canvas: null,
  chickens: [],
  eggs: [],
  eggCounter: 0,

  // Métodos de inicialización
  init (canvasElement) {
    this.canvas = canvasElement;
    this.reset();
  },

  reset () {
    this.chickens = [];
    this.eggs = [];
    this.eggCounter = 0;
    this.createMainChicken();
  },

  createMainChicken () {
    const mainChicken = new Chicken(this.canvas.width / 2, this.canvas.height / 2, true);
    this.chickens.push(mainChicken);
  },

  // Gestión de entidades
  addEgg (x, y) {
    const newEgg = new Egg(x, y);
    this.eggs.push(newEgg);
    this.eggCounter++;
  },

  addChicken (x, y, isPlayer = false) {
    const isValid = this.isValidPosition(x, y);
    if (isValid) {
      const newChicken = new Chicken(x, y, isPlayer);
      console.log(this.chickens);
      this.chickens.push(newChicken);
      return true;
    }
    console.log('No se pudo agregar la gallina');
    return false;
  },

  // Lógica de validación
  isValidPosition (x, y) {
    return this.chickens.every((chicken) => {
      const dx = chicken.x - x;
      const dy = chicken.y - y;
      return Math.sqrt(dx * dx + dy * dy) > PHYSICS.COLLISION_RADIUS * 2;
    });
  },

  // Actualizaciones del juego
  checkCollisions () {
    this.chickens.forEach((chicken, index) => {
      // Colisiones con bordes
      chicken.x = Math.max(24, Math.min(chicken.x, this.canvas.width - 24));
      chicken.y = Math.max(24, Math.min(chicken.y, this.canvas.height - 24));

      // Colisiones entre gallinas
      this.chickens.forEach((other, otherIndex) => {
        if (index !== otherIndex) {
          const dx = other.x - chicken.x;
          const dy = other.y - chicken.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < PHYSICS.COLLISION_RADIUS) {
            this.handleCollision(chicken, other, dx, dy, distance);
          }
        }
      });
    });
  },

  handleCollision (a, b, dx, dy, distance) {
    const angle = Math.atan2(dy, dx);
    const force = (PHYSICS.COLLISION_RADIUS - distance) / PHYSICS.COLLISION_RADIUS;

    if (!a.isPlayer) {
      a.dx -= Math.cos(angle) * force * PHYSICS.REPEL_FORCE;
      a.dy -= Math.sin(angle) * force * PHYSICS.REPEL_FORCE;
    }

    if (!b.isPlayer) {
      b.dx += Math.cos(angle) * force * PHYSICS.REPEL_FORCE;
      b.dy += Math.sin(angle) * force * PHYSICS.REPEL_FORCE;
    }
  },

  updateEggs () {
    const now = Date.now();
    this.eggs = this.eggs.filter((egg) => {
      if (now > egg.hatchTime && !egg.hatched) {
        this.hatchEgg(egg);
        return false;
      }
      return true;
    });
  },

  hatchEgg (egg) {
    if (
      Math.random() < 0.3 &&
      this.chickens.some((chicken) => {
        const dx = chicken.x - egg.x;
        const dy = chicken.y - egg.y;
        return Math.sqrt(dx * dx + dy * dy) < PHYSICS.EGG_SPAWN_RADIUS;
      })
    ) {
      this.addChicken(egg.x, egg.y);
    }
  }
};
