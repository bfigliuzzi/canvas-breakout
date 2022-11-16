import { Circle } from "./circle.model";
import { Rectangle } from "./rectangle.model";
import { Shape } from "./shape.model";

export class Canvas {
  private readonly canvas: HTMLCanvasElement;
  private readonly canvasContext: CanvasRenderingContext2D;

  width: number;
  height: number;

  constructor(querySelector: string, width: number, height: number) {
    const elem = document.querySelector<HTMLCanvasElement>(querySelector);

    if (!elem) {
      throw new Error("Canvas not found");
    }

    this.canvas = elem;
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.canvas.classList.add("border", "border-black");

    this.canvasContext = this.canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
  }

  draw(shape: Shape) {
    if (shape instanceof Rectangle) {
      this.drawRectangle(shape as Rectangle);
    }
  }

  drawRectangle(rectangle: Rectangle) {
    this.canvasContext.fillStyle = rectangle.fillStyle;
    this.canvasContext.fillRect(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height
    );

    if (rectangle.strokeStyle && rectangle.lineWidth) {
      this.canvasContext.strokeStyle = rectangle.strokeStyle;
      this.canvasContext.lineWidth = rectangle.lineWidth;
      this.canvasContext.strokeRect(
        rectangle.x,
        rectangle.y,
        rectangle.width,
        rectangle.height
      );
    }
  }

  drawCircle(circle: Circle) {
    this.canvasContext.beginPath();

    this.canvasContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

    if (circle.strokeStyle && circle.lineWidth) {
      this.canvasContext.strokeStyle = circle.strokeStyle;
      this.canvasContext.lineWidth = circle.lineWidth;
      this.canvasContext.stroke();
    } else {
      this.canvasContext.fillStyle = circle.fillStyle;
      this.canvasContext.fill();
    }

    this.canvasContext.closePath();
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
  }
}
