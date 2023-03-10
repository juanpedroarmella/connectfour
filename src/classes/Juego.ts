import Ficha from "./Ficha";
import Tablero from "./Tablero";

interface Jugadores {
  jugador1: string;
  jugador2: string;
}

interface ConfigFicha {
  color: string;
  imgSrc: string;
}
interface ConfigFichas {
  ficha1: ConfigFicha;
  ficha2: ConfigFicha;
}

export default class Juego {
  private static inicioXJ1: number = 125;
  private static inicioXJ2: number = 1250;
  private static inicioY: number = 500;
  private static totalTime: number = 5 * 60;
  private static turnoHtml: HTMLHeadElement = document.getElementById(
    "turno"
  ) as HTMLHeadElement;
  private static j1NamePosX: number = 105;
  private static j1NamePosY: number = 400;
  private static j2NamePosX: number = 1200;
  private static j2NamePosY: number = 400;
  private static timeOver: HTMLElement = document.getElementById(
    "timerOver"
  ) as HTMLElement;
  private static reloj: HTMLElement = document.getElementById(
    "timer"
  ) as HTMLElement;

  private timer: number;
  private ultimaFichaClickeada: Ficha | null = null;
  private tablero!: Tablero;
  private jugadores: Jugadores;
  private configFichas: ConfigFichas;
  private turno: string = "";
  private arrFichas: Ficha[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cantCol: number;
  private cantFil: number;
  private interval!: NodeJS.Timer;
  private posiciones: [{ posX: number; posY: number }?] = [];
  private xEnLinea: number;
  private bgTablero: string;
  private isMouseDown: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    jugador1: string,
    jugador2: string,
    ficha1: ConfigFicha,
    ficha2: ConfigFicha,
    cantCol: number,
    cantFil: number,
    bgTablero: string,
    xEnLinea: number
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.jugadores = {
      jugador1,
      jugador2,
    };

    this.configFichas = {
      ficha1,
      ficha2,
    };

    this.cantCol = cantCol;
    this.cantFil = cantFil;
    this.bgTablero = bgTablero;
    this.isMouseDown = false;
    this.xEnLinea = xEnLinea;
    this.repartirFichas();
    this.timer = Juego.totalTime;
  }

  //Invoca los metodos ponerFichas, para dibujar las fichas en las posiciones indicadas
  private repartirFichas = () => {
    this.darFichas(
      this.configFichas.ficha1.imgSrc,
      Juego.inicioXJ1,
      Juego.inicioY,
      this.jugadores.jugador1,
      this.configFichas.ficha1.color
    );
    this.darFichas(
      this.configFichas.ficha2.imgSrc,
      Juego.inicioXJ2,
      Juego.inicioY,
      this.jugadores.jugador2,
      this.configFichas.ficha2.color
    );
  };

  //Reparte las fichas para un determinado jugador
  private darFichas = (
    imgSrc: string,
    inicioX: number,
    inicioY: number,
    jugador: string,
    color: string
  ) => {
    let i = 0;
    let cantFichas = 0;
    const mitadTotalFichas = (this.cantCol * this.cantFil) / 2;
    for (let y = inicioY; cantFichas < mitadTotalFichas; y++) {
      let nuevaFicha = new Ficha(
        i,
        imgSrc,
        jugador,
        inicioX,
        inicioY,
        this.ctx,
        color
      );
      nuevaFicha.drawFicha(inicioX, inicioY);
      this.arrFichas.push(nuevaFicha);
      cantFichas++;
      i++;
    }
  };

  //Inicia los metodos necesarios para comenzar el juego
  comenzar = (initX: number, initY: number) => {
    this.clearCanvas();
    this.tablero = new Tablero(
      this.ctx,
      this.bgTablero,
      this.cantCol,
      this.cantFil,
      initX,
      initY
    );
    this.drawUserName(
      this.jugadores.jugador1,
      Juego.j1NamePosX,
      Juego.j1NamePosY
    );
    this.drawUserName(
      this.jugadores.jugador2,
      Juego.j2NamePosX,
      Juego.j2NamePosY
    );
    this.repartirFichas();
    this.completarPosiciones();
  };

