export interface GameOptions {
  gameArea?: {
    width?: number;
    height?: number;
    numberOfBrickPerLine?: number;
    numberOfLine?: number;
  };
  brick?: {
    width?: number;
    height?: number;
    marginX?: number;
    marginY?: number;
    fillStyle?: string;
    lineWidth?: number;
    strokeStyle?: number;
  };
  ball?: {
    radius?: number;
    speed?: number;
    fillStyle?: string;
    lineWidth?: number;
    strokeStyle?: string;
  };
  pad?: {
    width?: number;
    height?: number;
    speed?: number;
    fillStyle?: string;
    lineWidth?: number;
    strokeStyle?: string;
  };
}

export interface DefinitiveGameOptions {
  gameArea: {
    width: number;
    height: number;
    numberOfBrickPerLine: number;
    numberOfLine: number;
  };
  brick: {
    width: number;
    height: number;
    marginX: number;
    marginY: number;
    fillStyle: string;
    lineWidth: number;
    strokeStyle: string;
  };
  ball: {
    radius: number;
    speed: number;
    fillStyle: string;
    lineWidth: number;
    strokeStyle: string;
  };
  pad: {
    width: number;
    height: number;
    speed: number;
    fillStyle: string;
    lineWidth: number;
    strokeStyle: string;
  };
}

export function getDefaultGameOption(): DefinitiveGameOptions {
  return {
    gameArea: {
      width: 600,
      height: 400,
      numberOfBrickPerLine: 5,
      numberOfLine: 3,
    },
    brick: {
      width: 100,
      height: 20,
      marginX: 5,
      marginY: 5,
      fillStyle: "#adc",
      lineWidth: 0,
      strokeStyle: "",
    },
    ball: {
      radius: 10,
      speed: 2,
      fillStyle: "#fba",
      lineWidth: 0,
      strokeStyle: "",
    },
    pad: {
      width: 150,
      height: 10,
      speed: 7,
      fillStyle: "#abf",
      lineWidth: 0,
      strokeStyle: "",
    },
  };
}
