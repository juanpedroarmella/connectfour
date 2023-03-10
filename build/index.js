import { MainMenu } from "./ts/MainMenu";
export class Index {
    constructor() {
        new MainMenu(Index.canvas, Index.imgTablero);
    }
}
Index.canvas = document.getElementById("myCanvas");
Index.imgTablero = "./../../public/celda.png";
new Index();
//# sourceMappingURL=index.js.map