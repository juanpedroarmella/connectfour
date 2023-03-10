var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class EventData {
    constructor(main) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        this.showChooseImg = () => {
            var _a, _b, _c, _d, _e;
            (_a = document === null || document === void 0 ? void 0 : document.getElementById("color")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            (_b = document === null || document === void 0 ? void 0 : document.getElementById("formatos")) === null || _b === void 0 ? void 0 : _b.classList.toggle("hidden");
            (_c = document === null || document === void 0 ? void 0 : document.getElementById("elegirImagen1")) === null || _c === void 0 ? void 0 : _c.classList.toggle("hidden");
            (_d = document === null || document === void 0 ? void 0 : document.getElementById("imagen")) === null || _d === void 0 ? void 0 : _d.classList.toggle("hidden");
            (_e = document === null || document === void 0 ? void 0 : document.getElementById("elegirImagen2")) === null || _e === void 0 ? void 0 : _e.classList.toggle("hidden");
        };
        this.showChooseColors = () => {
            var _a, _b, _c, _d, _e, _f;
            (_a = document === null || document === void 0 ? void 0 : document.getElementById("imagen")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            (_b = document === null || document === void 0 ? void 0 : document.getElementById("color")) === null || _b === void 0 ? void 0 : _b.classList.toggle("hidden");
            (_c = document === null || document === void 0 ? void 0 : document.getElementById("formatos")) === null || _c === void 0 ? void 0 : _c.classList.toggle("hidden");
            (_d = document === null || document === void 0 ? void 0 : document.getElementById("elegirColor1")) === null || _d === void 0 ? void 0 : _d.classList.toggle("hidden");
            (_e = document === null || document === void 0 ? void 0 : document.getElementById("elegirColor2")) === null || _e === void 0 ? void 0 : _e.classList.toggle("hidden");
            (_f = document.getElementById("alertColoresIguales")) === null || _f === void 0 ? void 0 : _f.classList.remove("hidden");
        };
        this.showChooseDefaultImg = () => {
            var _a, _b, _c, _d, _e, _f;
            (_a = document === null || document === void 0 ? void 0 : document.getElementById("verImagenes")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            (_b = document === null || document === void 0 ? void 0 : document.getElementById("verColores")) === null || _b === void 0 ? void 0 : _b.classList.toggle("hidden");
            (_c = document === null || document === void 0 ? void 0 : document.getElementById("personalizar")) === null || _c === void 0 ? void 0 : _c.classList.toggle("hidden");
            (_d = document === null || document === void 0 ? void 0 : document.getElementById("leagueOfLegends")) === null || _d === void 0 ? void 0 : _d.classList.toggle("hidden");
            (_e = document === null || document === void 0 ? void 0 : document.getElementById("naruto")) === null || _e === void 0 ? void 0 : _e.classList.toggle("hidden");
            (_f = document === null || document === void 0 ? void 0 : document.getElementById("harryPotter")) === null || _f === void 0 ? void 0 : _f.classList.toggle("hidden");
        };
        this.showChooseDefaultColors = () => {
            var _a, _b, _c, _d, _e, _f;
            (_a = document === null || document === void 0 ? void 0 : document.getElementById("verImagenes")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            (_b = document === null || document === void 0 ? void 0 : document.getElementById("verColores")) === null || _b === void 0 ? void 0 : _b.classList.toggle("hidden");
            (_c = document === null || document === void 0 ? void 0 : document.getElementById("personalizar")) === null || _c === void 0 ? void 0 : _c.classList.toggle("hidden");
            (_d = document === null || document === void 0 ? void 0 : document.getElementById("red")) === null || _d === void 0 ? void 0 : _d.classList.toggle("hidden");
            (_e = document === null || document === void 0 ? void 0 : document.getElementById("green")) === null || _e === void 0 ? void 0 : _e.classList.toggle("hidden");
            (_f = document === null || document === void 0 ? void 0 : document.getElementById("blue")) === null || _f === void 0 ? void 0 : _f.classList.toggle("hidden");
        };
        this.obtenerRutaArchivo = (e) => {
            return new Promise((resolve) => {
                var _a, _b;
                let reader = new FileReader();
                let fileReader = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                if (fileReader) {
                    reader.readAsDataURL(fileReader);
                    reader.onloadend = (event) => {
                        var _a;
                        const archivo = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                        resolve(archivo);
                    };
                }
            });
        };
        // Pinta de verde el botón que se seleccionó y de gris los botones hermanos no seleccionados
        this.marcarBtnSeleccionado = (btn) => {
            const padre = btn.parentNode;
            if (padre.hasChildNodes()) {
                const hijos = padre.childNodes;
                let i = 0;
                while (i < hijos.length) {
                    const hijo = hijos[i];
                    if (hijo.id && hijo.id !== btn.id && hijo.nodeName === "BUTTON") {
                        hijo.classList.add("noSelected");
                    }
                    else {
                        btn.classList.remove("noSelected");
                        btn.classList.add("selected");
                    }
                    i++;
                }
            }
        };
        this.setImagesPredefinidas = (btn, img1, img2, main) => {
            this.marcarBtnSeleccionado(btn);
            main.setImgFicha1(img1);
            main.setColorFicha1(null);
            main.setImgFicha2(img2);
            main.setColorFicha2(null);
        };
        this.setColor = (btn, main, color1, color2) => {
            this.marcarBtnSeleccionado(btn);
            if (color1) {
                main.setImgFicha1(null);
                main.setColorFicha1(color1);
            }
            if (color2) {
                main.setImgFicha2(null);
                main.setColorFicha2(color2);
            }
        };
        this.marcarCuatroEnLinea = (btn, main) => {
            this.marcarBtnSeleccionado(btn);
            main.setCuatroEnLinea();
        };
        this.main = main;
        this.marcarCuatroEnLinea(document.getElementById("4linea"), main); //setea el modo 4 en linea por default
        (_a = document
            .getElementById("elegirImagen1")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (e) => __awaiter(this, void 0, void 0, function* () {
            main.setImgFicha1(yield this.obtenerRutaArchivo(e));
            main.setColorFicha1(null);
        }));
        (_b = document
            .getElementById("elegirImagen2")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => __awaiter(this, void 0, void 0, function* () {
            main.setImgFicha1(yield this.obtenerRutaArchivo(e));
            main.setColorFicha2(null);
        }));
        (_c = document
            .getElementById("leagueOfLegends")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => this.setImagesPredefinidas(e.target, "./../../public/anivia.jfif", "./../../public/gnar.jfif", main));
        (_d = document
            .getElementById("naruto")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => this.setImagesPredefinidas(e.target, "./../../public/naruto.jfif", "./../../public/sasuke.jfif", main));
        (_e = document
            .getElementById("harryPotter")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (e) => this.setImagesPredefinidas(e.target, "./../../public/harryPotter.jfif", "./../../public/voldemort.jfif", main));
        (_f = document
            .getElementById("red")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (e) => this.setColor(e.target, main, "red", "black"));
        (_g = document
            .getElementById("blue")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", (e) => this.setColor(e.target, main, "green", "violet"));
        (_h = document
            .getElementById("blue")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", (e) => this.setColor(e.target, main, "blue", "yellow"));
        (_j = document
            .getElementById("elegirColor1")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", (e) => this.setColor(e.target, main, e.target.value, undefined));
        (_k = document
            .getElementById("elegirColor2")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", (e) => this.setColor(e.target, main, undefined, e.target.value));
        (_l = document.getElementById("4linea")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", (e) => {
            this.marcarCuatroEnLinea(e.target, main);
        });
        (_m = document.getElementById("5linea")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", (e) => {
            this.marcarBtnSeleccionado(e.target);
            main.setCincoEnLinea();
        });
        (_o = document.getElementById("6linea")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", (e) => {
            this.marcarBtnSeleccionado(e.target);
            main.setSeisEnLinea();
        });
        (_p = document.getElementById("7linea")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", (e) => {
            this.marcarBtnSeleccionado(e.target);
            main.setSieteEnLinea();
        });
        (_q = document === null || document === void 0 ? void 0 : document.getElementById("imagen")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", this.showChooseImg);
        (_r = document === null || document === void 0 ? void 0 : document.getElementById("color")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", this.showChooseColors);
        (_s = document === null || document === void 0 ? void 0 : document.getElementById("verImagenes")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", this.showChooseDefaultImg);
        (_t = document === null || document === void 0 ? void 0 : document.getElementById("verColores")) === null || _t === void 0 ? void 0 : _t.addEventListener("click", this.showChooseDefaultColors);
        (_u = document === null || document === void 0 ? void 0 : document.getElementById("reiniciarJuego")) === null || _u === void 0 ? void 0 : _u.addEventListener("click", this.main.reiniciar);
        (_v = document === null || document === void 0 ? void 0 : document.getElementById("reiniciarJuego2")) === null || _v === void 0 ? void 0 : _v.addEventListener("click", this.main.reiniciar);
        (_w = document === null || document === void 0 ? void 0 : document.getElementById("reiniciarJuego3")) === null || _w === void 0 ? void 0 : _w.addEventListener("click", this.main.reiniciar);
    }
}
//# sourceMappingURL=EventData.js.map