  public setJugador1 = (jugador1: string) => {
    this.jugadores.jugador1 = jugador1;
  };

  public setJugador2 = (jugador2: string) => {
    this.jugadores.jugador2 = jugador2;
  };

  public cambiarTurno = () => {
    if (this.turno == this.jugadores.jugador1) {
      this.turno = this.jugadores.jugador2;
    } else {
      this.turno = this.jugadores.jugador1;
    }
  };

  public turnoActual = () => {
    return this.turno;
  };

  //Recorre el arreglo de fichas disponibles y busca sobre cual se hizo click.
  public buscarFichaClickeada = (x: number, y: number) => {
    for (let i = 0; i < this.arrFichas.length; i++) {
      let f = this.arrFichas[i];
      if (
        f.isPointInside(x, y) &&
        f.getPuedeMover() &&
        f.getPertenece() == this.turno
      ) {
        return f;
      }
    }
  };

  //Si el usuario clickeo una ficha la resalta y luego redibuja el tablero
  public onMouseDown = (e: MouseEvent) => {
    this.isMouseDown = true;
    if (this.ultimaFichaClickeada != null) {
      this.ultimaFichaClickeada.setResaltado(false); //a la ultima figura seleccionada, le saca el resaltado
      this.ultimaFichaClickeada = null;
    }
    let clickFicha = this.buscarFichaClickeada(e.clientX, e.clientY);
    if (clickFicha != null) {
      clickFicha.setResaltado(true); //la resalto
      this.ultimaFichaClickeada = clickFicha;
    }
    this.drawFichasYTablero();
  };

  //Checkea si la ficha arrastrada esta dentro del tablero
  public cursorEnTablero = (
    e: MouseEvent,
    widthMax: number,
    heightMax: number,
    minWidth: number
  ) => {
    return (
      e.clientX >= minWidth &&
      e.clientX <= widthMax &&
      e.clientY >= 0 &&
      e.clientY <= heightMax
    );
  };

  //Completa el arreglo posiciones con las posiciones inicial y final de cada celda del tablero
  public completarPosiciones = () => {
    this.posiciones = [];
    let posInicial = this.tablero.getPosComienzoTableroX();
    for (let i = 0; i < this.cantCol; i++) {
      let pos = {
        posX: posInicial + 3,
        posY: posInicial + 72,
      }; //[celda1, posi 500, posF 572]
      this.posiciones.push(pos);
      posInicial += 75;
    }
  };

  //Arrastra la ficha hacia donde se encuentra el mouse
  public onMouseMove = (e: MouseEvent) => {
    if (this.isMouseDown && this.ultimaFichaClickeada != null) {
      this.ultimaFichaClickeada.setPosition(e.clientX, e.clientY);
      this.drawFichasYTablero();
    }
  };

  //Obtiene la posicion x de la matriz (a partir de la posicion x del mouse) para colocar la ficha
  public getPosX = (e: MouseEvent) => {
    for (let x = 0; x < this.posiciones.length; x++) {
      if (
        e.clientX >= (this.posiciones[x]?.posX || 0) &&
        e.clientX <= (this.posiciones[x]?.posX || 0)
      ) {
        return x;
      }
    }
    return -1;
  };

  //Obtiene la posicion y de la matriz tablero para colocar la ficha
  public getPosY = (posX: number) => {
    let matrizTablero = this.tablero.getMatrizTablero();
    for (let i = this.cantCol - 1; i >= 0; i--) {
      if (matrizTablero[i][posX] == null) {
        return i;
      }
    }
    return -1; // todas las posiciones en Y estan ocupadas
  };

  public onMouseOut = () => {
    if (this.ultimaFichaClickeada != null) this.retornarFichaAlFichero();
  };

