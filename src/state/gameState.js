// js/state/gameState.js
import { Chicken } from '../entities/chicken.js';
import { Egg } from '../entities/Egg.js';
import { PHYSICS, AUDIO, CHICKEN_CONFIG } from '../config/config.js';

export const gameState = {
  // Propiedades del estado
  canvas: null,
  chickens: [],
  eggs: [],
  hatchedEggs: [], // Huevos nacidos
  expiredEggs: [], // Huevos caducados
  eggCounter: 0,
  chickenCounter: 0,
  assets: null,

  // Métodos de inicialización
  init (canvasElement, assets, counterElementId) {
    this.counterElement = counterElementId;
    this.canvas = canvasElement;
    this.assets = assets;
    this.reset();
  },

  reset () {
    this.chickens = [];
    this.eggs = [];
    this.eggCounter = 0;
    this.chickenCounter = 0;
    this.createMainChicken();
    this.updateCounter();
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
    this.playSound('eggLay');
    this.updateCounter();
  },

  addChicken (x, y, isPlayer = false) {
    const isValid = this.isValidPosition(x, y);
    if (isValid) {
      const newChicken = new Chicken(x, y, isPlayer);
      // Fuerza inicial aleatoria
      newChicken.dx = (Math.random() - 0.5) * PHYSICS.MAX_SPEED * 2;
      newChicken.dy = (Math.random() - 0.5) * PHYSICS.MAX_SPEED * 2;
      this.chickens.push(newChicken);
      return true;
    }
    return false;
  },

  updateCounter () {
    if (this.counterElement) {
      this.counterElement.textContent = `Huevos: ${this.eggCounter} | Gallinas: ${this.chickenCounter}`;
    }
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

  // updateEggs () {
  //   const now = Date.now();
  //   this.eggs = this.eggs.filter((egg) => {
  //     if (now > egg.hatchTime && !egg.hatched) {
  //       this.hatchEgg(egg);
  //       this.hatchedEggs.push(egg);
  //       this.eggCounter--;
  //       this.updateCounter();
  //       console.log('egg hatched');
  //       return false;
  //     }
  //     if (egg.hatched) {
  //       this.expiredEggs.push(egg);
  //       this.eggCounter--;
  //       this.updateCounter();
  //       console.log('egg expected');
  //       return false;
  //     }
  //     return true;
  //   });
  // },

  updateEggs () {
    const now = Date.now();
    this.eggs = this.eggs.filter((egg) => {
      if (now > egg.hatchTime && !egg.hatched) {
        if (this.chickens.length < CHICKEN_CONFIG.MAX) {
          this.hatchEgg(egg);
        }
        if (egg.hatched) {
          this.hatchedEggs.push(egg);
        } else {
          this.expiredEggs.push(egg);
        }
        this.eggCounter--;
        this.updateCounter();
        return false;
      }
      return true;
    });
  },

  hatchEgg (egg) {
    if (Math.random() < 0.3) {
      egg.hatched = true;
      this.addChicken(egg.x, egg.y);
      this.playSound('eggHatch');
      this.chickenCounter++;
      this.updateCounter();
    }
  },

  playSound (soundType) {
    if (!this.assets?.sound?.[soundType]) return;
    const sound = this.assets.sound[soundType].cloneNode();
    sound.volume = AUDIO.VOLUME;
    sound.play().catch((error) => {
      console.log('Audio requiere interaccion del usuairo:', error);
    });
  }
};
