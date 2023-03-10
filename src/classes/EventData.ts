import MainMenu from "./MainMenu";

export default class EventData {
  private main: MainMenu;

  constructor(main: MainMenu) {
    this.main = main;
    this.marcarCuatroEnLinea(
      document.getElementById("4linea") as HTMLButtonElement,
      main
    ); //setea el modo 4 en linea por default

    document
      .getElementById("elegirImagen1")
      ?.addEventListener("change", async (e) => {
        main.setImgFicha1(await this.obtenerRutaArchivo(e));
        main.setColorFicha1(null);
      });

    document
      .getElementById("elegirImagen2")
      ?.addEventListener("change", async (e) => {
        main.setImgFicha1(await this.obtenerRutaArchivo(e));
        main.setColorFicha2(null);
      });

    document
      .getElementById("leagueOfLegends")
      ?.addEventListener("click", (e) =>
        this.setImagesPredefinidas(
          e.target as HTMLButtonElement,
          "./../../public/anivia.jfif",
          "./../../public/gnar.jfif",
          main
        )
      );

    document
      .getElementById("naruto")
      ?.addEventListener("click", (e) =>
        this.setImagesPredefinidas(
          e.target as HTMLButtonElement,
          "./../../public/naruto.jfif",
          "./../../public/sasuke.jfif",
          main
        )
      );

    document
      .getElementById("harryPotter")
      ?.addEventListener("click", (e) =>
        this.setImagesPredefinidas(
          e.target as HTMLButtonElement,
          "./../../public/harryPotter.jfif",
          "./../../public/voldemort.jfif",
          main
        )
      );

    document
      .getElementById("red")
      ?.addEventListener("click", (e) =>
        this.setColor(e.target as HTMLButtonElement, main, "red", "black")
      );
    document
      .getElementById("blue")
      ?.addEventListener("click", (e) =>
        this.setColor(e.target as HTMLButtonElement, main, "green", "violet")
      );

    document
      .getElementById("blue")
      ?.addEventListener("click", (e) =>
        this.setColor(e.target as HTMLButtonElement, main, "blue", "yellow")
      );

    document
      .getElementById("elegirColor1")
      ?.addEventListener("click", (e) =>
        this.setColor(
          e.target as HTMLButtonElement,
          main,
          (e.target as HTMLButtonElement).value,
          undefined
        )
      );

    document
      .getElementById("elegirColor2")
      ?.addEventListener("click", (e) =>
        this.setColor(
          e.target as HTMLButtonElement,
          main,
          undefined,
          (e.target as HTMLButtonElement).value
        )
      );

    document.getElementById("4linea")?.addEventListener("click", (e) => {
      this.marcarCuatroEnLinea(e.target as HTMLButtonElement, main);
    });

    document.getElementById("5linea")?.addEventListener("click", (e) => {
      this.marcarBtnSeleccionado(e.target as HTMLButtonElement);
      main.setCincoEnLinea();
    });

    document.getElementById("6linea")?.addEventListener("click", (e) => {
      this.marcarBtnSeleccionado(e.target as HTMLButtonElement);
      main.setSeisEnLinea();
    });

    document.getElementById("7linea")?.addEventListener("click", (e) => {
      this.marcarBtnSeleccionado(e.target as HTMLButtonElement);
      main.setSieteEnLinea();
    });

    document
      ?.getElementById("imagen")
      ?.addEventListener("click", this.showChooseImg);
    document
      ?.getElementById("color")
      ?.addEventListener("click", this.showChooseColors);
    document
      ?.getElementById("verImagenes")
      ?.addEventListener("click", this.showChooseDefaultImg);
    document
      ?.getElementById("verColores")
      ?.addEventListener("click", this.showChooseDefaultColors);

    document
      ?.getElementById("reiniciarJuego")
      ?.addEventListener("click", this.main.reiniciar);
    document
      ?.getElementById("reiniciarJuego2")
      ?.addEventListener("click", this.main.reiniciar);
    document
      ?.getElementById("reiniciarJuego3")
      ?.addEventListener("click", this.main.reiniciar);
  }

  private showChooseImg = () => {
    document?.getElementById("color")?.classList.toggle("hidden");
    document?.getElementById("formatos")?.classList.toggle("hidden");
    document?.getElementById("elegirImagen1")?.classList.toggle("hidden");
    document?.getElementById("imagen")?.classList.toggle("hidden");
    document?.getElementById("elegirImagen2")?.classList.toggle("hidden");
  };

  private showChooseColors = () => {
    document?.getElementById("imagen")?.classList.toggle("hidden");
    document?.getElementById("color")?.classList.toggle("hidden");
    document?.getElementById("formatos")?.classList.toggle("hidden");
    document?.getElementById("elegirColor1")?.classList.toggle("hidden");
    document?.getElementById("elegirColor2")?.classList.toggle("hidden");
    document.getElementById("alertColoresIguales")?.classList.remove("hidden");
  };

  private showChooseDefaultImg = () => {
    document?.getElementById("verImagenes")?.classList.toggle("hidden");
    document?.getElementById("verColores")?.classList.toggle("hidden");
    document?.getElementById("personalizar")?.classList.toggle("hidden");
    document?.getElementById("leagueOfLegends")?.classList.toggle("hidden");
    document?.getElementById("naruto")?.classList.toggle("hidden");
    document?.getElementById("harryPotter")?.classList.toggle("hidden");
  };

  private showChooseDefaultColors = () => {
    document?.getElementById("verImagenes")?.classList.toggle("hidden");
    document?.getElementById("verColores")?.classList.toggle("hidden");
    document?.getElementById("personalizar")?.classList.toggle("hidden");
    document?.getElementById("red")?.classList.toggle("hidden");
    document?.getElementById("green")?.classList.toggle("hidden");
    document?.getElementById("blue")?.classList.toggle("hidden");
  };

  private obtenerRutaArchivo = (e: Event) => {
    return new Promise<string>((resolve) => {
      let reader = new FileReader();
      let fileReader = (e.target as HTMLInputElement)?.files?.[0];
      if (fileReader) {
        reader.readAsDataURL(fileReader);
        reader.onloadend = (event) => {
          const archivo = event.target?.result as string;
          resolve(archivo);
        };
      }
    });
  };

  // Pinta de verde el botón que se seleccionó y de gris los botones hermanos no seleccionados
  private marcarBtnSeleccionado = (btn: HTMLButtonElement): void => {
    const padre = btn.parentNode as HTMLElement;
    if (padre.hasChildNodes()) {
      const hijos = padre.childNodes;
      let i = 0;
      while (i < hijos.length) {
        const hijo = hijos[i] as HTMLElement;
        if (hijo.id && hijo.id !== btn.id && hijo.nodeName === "BUTTON") {
          hijo.classList.add("noSelected");
        } else {
          btn.classList.remove("noSelected");
          btn.classList.add("selected");
        }
        i++;
      }
    }
  };

  private setImagesPredefinidas = (
    btn: HTMLButtonElement,
    img1: string,
    img2: string,
    main: MainMenu
  ) => {
    this.marcarBtnSeleccionado(btn);
    main.setImgFicha1(img1);
    main.setColorFicha1(null);
    main.setImgFicha2(img2);
    main.setColorFicha2(null);
  };

  private setColor = (
    btn: HTMLButtonElement,
    main: MainMenu,
    color1?: string,
    color2?: string
  ) => {
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

  private marcarCuatroEnLinea = (btn: HTMLButtonElement, main: MainMenu) => {
    this.marcarBtnSeleccionado(btn);
    main.setCuatroEnLinea();
  };
}
