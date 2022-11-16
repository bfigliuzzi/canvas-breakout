import { Coordinates } from "./coordinates.model";
import { Hitbox } from "./hitbox.model";
import { Shape } from "./shape.model";

export class Circle extends Shape {
  radius = 10;

  constructor(radius: number, coordinates: Coordinates) {
    super(coordinates);

    this.radius = radius;
  }

  getHitbox(): Hitbox {
    throw new Error("Method not implemented.");
  }
}
