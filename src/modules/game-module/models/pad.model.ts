import { Coordinates } from "../../canvas-module/models/coordinates.model";
import { Rectangle } from "../../canvas-module/models/rectangle.model";

export class Pad extends Rectangle {
  speedX!: number;

  constructor(width: number, height: number, coordinates: Coordinates) {
    super(width, height, coordinates);
  }

  setSpeed(speed: number) {
    this.speedX = speed;
  }

  move() {
    super.move(this.speedX, 0);
  }
}
