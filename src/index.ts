import { MainMenu } from "./ts/MainMenu";

export class Index {
  private static canvas: HTMLCanvasElement = document.getElementById(
    "myCanvas"
  ) as HTMLCanvasElement;
  private static imgTablero: string = "./../../public/celda.png";

  constructor() {
    new MainMenu(Index.canvas as HTMLCanvasElement, Index.imgTablero);
  }
}

new Index();
