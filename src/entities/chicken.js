import { PHYSICS } from '../config/config';

export class Chicken {
  constructor (x, y, isPlayer = false) {
    this.x = x;
    this.y = y;
    this.isPlayer = isPlayer;
    this.size = 48;
    this.frame = 0;
    this.speed = 3;
    this.animationTimer = 0;
    this.direction = 0;

    if (!isPlayer) {
      this.initNPC();
    }
  }

  initNPC () {
    const angle = Math.random() * Math.PI * 2;
    this.dx = Math.cos(angle) * PHYSICS.MAX_SPEED;
    this.dy = Math.sin(angle) * PHYSICS.MAX_SPEED;
  }

  update (physics) {
    if (!this.isPlayer) {
      // Movimiento de los npc
      this.applyPhysics(physics);
    }
  }

  applyPhysics (physics) {
    // Todo!: Implementar correctamente la fisica de movimiento
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= physics.FRICTION;
    this.dy *= physics.FRICTION;
  }

  updateAnimation () {
    this.animationTimer++;
    if (this.animationTimer % 10 === 0) {
      this.frame = (this.frame + 1) % 2;
    }
  }
}
