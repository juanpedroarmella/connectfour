export class Ficha {
    constructor(id, imgSrc, jugador, posX, posY, ctx, color) {
        this.setPosition = (x, y) => {
            this.posX = x;
            this.posY = y;
        };
        this.getId = () => {
            return this.id;
        };
        this.getPertenece = () => {
            return this.pertenece;
        };
        this.getColor = () => {
            return this.color;
        };
        this.getImgSrc = () => {
            return this.imgSrc;
        };
        this.getCtx = () => {
            return this.ctx;
        };
        //Verifica si una posicion x,y se encuentra dentro de la ficha
        this.isPointInside = (x, y) => {
            const _x = this.posX - x;
            const _y = this.posY - y;
            return Math.sqrt(_x * _x + _y * _y) < Ficha.RADIO;
        };
        this.setResaltado = (res) => {
            this.resaltado = res;
        };
        this.getPuedeMover = () => {
            return this.puedeMover;
        };
        this.setPuedeMover = (puedeMover) => {
            this.puedeMover = puedeMover;
        };
        //Redibuja la ficha
        this.renderizar = () => {
            this.drawFicha(this.posX, this.posY);
        };
        this.drawImage = (x, y) => {
            const imgX = x - 36;
            const imgY = y - 36;
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x, y, Ficha.RADIO, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(this.img, imgX, imgY, 70, 70);
            this.ctx.beginPath();
            this.ctx.arc(x, y, Ficha.RADIO, 0, 2 * Math.PI);
            this.ctx.clip();
            this.ctx.closePath();
            this.ctx.restore();
        };
        this.resaltarFicha = () => {
            this.ctx.strokeStyle = "#262626";
            this.ctx.lineWidth = 7;
            this.ctx.stroke();
        };
        this.pintarFicha = () => {
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        };
        //Dibuja la ficha
        this.drawFicha = (x, y) => {
            this.ctx.beginPath();
            this.ctx.arc(x, y, Ficha.RADIO, 0, 2 * Math.PI);
            if (this.imgSrc == null) {
                this.pintarFicha();
            }
            else {
                if (this.img.src === "") {
                    this.img.src = this.imgSrc;
                    const onloadImage = () => {
                        this.drawImage(x, y);
                    };
                    this.img.onload = onloadImage.bind(this);
                }
                else {
                    this.drawImage(x, y);
                }
            }
            if (this.resaltado === true) {
                this.resaltarFicha();
            }
        };
        this.id = id;
        this.imgSrc = imgSrc; //Guarda la ruta de la imagen que le paso
        this.img = new Image(); //Defino el atributo que sea una iamgen, asi no crea una imagen cada vez que renderiza
        this.pertenece = jugador;
        this.posX = posX;
        this.posY = posY;
        this.resaltado = false;
        this.ctx = ctx;
        this.color = color;
        this.puedeMover = true;
    }
    setPertenece(jugador) {
        this.pertenece = jugador;
    }
}
Ficha.RADIO = 28;
//# sourceMappingURL=Ficha.js.map