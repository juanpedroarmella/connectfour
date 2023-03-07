import { Juego } from "../js/Juego";
import { Events } from "./Events";

export class MainMenu {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imgTablero: string;
  private filas: number = 0;
  private columnas: number = 0;
  private xEnLinea: number;
  private juego: Juego;
  private jugador1: string;
  private jugador2: string;
  private imgFicha1: string | null = null;
  private imgFicha2: string | null = null;
  private colorFicha1: string | null = null;
  private colorFicha2: string | null = null;
  private canvasHeight: number;
  private reloj: HTMLElement;
  private posInicialTableroX: number;
  private posInicialTableroY: number;

  constructor(
    canvas: HTMLCanvasElement,
    imgTablero: string,
    jugador1: string,
    jugador2: string,
    reloj: HTMLElement
  ) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.imgTablero = imgTablero;
    this.juego = new Juego(this.ctx, this.canvas);
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.reloj = reloj;

    this.juego.clearCanvas();
    new Events(this);
  }

  public setImgFicha1 = (img: string | null) => {
    this.imgFicha1 = img;
  };

  public setImgFicha2 = (img: string | null) => {
    this.imgFicha2 = img;
  };

  public setColorFicha1 = (color: string | null) => {
    this.colorFicha1 = color;
  };

  public setColorFicha2 = (color: string | null) => {
    this.colorFicha2 = color;
  };

  public setCuatroEnLinea = () => {
    this.posInicialTableroX = 500;
    this.posInicialTableroY = 100;
    this.canvasHeight = 650;
    this.columnas = 7;
    this.filas = 6;
    this.xEnLinea = 4;
  };

  public setCincoEnLinea = () => {
    this.posInicialTableroX = 400;
    this.posInicialTableroY = 100;
    this.canvasHeight = 700;
    this.columnas = 8;
    this.filas = 7;
    this.xEnLinea = 5;
  };

  public setSeisEnLinea = () => {
    this.posInicialTableroX = 400;
    this.posInicialTableroY = 70;
    this.canvasHeight = 760;
    this.columnas = 9;
    this.filas = 8;
    this.xEnLinea = 6;
  };

  public setSieteEnLinea = () => {
    this.posInicialTableroX = 400;
    this.posInicialTableroY = 70;
    this.canvasHeight = 850;
    this.columnas = 10;
    this.filas = 9;
    this.xEnLinea = 7;
  };

  private CanvasEvents = () => {
    this.canvas.addEventListener("mouseout", (e) => {
      if (this.juego.getTablero() != null) {
        this.juego.onMouseOut();
      }
    });
    this.canvas.addEventListener("mousedown", (e) => {
      if (this.juego.getTablero() != null) {
        this.juego.onMouseDown(e);
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.juego.getTablero() != null) {
        this.juego.onMouseMove(e);
      }
    });

    this.canvas.addEventListener("mouseup", (e) => {
      if (this.juego.getTablero() != null) {
        this.juego.onMouseUp(e);
      }
    });
  };

  public reiniciar = () => {
    this.colorFicha1 = null;
    this.colorFicha1 = null;
    this.imgFicha1 = null;
    this.imgFicha2 = null;
    this.juego.reiniciarJuego(this.reloj);
  };

  public comenzarJuego = () => {
    document?.getElementById("alertColoresIguales")?.classList.add("hidden");
    this.juego.comenzarJuego(
      this.imgTablero,
      this.imgFicha1,
      this.imgFicha2,
      this.columnas,
      this.filas,
      this.colorFicha1,
      this.colorFicha2,
      this.xEnLinea,
      this.posInicialTableroX,
      this.posInicialTableroY
    );
  };
}
