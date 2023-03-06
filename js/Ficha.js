const RADIO = 28;
class Ficha {

    constructor(id, img, jugador, posX, posY, ctx, color) {
        this.id = id;
        this.img = img; //Guarda la ruta de la imagen que le paso
        this.imagen = new Image(); //Defino el atributo que sea una iamgen, asi no crea una imagen cada vez que renderiza
        this.pertenece = jugador;
        this.posX = posX;
        this.posY = posY;
        this.resaltado = false;
        this.ctx = ctx;
        this.color = color;
        this.puedeMover = true;
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    setPertenece(jugador) {
        this.pertenece = jugador
    }
    getId() {
        return this.id;
    }
    getPertenece() {
        return this.pertenece;
    }
    getColor() {
        return this.color;
    }
    getImg() {
        return this.img;
    }
    getCtx() {
        return this.ctx;
    }

    //Verifica si una posicion x,y se encuentra dentro de la ficha
    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < RADIO;
    }
    setResaltado(res) {
        this.resaltado = res;
    }

    getPuedeMover() {
        return this.puedeMover;
    }

    setPuedeMover(puedeMover) {
        this.puedeMover = puedeMover;
    }


    //Redibuja la ficha
    renderizar() {
        this.drawFicha(this.posX, this.posY);

    }

    //Dibuja la ficha
    drawFicha(x, y) {
        let imgX = x - 36;
        let imgY = y - 36;
        ctx.beginPath();
        ctx.arc(x, y, RADIO, 0, 2 * Math.PI);
        if (this.img == "") {
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            //this.ctx.closePath();
        } else {
            if (this.imagen.src === "") { //Si la imagen no tiene una foto definida, entra y le setea la foto, lo hace solo a la primera.
                this.imagen.src = this.img; //le seteo en src, la imagen que me pasan por paorametro
                let onloadImage = function() {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, RADIO, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(this.imagen, imgX, imgY, 70, 70);
                    ctx.beginPath();
                    ctx.arc(x, y, RADIO, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.closePath();
                    ctx.restore();
                }
                this.imagen.onload = onloadImage.bind(this); //La funcion .bind(this), recibe el objeto sobre el que estoy parado, o con el que deseo trabajar
                //Trabaja sobre la variable o un elemento que recibe una funcion, como en este caso onloadImage.
                //Si no recibe el objeto this, la funcion asignada a onloadImage no conoce los this. y dara error.


            } else { //Si no es vacio, dibuja el circulo con la foto ya guardada, sin crear una instancia de new Image, cada vez que se dibuje
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, RADIO, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(this.imagen, imgX, imgY, 70, 70);
                ctx.beginPath();
                ctx.arc(x, y, RADIO, 0, 2 * Math.PI);
                ctx.clip();
                ctx.closePath();
                ctx.restore();
            }
        }
        if (this.resaltado === true) {
            this.ctx.strokeStyle = "#262626";
            this.ctx.lineWidth = 7;
            this.ctx.stroke();
        }

    }

}