  //Cuando suelta el mouse, se obtiene las posiciones donde colocar la ficha y si es posible colocar al ficha,
  //se comprueba si hay un ganador
  public onMouseUp = (e: MouseEvent) => {
    this.isMouseDown = false;
    let heightMax = 100;
    let widthMax =
      this.tablero.getWidth() + this.tablero.getPosComienzoTableroX();
    let minWidth = this.tablero.getPosComienzoTableroX();
    if (this.cursorEnTablero(e, widthMax, heightMax, minWidth)) {
      let posX = this.getPosX(e); //devuelve una posicion del arreglo a partir de la posicion del cursor
      let posY = this.getPosY(posX); //devuelve una posicion para Y checkeando la cantidad de fichas que hay colocadas en la matriz
      if (posY != -1 && posX != -1 && this.ultimaFichaClickeada != null) {
        //si no hay posiciones ocupadas
        this.tablero.colocarFichaMatriz(
          posX,
          posY,
          this.ultimaFichaClickeada.getPertenece()
        );
        let turnoActual = this.turno;
        Juego.turnoHtml.innerHTML = "Turno de " + this.turnoActual();
        this.colocarFicha(posX, posY); //esto es para el canvas

        this.cambiarTurno();
        if (this.tablero.hayEnLinea(posX, posY, turnoActual, this.xEnLinea)) {
          this.mostrarGanador(turnoActual);
          this.turno = "";
          this.stopIntervalTimer(this.interval);
        }
      } else {
        if (this.ultimaFichaClickeada != null) this.retornarFichaAlFichero();
      }
    } else {
      if (this.ultimaFichaClickeada != null) this.retornarFichaAlFichero();
    }
  };

  public retornarFichaAlFichero = () => {
    if (this.turno == this.jugadores.jugador1) {
      this.ultimaFichaClickeada?.setPosition(Juego.inicioXJ1, Juego.inicioY);
      this.drawFichasYTablero();
    } else {
      this.ultimaFichaClickeada?.setPosition(Juego.inicioXJ2, Juego.inicioY);
      this.drawFichasYTablero();
    }
  };

  //Muestra en el html si hay un ganador
  public mostrarGanador = (ganador: string) => {
    const pGanador = document.getElementById("showGanador") as HTMLElement;
    pGanador.innerHTML = ganador;
    document.getElementById("ganador")?.classList.remove("hidden");
  };

  public colocarFicha = (x: number, y: number) => {
    let medidasCelda = this.tablero.getMedidaCelda();
    let valorX = this.posiciones[x];
    if (valorX && this.ultimaFichaClickeada) {
      let posX = (valorX.posX + valorX.posY) / 2;
      let posY =
        this.tablero.getPosComienzoTableroY() + y * medidasCelda.height + 37;
      let newFicha = new Ficha(
        this.ultimaFichaClickeada.getId() as number,
        this.ultimaFichaClickeada.getImgSrc() as string,
        this.ultimaFichaClickeada.getPertenece() as string,
        posX,
        posY,
        this.ultimaFichaClickeada.getCtx(),
        this.ultimaFichaClickeada.getColor()
      );
      let result = this.removeFichaFromArr(this.ultimaFichaClickeada);
      this.arrFichas = result;
      this.arrFichas.push(newFicha);
      newFicha.setResaltado(false);
      this.drawFichasYTablero();
      newFicha.setPuedeMover(false);
    }
  };

  //remueve la ficha del arreglo de fichas
  public removeFichaFromArr = (ficha: Ficha) =>
    this.arrFichas.filter(
      (ele) =>
        ele.getId() != ficha.getId() ||
        ele.getPertenece() != ficha.getPertenece()
    );

  public drawFondo = () => {
    const fondo = "./../../public/fondo.jpg";
    const imgFondo = new Image();
    imgFondo.src = fondo;
  };

  //Dibuja el tablero, las fichas, y los nombres de los jguadores
  public drawFichasYTablero = () => {
    this.clearCanvas();
    this.drawFichas();
    this.drawUserName(
      this.jugadores.jugador1,
      Juego.j1NamePosX,
      Juego.j1NamePosY
    );
    this.drawUserName(
      this.jugadores.jugador2,
      Juego.j2NamePosX,
      Juego.j2NamePosY
    );
  };

