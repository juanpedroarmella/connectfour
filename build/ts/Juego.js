import { Ficha } from "./Ficha";
import { Tablero } from "./Tablero";
export class Juego {
    constructor(ctx, canvas, jugador1, jugador2, ficha1, ficha2, cantCol, cantFil, bgTablero, xEnLinea) {
        //Invoca los metodos ponerFichas, para dibujar las fichas en las posiciones indicadas
        this.repartirFichas = () => {
            this.darFichas(this.configFichas.ficha1.imgSrc, Juego.inicioXJ1, Juego.inicioY, this.jugadores.jugador1, this.configFichas.ficha1.color);
            this.darFichas(this.configFichas.ficha2.imgSrc, Juego.inicioXJ2, Juego.inicioY, this.jugadores.jugador2, this.configFichas.ficha2.color);
        };
        //Reparte las fichas para un determinado jugador
        this.darFichas = (imgSrc, inicioX, inicioY, jugador, color) => {
            let i = 0;
            let cantFichas = 0;
            const mitadTotalFichas = (this.cantCol * this.cantFil) / 2;
            for (let y = inicioY; cantFichas < mitadTotalFichas; y++) {
                let nuevaFicha = new Ficha(i, imgSrc, jugador, inicioX, inicioY, this.ctx, color);
                nuevaFicha.drawFicha(inicioX, inicioY);
                this.arrFichas.push(nuevaFicha);
                cantFichas++;
                i++;
            }
        };
        //Inicia los metodos necesarios para comenzar el juego
        this.comenzar = (initX, initY) => {
            this.clearCanvas();
            this.tablero = new Tablero(this.ctx, this.bgTablero, this.cantCol, this.cantFil, initX, initY);
            this.drawUserName(this.jugadores.jugador1, Juego.j1NamePosX, Juego.j1NamePosY);
            this.drawUserName(this.jugadores.jugador2, Juego.j2NamePosX, Juego.j2NamePosY);
            this.repartirFichas();
            this.completarPosiciones();
        };
        this.setJugador1 = (jugador1) => {
            this.jugadores.jugador1 = jugador1;
        };
        this.setJugador2 = (jugador2) => {
            this.jugadores.jugador2 = jugador2;
        };
        this.cambiarTurno = () => {
            if (this.turno == this.jugadores.jugador1) {
                this.turno = this.jugadores.jugador2;
            }
            else {
                this.turno = this.jugadores.jugador1;
            }
        };
        this.turnoActual = () => {
            return this.turno;
        };
        //Recorre el arreglo de fichas disponibles y busca sobre cual se hizo click.
        this.buscarFichaClickeada = (x, y) => {
            for (let i = 0; i < this.arrFichas.length; i++) {
                let f = this.arrFichas[i];
                if (f.isPointInside(x, y) &&
                    f.getPuedeMover() &&
                    f.getPertenece() == this.turno) {
                    return f;
                }
            }
        };
        //Si el usuario clickeo una ficha la resalta y luego redibuja el tablero
        this.onMouseDown = (e) => {
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
        this.cursorEnTablero = (e, widthMax, heightMax, minWidth) => {
            return (e.clientX >= minWidth &&
                e.clientX <= widthMax &&
                e.clientY >= 0 &&
                e.clientY <= heightMax);
        };
        //Completa el arreglo posiciones con las posiciones inicial y final de cada celda del tablero
        this.completarPosiciones = () => {
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
        this.onMouseMove = (e) => {
            if (this.isMouseDown && this.ultimaFichaClickeada != null) {
                this.ultimaFichaClickeada.setPosition(e.clientX, e.clientY);
                this.drawFichasYTablero();
            }
        };
        //Obtiene la posicion x de la matriz (a partir de la posicion x del mouse) para colocar la ficha
        this.getPosX = (e) => {
            var _a, _b;
            for (let x = 0; x < this.posiciones.length; x++) {
                if (e.clientX >= (((_a = this.posiciones[x]) === null || _a === void 0 ? void 0 : _a.posX) || 0) &&
                    e.clientX <= (((_b = this.posiciones[x]) === null || _b === void 0 ? void 0 : _b.posX) || 0)) {
                    return x;
                }
            }
            return -1;
        };
        //Obtiene la posicion y de la matriz tablero para colocar la ficha
        this.getPosY = (posX) => {
            let matrizTablero = this.tablero.getMatrizTablero();
            for (let i = this.cantCol - 1; i >= 0; i--) {
                if (matrizTablero[i][posX] == null) {
                    return i;
                }
            }
            return -1; // todas las posiciones en Y estan ocupadas
        };
        this.onMouseOut = () => {
            if (this.ultimaFichaClickeada != null)
                this.retornarFichaAlFichero();
        };
        //Cuando suelta el mouse, se obtiene las posiciones donde colocar la ficha y si es posible colocar al ficha,
        //se comprueba si hay un ganador
        this.onMouseUp = (e) => {
            this.isMouseDown = false;
            let heightMax = 100;
            let widthMax = this.tablero.getWidth() + this.tablero.getPosComienzoTableroX();
            let minWidth = this.tablero.getPosComienzoTableroX();
            if (this.cursorEnTablero(e, widthMax, heightMax, minWidth)) {
                let posX = this.getPosX(e); //devuelve una posicion del arreglo a partir de la posicion del cursor
                let posY = this.getPosY(posX); //devuelve una posicion para Y checkeando la cantidad de fichas que hay colocadas en la matriz
                if (posY != -1 && posX != -1 && this.ultimaFichaClickeada != null) {
                    //si no hay posiciones ocupadas
                    this.tablero.colocarFichaMatriz(posX, posY, this.ultimaFichaClickeada.getPertenece());
                    let turnoActual = this.turno;
                    Juego.turnoHtml.innerHTML = "Turno de " + this.turnoActual();
                    this.colocarFicha(posX, posY); //esto es para el canvas
                    this.cambiarTurno();
                    if (this.tablero.hayEnLinea(posX, posY, turnoActual, this.xEnLinea)) {
                        this.mostrarGanador(turnoActual);
                        this.turno = "";
                        this.stopIntervalTimer(this.interval);
                    }
                }
                else {
                    if (this.ultimaFichaClickeada != null)
                        this.retornarFichaAlFichero();
                }
            }
            else {
                if (this.ultimaFichaClickeada != null)
                    this.retornarFichaAlFichero();
            }
        };
        this.retornarFichaAlFichero = () => {
            var _a, _b;
            if (this.turno == this.jugadores.jugador1) {
                (_a = this.ultimaFichaClickeada) === null || _a === void 0 ? void 0 : _a.setPosition(Juego.inicioXJ1, Juego.inicioY);
                this.drawFichasYTablero();
            }
            else {
                (_b = this.ultimaFichaClickeada) === null || _b === void 0 ? void 0 : _b.setPosition(Juego.inicioXJ2, Juego.inicioY);
                this.drawFichasYTablero();
            }
        };
        //Muestra en el html si hay un ganador
        this.mostrarGanador = (ganador) => {
            var _a;
            const pGanador = document.getElementById("showGanador");
            pGanador.innerHTML = ganador;
            (_a = document.getElementById("ganador")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        };
        this.colocarFicha = (x, y) => {
            let medidasCelda = this.tablero.getMedidaCelda();
            let valorX = this.posiciones[x];
            if (valorX && this.ultimaFichaClickeada) {
                let posX = (valorX.posX + valorX.posY) / 2;
                let posY = this.tablero.getPosComienzoTableroY() + y * medidasCelda.height + 37;
                let newFicha = new Ficha(this.ultimaFichaClickeada.getId(), this.ultimaFichaClickeada.getImgSrc(), this.ultimaFichaClickeada.getPertenece(), posX, posY, this.ultimaFichaClickeada.getCtx(), this.ultimaFichaClickeada.getColor());
                let result = this.removeFichaFromArr(this.ultimaFichaClickeada);
                this.arrFichas = result;
                this.arrFichas.push(newFicha);
                newFicha.setResaltado(false);
                this.drawFichasYTablero();
                newFicha.setPuedeMover(false);
            }
        };
        //remueve la ficha del arreglo de fichas
        this.removeFichaFromArr = (ficha) => this.arrFichas.filter((ele) => ele.getId() != ficha.getId() ||
            ele.getPertenece() != ficha.getPertenece());
        this.drawFondo = () => {
            const fondo = "../img/fondo.jpg";
            const imgFondo = new Image();
            imgFondo.src = fondo;
        };
        //Dibuja el tablero, las fichas, y los nombres de los jguadores
        this.drawFichasYTablero = () => {
            this.clearCanvas();
            this.drawFichas();
            this.drawUserName(this.jugadores.jugador1, Juego.j1NamePosX, Juego.j1NamePosY);
            this.drawUserName(this.jugadores.jugador2, Juego.j2NamePosX, Juego.j2NamePosY);
        };
        //Dibuja las fichas
        this.drawFichas = () => {
            for (let i = 0; i < this.arrFichas.length; i++) {
                this.arrFichas[i].renderizar();
            }
        };
        //dibuja el nombre del jugador
        this.drawUserName = (jugador, x, y) => {
            this.ctx.fillStyle = "white";
            this.ctx.font = "600  25px Roboto";
            this.ctx.fillText(jugador, x, y);
        };
        this.getTablero = () => {
            return this.tablero;
        };
        this.consultaJugadoresVacios = () => {
            if (this.jugadores.jugador1 == "") {
                this.jugadores.jugador1 = "Jugador 1";
            }
            if (this.jugadores.jugador2 == "") {
                this.jugadores.jugador2 = "Jugador 2";
            }
        };
        //Inicia el juego y el reloj
        this.comenzarJuego = (posXTablero, posYTablero) => {
            this.jugadores.jugador1 = (document === null || document === void 0 ? void 0 : document.getElementById("nombreJugador1")).value;
            this.jugadores.jugador2 = (document === null || document === void 0 ? void 0 : document.getElementById("nombreJugador2")).value;
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
                }
                else {
                    Juego.timeOver.classList.remove("hidden");
                    this.turno = "";
                    this.stopIntervalTimer(this.interval);
                }
            }, 1000);
        };
        //Muestra el pop-up de configuracion inicial del juego.
        this.showPopUp = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            (_a = document.getElementById("pop-up")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            (_b = document.getElementById("tablero")) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
            (_c = document.getElementById("jugadores")) === null || _c === void 0 ? void 0 : _c.classList.remove("hidden");
            (_d = document.getElementById("personalizar")) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
            (_e = document.getElementById("formatos")) === null || _e === void 0 ? void 0 : _e.classList.remove("hidden");
            (_f = document.getElementById("imagen")) === null || _f === void 0 ? void 0 : _f.classList.remove("hidden");
            (_g = document.getElementById("color")) === null || _g === void 0 ? void 0 : _g.classList.remove("hidden");
            (_h = document.getElementById("verImagenes")) === null || _h === void 0 ? void 0 : _h.classList.remove("hidden");
            (_j = document.getElementById("verColores")) === null || _j === void 0 ? void 0 : _j.classList.remove("hidden");
            (_k = document.getElementById("elegirImagen1")) === null || _k === void 0 ? void 0 : _k.classList.add("hidden");
            (_l = document.getElementById("elegirImagen2")) === null || _l === void 0 ? void 0 : _l.classList.add("hidden");
            (_m = document.getElementById("elegirColor1")) === null || _m === void 0 ? void 0 : _m.classList.add("hidden");
            (_o = document.getElementById("elegirColor2")) === null || _o === void 0 ? void 0 : _o.classList.add("hidden");
            (_p = document.getElementById("leagueOfLegends")) === null || _p === void 0 ? void 0 : _p.classList.add("hidden");
            (_q = document.getElementById("naruto")) === null || _q === void 0 ? void 0 : _q.classList.add("hidden");
            (_r = document.getElementById("harryPotter")) === null || _r === void 0 ? void 0 : _r.classList.add("hidden");
            (_s = document.getElementById("green")) === null || _s === void 0 ? void 0 : _s.classList.add("hidden");
            (_t = document.getElementById("red")) === null || _t === void 0 ? void 0 : _t.classList.add("hidden");
            (_u = document.getElementById("blue")) === null || _u === void 0 ? void 0 : _u.classList.add("hidden");
            (_v = document.getElementById("ganador")) === null || _v === void 0 ? void 0 : _v.classList.add("hidden");
            (_w = document.getElementById("timerOver")) === null || _w === void 0 ? void 0 : _w.classList.add("hidden");
        };
        //detiene el timer
        this.stopIntervalTimer = (interval) => {
            clearInterval(interval);
        };
        //Convierte un valor entero en formato minutos segund
        this.convertMinSec = (value) => {
            let minutes = Math.floor(value / 60);
            let seconds = value - minutes * 60;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ":" + seconds;
        };
        this.ctx = ctx;
        this.canvas = canvas;
        this.jugadores.jugador1 = jugador1;
        this.jugadores.jugador2 = jugador2;
        this.configFichas.ficha1 = ficha1;
        this.configFichas.ficha2 = ficha2;
        this.cantCol = cantCol;
        this.cantFil = cantFil;
        this.bgTablero = bgTablero;
        this.isMouseDown = false;
        this.xEnLinea = xEnLinea;
        this.repartirFichas();
        this.timer = Juego.totalTime;
    }
    //borra el canvas
    clearCanvas() {
        this.ctx.fillStyle = "#05223c";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //esconde un elemento del html
    closePopUp() {
        var _a;
        (_a = document.getElementById("pop-up")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    }
}
Juego.inicioXJ1 = 125;
Juego.inicioXJ2 = 1250;
Juego.inicioY = 500;
Juego.totalTime = 5 * 60;
Juego.turnoHtml = document.getElementById("turno");
Juego.j1NamePosX = 105;
Juego.j1NamePosY = 400;
Juego.j2NamePosX = 1200;
Juego.j2NamePosY = 400;
Juego.timeOver = document.getElementById("timerOver");
Juego.reloj = document.getElementById("timer");
//# sourceMappingURL=Juego.js.map