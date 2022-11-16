import "./assets/styles/style.css";
import { Game } from "./modules/game-module/controllers/game.controller";

const game = new Game("#bkzone");

const startBtn = document.querySelector("#startBtn");
startBtn?.addEventListener("click", game.start.bind(game));

const stopBtn = document.querySelector("#stopBtn");
stopBtn?.addEventListener("click", game.stop.bind(game));
