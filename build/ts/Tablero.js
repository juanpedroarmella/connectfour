export class Tablero {
    constructor(ctx, cellSrcImg, cantCol, cantFil, initX, initY) {
        //Inicia la matriz tablero con valores nulos
        this.inicMatriz = () => {
            for (let i = 0; i < this.cantFil; i++) {
                this.matrizTablero[i] = [];
                for (let j = 0; j < this.cantCol; j++) {
                    this.matrizTablero[i][j] = null;
                }
            }
        };
        this.cargarImagen = () => {
            let posX = this.initX;
            let posY = this.initY;
            for (let x = 0; x < this.cantFil; x++) {
                for (let y = 0; y < this.cantCol; y++) {
                    this.ctx.drawImage(this.cellBg.img, posX, posY, this.cellBg.width, this.cellBg.height);
                    posX += Tablero.CELL_WIDTH;
                }
                posX = this.initX;
                posY += Tablero.CELL_HEIGHT;
            }
            posY = this.initY;
        };
        this.dibujarTablero = () => {
            if (this.cellBg.img.src === "") {
                this.cellBg.img.src = this.cellBg.src;
                this.cellBg.img.onload = this.cargarImagen.bind(this);
            }
            else {
                this.cargarImagen();
            }
        };
        //Obtiene la medida de la celda de tablero
        this.getMedidaCelda = () => {
            return { height: Tablero.CELL_HEIGHT, width: Tablero.CELL_WIDTH };
        };
        //retorna la matriz logica del tablero
        this.getMatrizTablero = () => {
            return this.matrizTablero;
        };
        //obtiene el alto del tablero canvas
        this.getHeight = () => {
            let height = 0;
            for (let i = 0; i < this.cantFil; i++) {
                height += Tablero.CELL_HEIGHT;
            }
            return height;
        };
        //retorna la posicion X donde se comienza a dibujar el tablero canvas
        this.getPosComienzoTableroX = () => {
            return this.initX;
        };
        //retorna la posicion Y donde se comienza a dibujar el tablero canvas
        this.getPosComienzoTableroY = () => {
            return this.initY;
        };
        //Coloca el dueño de la ficha en la matriz logica
        this.colocarFichaMatriz = (x, y, jugador) => {
            this.matrizTablero[y][x] = jugador;
        };
        //Verifica si hay x en linea
        this.hayEnLinea = (posX, posY, jugador, xEnLinea) => {
            return (this.busquedaVertical(posX, posY, jugador, xEnLinea) ||
                this.busquedaHorizontal(posY, jugador, xEnLinea) ||
                this.busquedaDiagonal(posX, posY, jugador, xEnLinea));
        };
        //busca si hay x en linea de forma vertical en el tablero
        this.busquedaVertical = (posX, posY, jugador, xEnLinea) => {
            //posX estatico, posY busca hacia abajo
            let cont = 0;
            for (let y = posY; y < this.cantFil; y++) {
                if (this.matrizTablero[y][posX] == jugador) {
                    cont++;
                    if (cont == xEnLinea)
                        return true;
                }
                else
                    cont = 0;
            }
            return false;
        };
        //busca si hay x en linea de forma horizontal en el tablero
        this.busquedaHorizontal = (posY, jugador, xEnLinea) => {
            //posY estatico,posX busca hacia los costados
            //empezando de un borde
            let cont = 0;
            for (let x = 0; x < this.cantCol; x++) {
                if (this.matrizTablero[posY][x] == jugador) {
                    cont++;
                    if (cont == xEnLinea)
                        return true;
                }
                else
                    cont = 0;
            }
            return false;
        };
        //Busca de las dos formas en diagonal, si existe un X en linea
        this.busquedaDiagonal = (posX, posY, jugador, xEnLinea) => {
            return (this.busquedaIzqInferiorADerSuperior(posX, posY, jugador, xEnLinea) ||
                this.busquedaIzqSuperiorADerInferior(posX, posY, jugador, xEnLinea));
        };
        this.busquedaIzqSuperiorADerInferior = (posX, posY, jugador, xEnLinea) => {
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
                    if (cont == xEnLinea)
                        return true;
                }
                else {
                    cont = 0;
                }
                posInicial.x++;
                posInicial.y++;
            }
            return false;
        };
        this.busquedaIzqInferiorADerSuperior = (posX, posY, jugador, xEnLinea) => {
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
                }
                else {
                    cont = 0;
                }
                posInicial.x--;
                posInicial.y++;
            }
            return false;
        };
        this.cantCol = cantCol;
        this.cantFil = cantFil;
        this.inicMatriz();
        this.matrizTablero = [];
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
    //obtiene el ancho del tablero canvas
    getWidth() {
        let width = 0;
        for (let i = 0; i < this.cantCol; i++) {
            width += Tablero.CELL_WIDTH;
        }
        return width;
    }
}
Tablero.CELL_WIDTH = 75;
Tablero.CELL_HEIGHT = 72;
//# sourceMappingURL=Tablero.js.map