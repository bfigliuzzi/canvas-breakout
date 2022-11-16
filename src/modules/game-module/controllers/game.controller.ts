import { Canvas } from "../../canvas-module/models/canvas.model";
import { Ball } from "../models/ball.model";
import { Brick } from "../models/brick.model";
import {
  DefinitiveGameOptions,
  GameOptions,
  getDefaultGameOption as getDefaultGameOptions,
} from "../models/game-options.model";
import { Pad } from "../models/pad.model";

export class Game {
  private options: DefinitiveGameOptions;
  private gameLoopId!: number;

  canvas: Canvas;
  ball!: Ball;
  pad!: Pad;
  bricks: Brick[][] = [];

  isInitDone = false;

  constructor(querySelector: string, options?: GameOptions) {
    this.options = Object.assign(getDefaultGameOptions(), options);

    this.canvas = new Canvas(
      querySelector,
      this.options.gameArea.width,
      this.options.gameArea.height
    );

    this.init();
  }

  init() {
    this.canvas.clear();

    this.drawPad(225, 385);
    this.drawBall(300, 375);
    this.drawBricks();

    this.isInitDone = true;
  }

  drawBricks() {
    const xStartingPoint = 40;
    const yStartingPoint = 60;

    const brickWidth = this.options.brick.width;
    const brickTotalWidth = brickWidth + this.options.brick.marginX;

    const brickHeight = this.options.brick.height;
    const brickTotalHeight = brickHeight + this.options.brick.marginY;

    let y = yStartingPoint - brickTotalHeight;

    for (let r = 0; r < this.options.gameArea.numberOfLine; r++) {
      y += brickTotalHeight;
      let x = xStartingPoint - brickTotalWidth;

      for (let c = 0; c < this.options.gameArea.numberOfBrickPerLine; c++) {
        if (!this.isInitDone) {
          x += brickTotalWidth;

          const brick = new Brick(brickWidth, brickHeight, { x, y });
          brick.fillStyle = this.options.brick.fillStyle;

          if (!this.bricks[r]) {
            this.bricks[r] = [];
          }

          this.bricks[r].push(brick);
        }

        const brick = this.bricks[r][c];

        if (!brick.isDestroyed()) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + brickWidth &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + brickHeight
          ) {
            brick.hit();
            this.ball.invertSpeedY();

            this.bricks[r][c] = brick;
          }
        }

        if (!brick.isDestroyed()) {
          this.canvas.drawRectangle(brick);
        }
      }
    }
  }

  drawPad(x = 0, y = 0) {
    if (!this.pad) {
      const pad = new Pad(this.options.pad.width, this.options.pad.height, {
        x,
        y,
      });
      pad.fillStyle = this.options.pad.fillStyle;
      this.pad = pad;
    } else {
      if (this.pad.x + this.pad.width > this.canvas.width) {
        this.pad.setPosition(this.canvas.width - this.pad.width, this.pad.y);
      } else if (this.pad.x < 0) {
        this.pad.setPosition(0, this.pad.y);
      }

      this.pad.move();
    }

    this.canvas.drawRectangle(this.pad);
  }

  drawBall(x = 0, y = 0) {
    if (!this.ball) {
      const ball = new Ball(this.options.ball.radius, { x, y });
      ball.fillStyle = this.options.ball.fillStyle;
      ball.setSpeed(this.options.ball.speed);
      this.ball = ball;
    } else {
      if (
        this.ball.x + this.ball.speedX > this.canvas.width - this.ball.radius ||
        this.ball.x + this.ball.speedX < this.ball.radius
      ) {
        this.ball.invertSpeedX();
      }

      if (this.ball.y + this.ball.speedY < this.ball.radius) {
        this.ball.invertSpeedY();
      } else if (
        this.ball.y + this.ball.speedY >
        this.canvas.height - this.ball.radius
      ) {
        if (
          this.ball.x > this.pad.x &&
          this.ball.x < this.pad.x + this.pad.width
        ) {
          this.ball.invertSpeedY();
        } else {
          this.stop();
          alert("T NUL");
          document.location.reload();
          return;
        }
      }

      this.ball.move();
    }

    this.canvas.drawCircle(this.ball);
  }

  start() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

    this.gameLoopId = setInterval(this.draw.bind(this), 10);
  }

  stop() {
    document.removeEventListener(
      "keydown",
      this.keyDownHandler.bind(this),
      false
    );

    clearInterval(this.gameLoopId);
  }

  draw() {
    this.canvas.clear();

    this.drawBall();
    this.drawPad();
    this.drawBricks();

    if (this.bricks.every((bs) => bs.every((b) => b.isDestroyed()))) {
      this.stop();
      alert("GG BG");
      document.location.reload();
    }
  }

  private keyDownHandler(e: KeyboardEvent) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.pad.setSpeed(this.options.pad.speed);
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
      this.pad.setSpeed(this.options.pad.speed * -1);
    }
  }

  private keyUpHandler(e: KeyboardEvent) {
    if (["Right", "ArrowRight", "Left", "ArrowLeft"].includes(e.key)) {
      this.pad.setSpeed(0);
    }
  }
}
