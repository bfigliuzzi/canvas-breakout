import { Circle } from "../../canvas-module/models/circle.model";
import { Coordinates } from "../../canvas-module/models/coordinates.model";

export class Ball extends Circle {
  speedX!: number;
  speedY!: number;

  constructor(radius: number, coordinates: Coordinates) {
    super(radius, coordinates);
  }

  setSpeed(speed: number) {
    this.speedX = speed;
    this.speedY = speed;
  }

  invertSpeedX() {
    this.speedX = this.speedX * -1;
  }

  invertSpeedY() {
    this.speedY = this.speedY * -1;
  }

  move() {
    super.move(this.speedX, this.speedY);
  }
}
