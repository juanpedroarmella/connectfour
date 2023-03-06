class Tablero {
    constructor(ctx, img, col, fil, posXinicial, posYinicial) {
        this.matrizTablero = [];
        this.col = col;
        this.fil = fil;
        this.inicMatriz();
        this.img = img;
        this.heightImg = 72;
        this.widthImg = 75;
        this.imgTablero = new Image();
        this.posXinicial = posXinicial;
        this.posYinicial = posYinicial;
        this.dibujarTablero(ctx, img, col, fil)
    }

    //Inicia la matriz tablero con valores nulos
    inicMatriz() {
        for (let i = 0; i < this.fil; i++) {
            this.matrizTablero[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.matrizTablero[i][j] = null;
            }
        }
    }

    //Obtiene la medida de la celda de tablero en canvas
    getMedidasImgTablero() {
        let medidas = { height: this.heightImg, width: this.widthImg }
        return medidas;
    }

    //retorna la matriz logica del tablero
    getMatrizTablero() {
        return this.matrizTablero;
    }

    //Dibuja el tablero en las posiciones indicadas, y con la cantidad de columas y filas que vienen por parametro.
    //Si ya se habia dibujado, no precarga la imagen.

    //el bind me permite pasarle el objeto que quiero utilizar en al funcion que lo llama.
    dibujarTablero(ctx, img, col, fil) {
        let posX = this.getPosComienzoTableroX();
        let posY = this.getPosComienzoTableroY();
        if (this.imgTablero.src === "") {
            this.imgTablero.src = img;
            let cargarImagen = function() {
                for (let x = 0; x < fil; x++) {
                    for (let y = 0; y < col; y++) {
                        ctx.drawImage(this.imgTablero, posX, posY, this.widthImg, this.heightImg);
                        posX += 75;
                    }
                    posX = this.getPosComienzoTableroX();
                    posY += 72;
                }
                posY = this.getPosComienzoTableroY();
            }
            this.imgTablero.onload = cargarImagen.bind(this);
        } else {
            for (let x = 0; x < fil; x++) {
                for (let y = 0; y < col; y++) {
                    ctx.drawImage(this.imgTablero, posX, posY, this.widthImg, this.heightImg);
                    posX += 75;
                }
                posX = this.getPosComienzoTableroX();
                posY += 72;
            }
            posY = this.getPosComienzoTableroY();
        }
    }

    //obtiene el ancho del tablero canvas
    getWidth() {
        let width = 0;
        for (let i = 0; i < this.col; i++) {
            width += 75;
        }
        return width;
    }

    //obtiene el alto del tablero canvas
    getHeight() {
        let height = 0;
        for (let i = 0; i < this.fil; i++) {
            height += 72;
        }
        return height;
    }
    //retorna la posicion X donde se comienza a dibujar el tablero canvas
    getPosComienzoTableroX() {
        return this.posXinicial;
    }

    //retorna la posicion Y donde se comienza a dibujar el tablero canvas
    getPosComienzoTableroY() {
        return this.posYinicial;
    }

    //Coloca el duenio de la ficha en la matriz logica
    colocarFichaMatriz(x, y, jugador) {
        this.matrizTablero[y][x] = jugador;
    }

    //Verifica si hay x en linea
    hayEnLinea(posX, posY, jugador, xEnLinea) {
        return this.busquedaVertical(posX, posY, jugador, xEnLinea) || this.busquedaHorizontal(posY, jugador, xEnLinea) || this.busquedaDiagonal(posX, posY, jugador, xEnLinea);
    }

    //busca si hay x en linea de forma vertical en el tablero
    busquedaVertical(posX, posY, jugador, xEnLinea) {
        //posX estatico, posY busca hacia abajo
        let cont = 0;
        for (let y = posY; y < this.fil; y++) {
            if (this.matrizTablero[y][posX] == jugador) {
                cont++;
                if (cont == xEnLinea)
                    return true
            } else
                cont = 0
        }

        return false
    }

    //busca si hay x en linea de forma horizontal en el tablero
    busquedaHorizontal(posY, jugador, xEnLinea) {
        //posY estatico,posX busca hacia los costados
        //empezando de un borde
        let cont = 0;
        for (let x = 0; x < this.col; x++) {
            if (this.matrizTablero[posY][x] == jugador) {
                cont++;
                if (cont == xEnLinea)
                    return true
            } else
                cont = 0
        }

        return false
    }

    //Busca de las dos formas en diagonal, si existe un X en linea
    busquedaDiagonal(posX, posY, jugador, xEnLinea) {
        return this.busquedaIzqInferiorADerSuperior(posX, posY, jugador, xEnLinea) || this.busquedaIzqSuperiorADerInferior(posX, posY, jugador, xEnLinea);
    }

    //Busca de la esquina izquierda superior empezando desde la posicion de la ficha, hasta la derecha inferior y
    //retorna true si el contado es igual a X en linea.
    busquedaIzqSuperiorADerInferior(posX, posY, jugador, xEnLinea) {

        let posInicial = {
            x: posX,
            y: posY,
        }

        while (posInicial.x > 0 && posInicial.y > 0) {
            posInicial.x--;
            posInicial.y--;
        }
        let cont = 0;
        while (posInicial.x <= this.col && posInicial.y <= this.fil - 1) {
            if (this.matrizTablero[posInicial.y][posInicial.x] == jugador) {
                cont++
                if (cont == xEnLinea)
                    return true;
            } else {
                cont = 0;
           }
            posInicial.x++;
           posInicial.y++;

        }
        return false
    }

    //Busca de la esquina izquierda inferior empezando desde la posicion de la ficha, hasta la derecha Superior y
    //retorna true si el contado es igual a X en linea.
    busquedaIzqInferiorADerSuperior(posX, posY, jugador, xEnLinea) {
        let posInicial = {
            x: posX,
            y: posY,
        }
        let cont = 0;

        while ((posInicial.x >= 0) && (posInicial.y <= this.fil - 1)) {
            if (this.matrizTablero[posInicial.y][posInicial.x] == jugador) {
                cont++
                if (cont == xEnLinea) {
                    return true;
                }

            } else {
                cont = 0;
            }
            posInicial.x--;
            posInicial.y++;
        }
    }
}