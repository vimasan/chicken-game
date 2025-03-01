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
      let posImage = chicken.frame * 48;
      if (chicken.dir === 1) posImage = (chicken.frame * 48) + 192;
      if (chicken.dir === -1) posImage = (chicken.frame * 48) + 96;

      this.ctx.drawImage(
        this.assets.chicken,
        // Recorte del sprite
        posImage,
        0,
        48,
        48,
        chicken.x - PHYSICS.BOUNCE_MARGIN, chicken.y - PHYSICS.BOUNCE_MARGIN,
        chicken.size, chicken.size);
    });
  }

  drawEggs (eggs) {
    eggs.forEach(egg => {
      let posInitialImage = 0;
      if (!egg.hatched && !egg.expired) posInitialImage = 0;
      if (egg.hatched) posInitialImage = 48;
      if (egg.expired) posInitialImage = 96;

      this.ctx.drawImage(
        this.assets.egg, // Imagen
        posInitialImage, // Posicion izquierda inicial de la imagen
        0, // Posicion inicial superior de la imagen
        48, // Ancho de la imagen
        51, // Alto de la imagen
        egg.x, // Posicion inicial en el canvas
        egg.y, // Posicion inicial en el canvas
        egg.size, // Ancho del canvas
        egg.size // Alto del canvas
      );
    });
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw (state) {
    this.clearCanvas();

    this.drawChicken(state.chickens);
    this.drawEggs(state.eggs);
  }
}
