import Juego from "./Juego";
import EventData from "./EventData";

export default class MainMenu {
  private static canvasWidth: number = 1500;
  private static canvasHeight: number = 850;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imgTablero: string;
  private filas: number = 0;
  private columnas: number = 0;
  private xEnLinea: number = 0;
  private juego!: Juego;
  private jugador1: string = "";
  private jugador2: string = "";
  private imgFicha1: string | null = null;
  private imgFicha2: string | null = null;
  private colorFicha1: string = "black";
  private colorFicha2: string = "black";
  private canvasHeight: number = 0;
  private posInicialTableroX: number = 0;
  private posInicialTableroY: number = 0;

  constructor(canvas: HTMLCanvasElement, imgTablero: string) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.imgTablero = imgTablero;
    this.drawFondo();
    new EventData(this);
  }

  private nuevoJuego = () => {
    this.CanvasEvents();
    return new Juego(
      this.ctx,
      this.canvas,
      this.jugador1,
      this.jugador2,
      { color: this.colorFicha1 as string, imgSrc: this.imgFicha1 as string },
      { color: this.colorFicha2 as string, imgSrc: this.imgFicha2 as string },
      this.filas,
      this.columnas,
      this.imgTablero,
      this.xEnLinea
    );
  };

  public drawFondo = () => {
    const fondo = "./public/fondo.jpg";
    const imgFondo = new Image();
    imgFondo.src = fondo;
    imgFondo.onload = () => {
      this.ctx.drawImage(
        imgFondo,
        0,
        0,
        MainMenu.canvasWidth,
        MainMenu.canvasHeight
      );
    };
  };

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

  public getCanvasHeight = () => {
    return this.canvasHeight;
  };

  private mouseoutHandler = (e) => {
    if (this.juego.getTablero() != null) {
      this.juego.onMouseOut();
    }
  };
  private mousedownHandler = (e) => {
    if (this.juego.getTablero() != null) {
      this.juego.onMouseDown(e);
    }
  };
  private mousemoveHandler = (e) => {
    if (this.juego.getTablero() != null) {
      this.juego.onMouseMove(e);
    }
  };
  private mouseupHandler = (e) => {
    if (this.juego.getTablero() != null) {
      this.juego.onMouseUp(e);
    }
  };

  private CanvasEvents = () => {
    this.canvas.addEventListener("mouseout", this.mouseoutHandler);
    this.canvas.addEventListener("mousedown", this.mousedownHandler);
    this.canvas.addEventListener("mousemove", this.mousemoveHandler);
    this.canvas.addEventListener("mouseup", this.mouseupHandler);
  };

  // Más adelante para eliminar los eventos
  private removeCanvasEvents = () => {
    this.canvas.removeEventListener("mouseout", this.mouseoutHandler);
    this.canvas.removeEventListener("mousedown", this.mousedownHandler);
    this.canvas.removeEventListener("mousemove", this.mousemoveHandler);
    this.canvas.removeEventListener("mouseup", this.mouseupHandler);
  };

  public reiniciar = () => {
    this.juego.clearCanvas();
    this.juego.showPopUp();
    this.juego.stopIntervalTimer();
    this.removeCanvasEvents();
  };

  public comenzarJuego = () => {
    this.juego = this.nuevoJuego();
    this.juego.comenzarJuego(this.posInicialTableroX, this.posInicialTableroY);
  };
}
