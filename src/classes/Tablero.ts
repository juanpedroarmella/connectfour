interface CellBg {
  src: string;
  height: number;
  width: number;
  img: HTMLImageElement;
}

export default class Tablero {
  private static CELL_WIDTH = 75;
  private static CELL_HEIGHT = 72;

  private matrizTablero: (string | null)[][];
  private cantCol: number;
  private cantFil: number;
  private cellBg: CellBg;
  private initX: number;
  private initY: number;
  private ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    cellSrcImg: string,
    cantCol: number,
    cantFil: number,
    initX: number,
    initY: number
  ) {
    this.cantCol = cantCol;
    this.cantFil = cantFil;
    this.matrizTablero = [];
    this.inicMatriz();
    this.cellBg = {
      src: cellSrcImg,
      height: Tablero.CELL_WIDTH,
      width: Tablero.CELL_HEIGHT,
      img: new Image(),
    };
    this.initX = initX;
    this.initY = initY;
    this.ctx = ctx;
    this.initX = initX;
    this.initY = initY;
    this.dibujarTablero();
  }

  //Inicia la matriz tablero con valores nulos
  public inicMatriz = () => {
    for (let i = 0; i < this.cantFil; i++) {
      this.matrizTablero[i] = [];
      for (let j = 0; j < this.cantCol; j++) {
        this.matrizTablero[i][j] = null;
      }
    }
  };

  private cargarImagen = () => {
    let posX = this.initX;
    let posY = this.initY;
    for (let x = 0; x < this.cantFil; x++) {
      for (let y = 0; y < this.cantCol; y++) {
        this.ctx.drawImage(
          this.cellBg.img,
          posX,
          posY,
          this.cellBg.width,
          this.cellBg.height
        );
        posX += Tablero.CELL_WIDTH;
      }
      posX = this.initX;
      posY += Tablero.CELL_HEIGHT;
    }
    posY = this.initY;
  };

  public dibujarTablero = () => {
    if (this.cellBg.img.src === "") {
      this.cellBg.img.src = this.cellBg.src;
      this.cellBg.img.onload = this.cargarImagen.bind(this);
    } else {
      this.cargarImagen();
    }
  };

  //Obtiene la medida de la celda de tablero
  public getMedidaCelda = () => {
    return { height: Tablero.CELL_HEIGHT, width: Tablero.CELL_WIDTH };
  };

  //retorna la matriz logica del tablero
  public getMatrizTablero = () => {
    return this.matrizTablero;
  };

  //obtiene el ancho del tablero canvas
  getWidth() {
    let width = 0;
    for (let i = 0; i < this.cantCol; i++) {
      width += Tablero.CELL_WIDTH;
    }
    return width;
  }

  //obtiene el alto del tablero canvas
  public getHeight = () => {
    let height = 0;
    for (let i = 0; i < this.cantFil; i++) {
      height += Tablero.CELL_HEIGHT;
    }
    return height;
  };
  //retorna la posicion X donde se comienza a dibujar el tablero canvas
  public getPosComienzoTableroX = () => {
    return this.initX;
  };

  //retorna la posicion Y donde se comienza a dibujar el tablero canvas
  public getPosComienzoTableroY = () => {
    return this.initY;
  };

  //Coloca el dueño de la ficha en la matriz logica
  public colocarFichaMatriz = (x: number, y: number, jugador: string) => {
    this.matrizTablero[y][x] = jugador;
  };

  //Verifica si hay x en linea
  public hayEnLinea = (
    posX: number,
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    return (
      this.busquedaVertical(posX, posY, jugador, xEnLinea) ||
      this.busquedaHorizontal(posY, jugador, xEnLinea) ||
      this.busquedaDiagonal(posX, posY, jugador, xEnLinea)
    );
  };

  //busca si hay x en linea de forma vertical en el tablero
  private busquedaVertical = (
    posX: number,
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    //posX estatico, posY busca hacia abajo
    let cont = 0;
    for (let y = posY; y < this.cantFil; y++) {
      if (this.matrizTablero[y][posX] == jugador) {
        cont++;
        if (cont == xEnLinea) return true;
      } else cont = 0;
    }

    return false;
  };

  //busca si hay x en linea de forma horizontal en el tablero
  private busquedaHorizontal = (
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    //posY estatico,posX busca hacia los costados
    //empezando de un borde
    let cont = 0;
    for (let x = 0; x < this.cantCol; x++) {
      if (this.matrizTablero[posY][x] == jugador) {
        cont++;
        if (cont == xEnLinea) return true;
      } else cont = 0;
    }

    return false;
  };

  //Busca de las dos formas en diagonal, si existe un X en linea
  private busquedaDiagonal = (
    posX: number,
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    return (
      this.busquedaIzqInferiorADerSuperior(posX, posY, jugador, xEnLinea) ||
      this.busquedaIzqSuperiorADerInferior(posX, posY, jugador, xEnLinea)
    );
  };

  private busquedaIzqSuperiorADerInferior = (
    posX: number,
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    let posInicial = {
      x: posX,
      y: posY,
    };

    while (posInicial.x > 0 && posInicial.y > 0) {
      posInicial.x--;
      posInicial.y--;
    }

    let cont = 0;
    while (posInicial.x <= this.cantCol && posInicial.y <= this.cantFil - 1) {
      if (this.matrizTablero[posInicial.y][posInicial.x] == jugador) {
        cont++;
        if (cont == xEnLinea) return true;
      } else {
        cont = 0;
      }
      posInicial.x++;
      posInicial.y++;
    }
    return false;
  };

  private busquedaIzqInferiorADerSuperior = (
    posX: number,
    posY: number,
    jugador: string,
    xEnLinea: number
  ): boolean => {
    let posInicial = {
      x: posX,
      y: posY,
    };
    let cont = 0;

    while (posInicial.x < this.cantCol && posInicial.y < this.cantFil) {
      posInicial.x++;
      posInicial.y++;
    }

    while (posInicial.x >= 0 && posInicial.y <= this.cantFil - 1) {
      if (this.matrizTablero[posInicial.y][posInicial.x] == jugador) {
        cont++;
        if (cont == xEnLinea) {
          return true;
        }
      } else {
        cont = 0;
      }
      posInicial.x--;
      posInicial.y++;
    }
    return false;
  };
}
