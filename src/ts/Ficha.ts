export class Ficha {
  private static RADIO: number = 28;
  private id: number;
  private imgSrc: string;
  private img: HTMLImageElement;
  private pertenece: string;
  private posX: number;
  private posY: number;
  private resaltado: boolean;
  private ctx: CanvasRenderingContext2D;
  private color: string;
  private puedeMover: boolean;

  public constructor(
    id: number,
    imgSrc: string,
    jugador: string,
    posX: number,
    posY: number,
    ctx: CanvasRenderingContext2D,
    color: string
  ) {
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
  public setPosition = (x: number, y: number) => {
    this.posX = x;
    this.posY = y;
  };
  public setPertenece(jugador: string) {
    this.pertenece = jugador;
  }
  public getId = () => {
    return this.id;
  };
  public getPertenece = () => {
    return this.pertenece;
  };
  public getColor = () => {
    return this.color;
  };
  public getImgSrc = () => {
    return this.imgSrc;
  };
  public getCtx = () => {
    return this.ctx;
  };

  //Verifica si una posicion x,y se encuentra dentro de la ficha
  public isPointInside = (x: number, y: number) => {
    const _x = this.posX - x;
    const _y = this.posY - y;
    return Math.sqrt(_x * _x + _y * _y) < Ficha.RADIO;
  };

  public setResaltado = (res: boolean) => {
    this.resaltado = res;
  };

  public getPuedeMover = () => {
    return this.puedeMover;
  };

  public setPuedeMover = (puedeMover: boolean) => {
    this.puedeMover = puedeMover;
  };

  //Redibuja la ficha
  public renderizar = () => {
    this.drawFicha(this.posX, this.posY);
  };

  private drawImage = (x: number, y: number) => {
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

  private resaltarFicha = () => {
    this.ctx.strokeStyle = "#262626";
    this.ctx.lineWidth = 7;
    this.ctx.stroke();
  };

  private pintarFicha = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  };

  //Dibuja la ficha
  public drawFicha = (x: number, y: number) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, Ficha.RADIO, 0, 2 * Math.PI);
    if (this.imgSrc == null) {
      this.pintarFicha();
    } else {
      if (this.img.src === "") {
        this.img.src = this.imgSrc;
        const onloadImage = () => {
          this.drawImage(x, y);
        };
        this.img.onload = onloadImage.bind(this);
      } else {
        this.drawImage(x, y);
      }
    }
    if (this.resaltado === true) {
      this.resaltarFicha();
    }
  };
}
