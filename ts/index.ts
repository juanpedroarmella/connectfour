import { MainMenu } from "./MainMenu";

export class Index {
  private static canvas: HTMLCanvasElement = document.getElementById(
    "myCanvas"
  ) as HTMLCanvasElement;
  private static imgTablero: string = "./img/celda.png";
  private static reloj: HTMLElement = document.getElementById(
    "timer"
  ) as HTMLElement;
  private static jugador1: string = "Jugador1";
  private static jugador2: string = "Jugador2";

  constructor() {
    new MainMenu(
      Index.canvas as HTMLCanvasElement,
      Index.imgTablero,
      Index.jugador1,
      Index.jugador2,
      Index.reloj as HTMLElement
    );
  }
}

const index = new Index();
