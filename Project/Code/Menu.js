/*
Project: 
Peeky eyes

Part:
Menu class

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
questa parte del gioco si occupa di gestire il menu, quindi la parte iniziale del gioco.
*/

class Menu {
  constructor(img_menu, img_instr) {
    /*images*/
    this.img_menu = img_menu;
    this.img_instr = img_instr;

    /*quale azione sto per fare*/
    this.action = "";
    /*in quale azione sono*/
    this.situation = "menu";
    /*gestisce l'immagine di sfondo che sto usando*/
    this.current_image = this.img_menu;
    /*dice se iniziare la partita e uscire dal menu*/
    this.continueGame = false;
  }

  
  startMenu() {
    image(this.current_image, 0, 0, windowWidth, windowHeight);
    this.handleMainMenu();
  }

  isHighClick() {
    return mouseY >= 0 && mouseY <= ((windowHeight / 2) + windowHeight / 10);
  }

  isCentralClick() {
    return mouseX >= windowWidth / 4 && mouseX <= windowWidth / 1.5;
  }

  isRightClick() {
    return mouseX <= windowWidth / 2;
  }

  handleMainMenu() {
    if (this.situation == "menu") {
      if (mouseIsPressed && this.isHighClick() && this.isCentralClick()) {
        this.action = "play";
        this.continueGame = true;
      } else if (mouseIsPressed && !this.isHighClick() && this.isCentralClick()) {
        this.action = "instructions";
        this.current_image = this.img_instr;
        this.situation = "instructions";
      }
    } else if (mouseIsPressed && this.isHighClick() && !this.isCentralClick() && this.isRightClick()) {
      this.action = "back";
      this.current_image = this.img_menu;
      this.situation = "menu";
    }
  }
}
