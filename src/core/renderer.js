export class Renderer {
  constructor (canvas, ctx, assets) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.assets = assets;
  }

  drawChicken (chickens) {
    chickens.forEach(chicken => {
      // !Todo: Revisar la logica de dibujado de las gallinas
      this.ctx.drawImage(this.assets.chicken, chicken.x, chicken.y, chicken.size, chicken.size);
    });
  }

  drawEggs (eggs) {
    eggs.forEach(egg => {
      this.ctx.drawImage(this.assets.egg, egg.x, egg.y, egg.size, egg.size);
    });
  }

  drawCounter (counter) {
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Huevos: ${counter}`, 10, 30);
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
