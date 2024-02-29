class Menu {
  constructor(img_menu, img_instr) {
    this.img_menu = img_menu;
    this.img_instr = img_instr;

    this.action = "";
    this.situation = "menu";
    this.current_image = this.img_menu;
    this.continueGame = false;
  }

  startMenu() {
    //console.log("Entrato");
    image(this.current_image, 0, 0, windowWidth, windowHeight); // Disegna l'immagine corrente
    this.handleMainMenu();
  }
  //START)
  //800, 1116 (X)
  //360, 526 (Y)

  //INSTRUCTIONS)
  //800, 1116 (x)
  //666, 794 (y)

  //BACK)
  //14, 284(x)
  //6, 142(y)

  handleMainMenu() {
    if(this.situation == "menu"){
      if (mouseIsPressed && mouseY >= 0 && mouseY <= windowHeight/2) {
        this.action = "play";
        this.continueGame = true;
      } else if (mouseIsPressed && mouseY >= windowHeight / 2 && mouseY <= windowHeight) {
        this.action = "instructions";
        this.current_image = this.img_instr;
        this.situation = "instructions";
      }
    } else if (mouseIsPressed && mouseY >= 0 && mouseY <= windowHeight / 2 && this.action === "instructions") {
        //console.log("Back Entrato");
        this.action = "back";
        this.current_image = this.img_menu;
    } 
  }

    /*

    if (mouseIsPressed && mouseX >= 0 && mouseX <= windowWidth &&
      mouseY >= 0 && mouseY <= windowHeight/2 && (this.action === "menu" || this.action === "menu1")) {
      console.log("Cliccato");
      this.action = "play";
      this.continueGame = true;

      // BUTTON INSTRUCTIONS
    } else if (mouseIsPressed && mouseX >= 0 && mouseX <= windowWidth &&
      mouseY >= 0 && mouseY <= windowHeight) {
      console.log("Instructions Entrato");
      this.action = "instructions";
      this.current_image = this.img_instr;
      // BUTTON BACK (disponibile solo quando l'azione è impostata su "instructions")
      if (mouseIsPressed && mouseX >= 0 && mouseX <= windowWidth &&
        mouseY >= 0 && mouseY <= windowHeight / 2 && this.action == "instructions") {
        console.log("Back Entrato");
        this.action = "back";
        this.current_image = this.img_menu;
      }
    }
    */

    /*
    // BUTTON BACK (disponibile solo quando l'azione è impostata su "instructions")
    if (this.action !== "play" &&
      mouseIsPressed && mouseX >= 0 && mouseX <= windowWidth &&
      mouseY >= 0 && mouseY <= windowHeight/2) {
        console.log("Back Entrato");

        this.action = "back";
        this.current_image = this.img_menu;
    }
    */
}