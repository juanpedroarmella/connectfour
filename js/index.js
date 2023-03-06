let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imgTablero = './img/celda.png';

let filas = 0;
let columnas = 0;
let xEnLinea = 0;
let juego = new Juego(ctx, canvas);
let jugador1 = "";
let jugador2 = "";
let imgFicha1 = "";
let imgFicha2 = "";
let colorImg1 = "";
let colorImg2 = "";
let canvasHeight = 850;
let reloj = document.getElementById("timer");
let posInicialTableroX;
let posInicialTableroY;
juego.clearCanvas();

let img1 = document.getElementById('elegirImagen1');
img1.addEventListener('change', obtenerRuta);
//obtiene la ruta del archivo que se selecciono 
function obtenerRuta(event) {
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event) => {
        imgFicha1 = event.target.result;

    }
}

let img2 = document.getElementById('elegirImagen2');
img2.addEventListener('change', obtenerRuta2);

//obtiene la ruta del archivo que se selecciono 
function obtenerRuta2(event) {
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event) => {
        imgFicha2 = event.target.result;
    }
}

let lol = document.getElementById('leagueOfLegends');
lol.addEventListener('click', () => {
    marcarSeleccionado(lol.parentNode, lol)
    imgFicha1 = "./img/anivia.jfif"
    imgFicha2 = "./img/gnar.jfif"
    colorImg1 = ""
    colorImg2 = ""

});
let naruto = document.getElementById('naruto');
naruto.addEventListener('click', () => {
    marcarSeleccionado(naruto.parentNode, naruto)
    imgFicha1 = "./img/naruto.jfif"
    imgFicha2 = "./img/sasuke.jfif"
    colorImg1 = ""
    colorImg2 = ""
});
let harryPotter = document.getElementById('harryPotter');
harryPotter.addEventListener('click', () => {
    marcarSeleccionado(harryPotter.parentNode, harryPotter)
    imgFicha1 = "./img/harryPotter.jfif"
    imgFicha2 = "./img/voldemort.jfif"
    colorImg1 = ""
    colorImg2 = ""
});


let red = document.getElementById('red');
red.addEventListener('click', () => {
    marcarSeleccionado(red.parentNode, red)
    colorImg1 = "red"
    colorImg2 = "black"
    imgFicha1 = ""
    imgFicha2 = ""

});
let green = document.getElementById('green');
green.addEventListener('click', () => {
    marcarSeleccionado(green.parentNode, green)
    colorImg1 = "green"
    colorImg2 = "violet"
    imgFicha1 = ""
    imgFicha2 = ""
});
let blue = document.getElementById('blue');
blue.addEventListener('click', () => {
    marcarSeleccionado(blue.parentNode, blue)
    colorImg1 = "blue"
    colorImg2 = "yellow"
    imgFicha1 = ""
    imgFicha2 = ""
});
let alertColoresIguales = document.getElementById("alertColoresIguales");
let colorPersonalizado1 = document.getElementById("elegirColor1");
colorPersonalizado1.addEventListener("change", () => {
    colorImg1 = colorPersonalizado1.value;
    colorImg2 = colorPersonalizado2.value;
    imgFicha1 = ""
    imgFicha2 = ""

})
let colorPersonalizado2 = document.getElementById("elegirColor2");
colorPersonalizado2.addEventListener("change", () => {
    colorImg2 = colorPersonalizado2.value;
    colorImg1 = colorPersonalizado1.value;
    imgFicha1 = ""
    imgFicha2 = ""

})

//Pinta de verde el boton que se selecciono y de gris los botones hermanos no seleccionados
function marcarSeleccionado(padre, elemento) {
    if (padre.hasChildNodes()) {
        let hijos = padre.childNodes;
        let i = 0;
        while (i < hijos.length) {
            if (hijos[i].id != elemento.id && hijos[i].nodeName == "BUTTON") {
                hijos[i].classList.add("noSelected");
            } else {
                elemento.classList.remove("noSelected");
                elemento.classList.add("selected");
            }
            i++;
        }
    }
}

