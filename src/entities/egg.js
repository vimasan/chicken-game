export class Egg {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.hatchTime = Date.now() + 5000;
    this.hatched = false;
  }

  // update () {
  //   if (Date.now() > this.hatchTime) {
  //     this.hatched = true;
  //   }
  // }
}
