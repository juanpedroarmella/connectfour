"use strict";
exports.__esModule = true;
exports.Index = void 0;
var MainMenu_1 = require("./ts/MainMenu");
var Index = /** @class */ (function () {
    function Index() {
        new MainMenu_1.MainMenu(Index.canvas, Index.imgTablero);
    }
    Index.canvas = document.getElementById("myCanvas");
    Index.imgTablero = "./../../public/celda.png";
    return Index;
}());
exports.Index = Index;
new Index();
