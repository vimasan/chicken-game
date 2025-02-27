import { PHYSICS } from '../config/config';

export class Renderer {
  constructor (canvas, ctx, assets) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.assets = assets;
    this.background = '#87CEEB';
  }

  drawChicken (chickens) {
    chickens.forEach(chicken => {
      // this.ctx.save();
      // this.ctx.translate(chicken.x, chicken.y);
      // this.ctx.rotate(chicken.direction);

      this.ctx.drawImage(
        this.assets.chicken,
        // Recorte del sprite
        chicken.frame * 48,
        0,
        48,
        48,
        chicken.x - PHYSICS.BOUNCE_MARGIN, chicken.y - PHYSICS.BOUNCE_MARGIN,
        chicken.size, chicken.size);

      // Dibujar sombra para mejor efecto visual
      // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      // this.ctx.beginPath();
      // this.ctx.ellipse(0, 10, 20, 8, 0, 0, Math.PI * 2);
      // this.ctx.fill();

      // this.ctx.restore();
    });
  }

  drawEggs (eggs) {
    eggs.forEach(egg => {
      this.ctx.drawImage(this.assets.egg, egg.x, egg.y, egg.size, egg.size);
    });
  }

  drawCounter (counter) {
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw (state) {
    this.clearCanvas();

    this.drawChicken(state.chickens);
    this.drawEggs(state.eggs);
    this.drawCounter(state.counter);
  }
}
