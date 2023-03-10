import { Juego } from "./Juego";
import { EventData } from "./EventData";
export class MainMenu {
    constructor(canvas, imgTablero) {
        this.nuevoJuego = () => {
            this.juego = new Juego(this.ctx, this.canvas, this.jugador1, this.jugador2, { color: this.colorFicha1, imgSrc: this.imgFicha1 }, { color: this.colorFicha2, imgSrc: this.imgFicha2 }, this.filas, this.columnas, this.imgTablero, this.xEnLinea);
        };
        this.setImgFicha1 = (img) => {
            this.imgFicha1 = img;
        };
        this.setImgFicha2 = (img) => {
            this.imgFicha2 = img;
        };
        this.setColorFicha1 = (color) => {
            this.colorFicha1 = color;
        };
        this.setColorFicha2 = (color) => {
            this.colorFicha2 = color;
        };
        this.setCuatroEnLinea = () => {
            this.posInicialTableroX = 500;
            this.posInicialTableroY = 100;
            this.canvasHeight = 650;
            this.columnas = 7;
            this.filas = 6;
            this.xEnLinea = 4;
        };
        this.setCincoEnLinea = () => {
            this.posInicialTableroX = 400;
            this.posInicialTableroY = 100;
            this.canvasHeight = 700;
            this.columnas = 8;
            this.filas = 7;
            this.xEnLinea = 5;
        };
        this.setSeisEnLinea = () => {
            this.posInicialTableroX = 400;
            this.posInicialTableroY = 70;
            this.canvasHeight = 760;
            this.columnas = 9;
            this.filas = 8;
            this.xEnLinea = 6;
        };
        this.setSieteEnLinea = () => {
            this.posInicialTableroX = 400;
            this.posInicialTableroY = 70;
            this.canvasHeight = 850;
            this.columnas = 10;
            this.filas = 9;
            this.xEnLinea = 7;
        };
        this.CanvasEvents = () => {
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
        this.reiniciar = () => {
            this.colorFicha1 = null;
            this.colorFicha1 = null;
            this.imgFicha1 = null;
            this.imgFicha2 = null;
            this.nuevoJuego();
        };
        this.comenzarJuego = () => {
            var _a;
            (_a = document === null || document === void 0 ? void 0 : document.getElementById("alertColoresIguales")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
            this.juego.comenzarJuego(this.posInicialTableroX, this.posInicialTableroY);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.imgTablero = imgTablero;
        new EventData(this);
        this.juego.clearCanvas();
        this.nuevoJuego();
    }
}
//# sourceMappingURL=MainMenu.js.map