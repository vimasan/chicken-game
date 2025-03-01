export class Egg {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.incubationTime = Date.now() + 5000;
    this.maximunLifeTime = this.incubationTime + 5000;
    this.hatched = false;
    this.expired = false;
  }
}
