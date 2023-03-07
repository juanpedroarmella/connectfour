import { Ficha } from "../js/Ficha";
import { Tablero } from "../js/Tablero";

export class Juego {
  private static inicioXJ1: number = 125;
  private static inicioXJ2: number = 1250;
  private static inicioY: number = 500;
  private static timer: number = 5 * 60;
  private static turnoHtml: HTMLHeadElement = document.getElementById(
    "turno"
  ) as HTMLHeadElement;

  private ultimaFichaClickeada: Ficha;
  private tablero: Tablero;
  private jugador1: string;
  private jugador2: string;
  private imgFicha1: string | null = null;
  private imgFicha2: string | null = null;
  private colorFicha1: string | null = null;
  private colorFicha2: string | null = null;
  private turno: string;
  private fichas: Ficha[];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private col: number;
  private fil: number;
  private interval: number;
  private posiciones: [{ posX: number; posY: number }];
  private xEnLinea: boolean;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  //Invoca los metodos ponerFichas, para dibujar las fichas en las posiciones indicadas
  public nuevasFichas = () => {
    this.ponerFichas(
      this.imgFicha1 as string,
      Juego.inicioXJ1,
      Juego.inicioY,
      this.jugador1,
      this.colorFicha1 as string
    );
    this.ponerFichas(
      this.imgFicha2 as string,
      Juego.inicioXJ2,
      Juego.inicioY,
      this.jugador2,
      this.colorFicha2 as string
    );
  };

  //Dibuja las fichas para un determinado jugador
  private ponerFichas = (
    imgFicha: string,
    inicioX: number,
    inicioY: number,
    jugador: string,
    colorFicha: string
  ) => {
    let i = 0;
    let cantFichas = 0;
    const mitadTotalFichas = (this.col * this.fil) / 2;
    for (let y = inicioY; cantFichas < mitadTotalFichas; y++) {
      let nuevaFicha = new Ficha(
        i,
        imgFicha,
        jugador,
        inicioX,
        inicioY,
        this.ctx,
        colorFicha
      );
      nuevaFicha.drawFicha(inicioX, inicioY);
      this.fichas.push(nuevaFicha);
      cantFichas++;
      i++;
    }
  };

  public setJugador1 = (jugador1: string) => {
    this.jugador1 = jugador1;
  };

  public setJugador2 = (jugador2: string) => {
    this.jugador2 = jugador2;
  };

  public cambiarTurno = () => {
    if (this.turno == this.jugador1) {
      this.turno = this.jugador2;
    } else {
      this.turno = this.jugador1;
    }
  };
}