let cuatroEnLinea = document.getElementById('4linea');
cuatroEnLinea.addEventListener('click', () => {
    marcarSeleccionado(cuatroEnLinea.parentNode, cuatroEnLinea);
    posInicialTableroX = 500;
    posInicialTableroY = 100;
    canvasHeight = 650;
    columnas = 7;
    filas = 6;
    xEnLinea = 4;
})
let cincoEnLinea = document.getElementById('5linea');
cincoEnLinea.addEventListener('click', () => {
    marcarSeleccionado(cincoEnLinea.parentNode, cincoEnLinea)
    posInicialTableroX = 400;
    posInicialTableroY = 100;
    canvasHeight = 700;
    columnas = 8;
    filas = 7;
    xEnLinea = 5;
})
let seisEnLinea = document.getElementById('6linea');
seisEnLinea.addEventListener('click', () => {
    marcarSeleccionado(seisEnLinea.parentNode, seisEnLinea)
    posInicialTableroX = 400;
    posInicialTableroY = 70;
    canvasHeight = 760;
    columnas = 9;
    filas = 8;
    xEnLinea = 6;
})
let sieteEnLinea = document.getElementById('7linea');
sieteEnLinea.addEventListener('click', () => {
    marcarSeleccionado(sieteEnLinea.parentNode, sieteEnLinea)
    posInicialTableroX = 400;
    posInicialTableroY = 70;
    canvasHeight = 850;
    columnas = 10;
    filas = 9;
    xEnLinea = 7;
})


canvas.addEventListener("mouseout", function(e) {
    if (juego.getTablero() != null) {
        juego.onMouseOut(e);
    }
});
canvas.addEventListener("mousedown", function(e) {
    if (juego.getTablero() != null) {
        juego.onMouseDown(e);
    }
});

canvas.addEventListener("mousemove", function(e) {
    if (juego.getTablero() != null) {
        juego.onMouseMove(e);
    }
});

canvas.addEventListener("mouseup", function(e) {
    if (juego.getTablero() != null) {
        juego.onMouseUp(e);
    }

});

document.getElementById("imagen").addEventListener('click', mostrarModalImagen);
//Muestra la seccion para elegir imagenes locales. y oculta el resto de opciones.
function mostrarModalImagen() {
    document.getElementById("imagen").classList.toggle("hidden");
    document.getElementById("color").classList.toggle("hidden");
    document.getElementById("formatos").classList.toggle("hidden");
    document.getElementById("elegirImagen1").classList.toggle("hidden");
    document.getElementById("elegirImagen2").classList.toggle("hidden");
}

document.getElementById("color").addEventListener('click', mostrarModalColor);
//Muestra la seccion para elegir colores desde la paleta de colores. y oculta el resto de opciones.
function mostrarModalColor() {
    document.getElementById("imagen").classList.toggle("hidden");
    document.getElementById("color").classList.toggle("hidden");
    document.getElementById("formatos").classList.toggle("hidden");
    document.getElementById("elegirColor1").classList.toggle("hidden");
    document.getElementById("elegirColor2").classList.toggle("hidden");
    colorImg1 = colorPersonalizado1.value;
    colorImg2 = colorPersonalizado2.value;
    alertColoresIguales.classList.remove("hidden");
}

document.getElementById("verImagenes").addEventListener('click', mostrarFormatosImagenes);
//Muestra la seccion para elegir imagenes precargadas y asi cambiar el formato de las fichas. y oculta el resto de opciones.
function mostrarFormatosImagenes() {
    document.getElementById("verImagenes").classList.toggle("hidden");
    document.getElementById("verColores").classList.toggle("hidden");
    document.getElementById("personalizar").classList.toggle("hidden");
    document.getElementById("leagueOfLegends").classList.toggle("hidden");
    document.getElementById("naruto").classList.toggle("hidden");
    document.getElementById("harryPotter").classList.toggle("hidden");

}

document.getElementById("verColores").addEventListener('click', mostrarFormatosColores);
//Muestra la seccion para elegir colores precargados y asi cambiar el formato de las fichas. y oculta el resto de opciones.
function mostrarFormatosColores() {
    document.getElementById("verImagenes").classList.toggle("hidden");
    document.getElementById("verColores").classList.toggle("hidden");
    document.getElementById("personalizar").classList.toggle("hidden");
    document.getElementById("red").classList.toggle("hidden");
    document.getElementById("green").classList.toggle("hidden");
    document.getElementById("blue").classList.toggle("hidden");
}

document.getElementById("reiniciarJuego").addEventListener("click", reiniciar);
document.getElementById("reiniciarJuego2").addEventListener("click", reiniciar);
document.getElementById("reiniciarJuego3").addEventListener("click", reiniciar);
//Reinicia el juego al darle click al boton con id reiniciar juego
function reiniciar() {
    colorImg1 = ""
    colorImg2 = ""
    imgFicha1 = ""
    imgFicha2 = ""
    juego.reiniciarJuego(reloj);
}

let comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", comenzarJuego);
//Comienzo un nuevo juego
function comenzarJuego() {
    alertColoresIguales.classList.add("hidden");
    juego.comenzarJuego(imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2, xEnLinea, posInicialTableroX, posInicialTableroY);

}