import { Coordinates } from "./coordinates.model";
import { Hitbox } from "./hitbox.model";

export abstract class Shape {
  private _x = 0;
  private _y = 0;

  get x() {
    return this._x;
  }
  private set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }
  private set y(value: number) {
    this._y = value;
  }

  fillStyle = "#CCC";
  strokeStyle? = "#000";
  lineWidth? = 0;

  constructor(coordinates?: Coordinates) {
    if (coordinates) {
      this.setCoordinates(coordinates);
    }
  }

  setCoordinates(coordinates: Coordinates) {
    this.setPosition(coordinates.x, coordinates.y);
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x = 0, y = 0) {
    this.x += x;
    this.y += y;
  }

  abstract getHitbox(): Hitbox;
}
