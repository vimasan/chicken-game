import { PHYSICS } from '../config/config';
import { gameState } from '../state/gameState';

export class Chicken {
  constructor (x, y, isPlayer = false) {
    this.x = x;
    this.y = y;
    this.isPlayer = isPlayer;
    this.size = 48;
    this.frame = 0;
    this.speed = 3;
    this.animationTimer = 0;
    this.directionTimer = 0;
    this.direction = 0;

    // Propiedades de movimiento suave
    this.velocity = { x: 0, y: 0 };
    this.acceleration = 0.5;
    this.friction = 0.85;

    if (!isPlayer) {
      this.initNPC();
    }
  }

  initNPC () {
    const angle = Math.random() * Math.PI * 2;
    this.dx = Math.cos(angle) * PHYSICS.MAX_SPEED;
    this.dy = Math.sin(angle) * PHYSICS.MAX_SPEED;
    this.speed = PHYSICS.MAX_SPEED;
  }

  update (input) {
    if (!this.isPlayer) {
      // Movimiento de los npc
      this.applyNPCPhysics();
    } else if (this.isPlayer) {
      this.handlePlayerInput(input);
      this.applyMovementConstraints();
    }
    this.updateAnimation();
  }

  applyNPCPhysics () {
    // Actualizar la posicion
    this.x += this.dx;
    this.y += this.dy;

    // Normalizar velocidad
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (speed > PHYSICS.MAX_SPEED) {
      this.dx = (this.dx / speed) * PHYSICS.MAX_SPEED;
      this.dy = (this.dy / speed) * PHYSICS.MAX_SPEED;
    }

    // Rebote en bordes
    const margin = this.size / 2;
    if (this.x < margin || this.x > gameState.canvas.width - margin) {
      this.dx *= -PHYSICS.BOUNCE_FACTOR;
      this.x = Math.max(margin, Math.min(this.x, gameState.canvas.width - margin));
    }
    if (this.y < margin || this.y > gameState.canvas.height - margin) {
      this.dy *= -PHYSICS.BOUNCE_FACTOR;
      this.y = Math.max(margin, Math.min(this.y, gameState.canvas.height - margin));
    }

    if (Math.random() < 0.09) {
      // 9% de probabilidad por frame
      this.dx += (Math.random() - 0.5) * PHYSICS.RANDOM_FORCE;
      this.dy += (Math.random() - 0.5) * PHYSICS.RANDOM_FORCE;
    }
  }

  // applyNPCPhysicsBasic () {
  //   // Aplicar movimiento básico
  //   this.x += this.dx;
  //   this.y += this.dy;

  //   // Rebote en bordes
  //   if (this.x < 24 || this.x > gameState.canvas.width - 24) {
  //     this.dx *= -1;
  //     this.x = Math.max(24, Math.min(this.x, gameState.canvas.width - 24));
  //   }
  //   if (this.y < 24 || this.y > gameState.canvas.height - 24) {
  //     this.dy *= -1;
  //     this.y = Math.max(24, Math.min(this.y, gameState.canvas.height - 24));
  //   }
  // }

  handlePlayerInput (input) {
    const move = input.movementVector;

    // Aceleración
    if (move.x !== 0) this.velocity.x += move.x * this.acceleration;
    if (move.y !== 0) this.velocity.y += move.y * this.acceleration;

    // Fricción
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    // Limitar velocidad máxima
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    if (speed > this.speed) {
      this.velocity.x = (this.velocity.x / speed) * this.speed;
      this.velocity.y = (this.velocity.y / speed) * this.speed;
    }

    // Actualizar posición
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Actualizar dirección
    if (speed > 0.1) {
      this.direction = Math.atan2(this.velocity.y, this.velocity.x);
    }
  }

  applyMovementConstraints () {
    // Limites de pantalla con margen del tamaño de la gallina
    const margin = this.size / 2;
    this.x = Math.max(margin, Math.min(this.x, gameState.canvas.width - margin));
    this.y = Math.max(margin, Math.min(this.y, gameState.canvas.height - margin));

    // Ajustar velocidad si está en el borde
    if (this.x <= margin || this.x >= gameState.canvas.width - margin) {
      this.velocity.x *= -0.5;
    }
    if (this.y <= margin || this.y >= gameState.canvas.height - margin) {
      this.velocity.y *= -0.5;
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