  //Dibuja las fichas
  public drawFichas = () => {
    for (let i = 0; i < this.arrFichas.length; i++) {
      this.arrFichas[i].renderizar();
    }
  };

  //dibuja el nombre del jugador
  public drawUserName = (jugador: string, x: number, y: number) => {
    this.ctx.fillStyle = "white";
    this.ctx.font = "600  25px Roboto";
    this.ctx.fillText(jugador, x, y);
  };

  //borra el canvas
  clearCanvas() {
    this.ctx.fillStyle = "#05223c";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getTablero = () => {
    return this.tablero;
  };

  //esconde un elemento del html
  closePopUp() {
    document.getElementById("pop-up")?.classList.add("hidden");
  }

  public consultaJugadoresVacios = () => {
    if (this.jugadores.jugador1 == "") {
      this.jugadores.jugador1 = "Jugador 1";
    }
    if (this.jugadores.jugador2 == "") {
      this.jugadores.jugador2 = "Jugador 2";
    }
  };

  //Inicia el juego y el reloj
  public comenzarJuego = (posXTablero: number, posYTablero: number) => {
    this.jugadores.jugador1 = (
      document?.getElementById("nombreJugador1") as HTMLInputElement
    ).value;
    this.jugadores.jugador2 = (
      document?.getElementById("nombreJugador2") as HTMLInputElement
    ).value;
    this.consultaJugadoresVacios();
    this.turno = this.jugadores.jugador1;
    Juego.turnoHtml.innerHTML = "Turno de " + this.turnoActual();
    this.comenzar(posXTablero, posYTablero);
    Juego.timeOver.classList.add("hidden");
    this.closePopUp();
    this.interval = setInterval(() => {
      if (this.timer >= 0) {
        Juego.reloj.innerHTML = this.convertMinSec(this.timer).toString();
        this.timer--;
      } else {
        Juego.timeOver.classList.remove("hidden");
        this.turno = "";
        this.stopIntervalTimer(this.interval);
      }
    }, 1000);
  };

  //Muestra el pop-up de configuracion inicial del juego.
  public showPopUp = () => {
    document.getElementById("pop-up")?.classList.remove("hidden");
    document.getElementById("tablero")?.classList.remove("hidden");
    document.getElementById("jugadores")?.classList.remove("hidden");
    document.getElementById("personalizar")?.classList.remove("hidden");
    document.getElementById("formatos")?.classList.remove("hidden");
    document.getElementById("imagen")?.classList.remove("hidden");
    document.getElementById("color")?.classList.remove("hidden");
    document.getElementById("verImagenes")?.classList.remove("hidden");
    document.getElementById("verColores")?.classList.remove("hidden");
    document.getElementById("elegirImagen1")?.classList.add("hidden");
    document.getElementById("elegirImagen2")?.classList.add("hidden");
    document.getElementById("elegirColor1")?.classList.add("hidden");
    document.getElementById("elegirColor2")?.classList.add("hidden");
    document.getElementById("leagueOfLegends")?.classList.add("hidden");
    document.getElementById("naruto")?.classList.add("hidden");
    document.getElementById("harryPotter")?.classList.add("hidden");
    document.getElementById("green")?.classList.add("hidden");
    document.getElementById("red")?.classList.add("hidden");
    document.getElementById("blue")?.classList.add("hidden");
    document.getElementById("ganador")?.classList.add("hidden");
    document.getElementById("timerOver")?.classList.add("hidden");
  };

  //detiene el timer
  public stopIntervalTimer = (interval: NodeJS.Timer) => {
    clearInterval(interval);
  };

  //Convierte un valor entero en formato minutos segund
  public convertMinSec = (value: number) => {
    let minutes: number | string = Math.floor(value / 60);
    let seconds: number | string = value - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };
}
