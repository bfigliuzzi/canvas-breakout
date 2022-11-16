import { Coordinates } from "./coordinates.model";
import { Hitbox } from "./hitbox.model";
import { Shape } from "./shape.model";

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number, coordinates?: Coordinates) {
    super(coordinates);

    this.width = width;
    this.height = height;
  }

  getHitbox(): Hitbox {
    return {
      a: { x: this.x, y: this.y },
      b: { x: this.x + this.width, y: this.y },
      c: { x: this.x + this.width, y: this.y + this.height },
      d: { x: this.x, y: this.y + this.height },
    };
  }
}
