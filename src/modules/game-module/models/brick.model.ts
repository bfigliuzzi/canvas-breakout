import { Coordinates } from "../../canvas-module/models/coordinates.model";
import { Rectangle } from "../../canvas-module/models/rectangle.model";

export class Brick extends Rectangle {
  maxHitCount = 1;
  currentHitCount = 0;

  constructor(width: number, height: number, coordinates: Coordinates) {
    super(width, height, coordinates);
  }

  hit() {
    this.currentHitCount++;
  }

  isDestroyed() {
    return this.currentHitCount >= this.maxHitCount;
  }
}
