/*
Project: 
Peeky eyes

Part:
Menu class

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
This part of the game manages the menu, the initial section of the game.
*/

class Menu {
  constructor(img_menu, img_instr) {
      // Images
      this.img_menu = img_menu;
      this.img_instr = img_instr;

      // Current action
      this.action = "";

      // Current situation (menu or instructions)
      this.situation = "menu";

      // Current background image
      this.current_image = this.img_menu;

      // Flag to indicate whether to start the game and exit the menu
      this.continueGame = false;
  }

  // Displays the menu or instructions screen
  startMenu() {
      image(this.current_image, 0, 0, windowWidth, windowHeight);
      this.handleMainMenu();
  }

  // Checks if the mouse click is in the top half of the screen
  isHighClick() {
      return mouseY >= 0 && mouseY <= ((windowHeight / 2) + windowHeight / 10);
  }

  // Checks if the mouse click is within the central region of the screen
  isCentralClick() {
      return mouseX >= windowWidth / 4 && mouseX <= windowWidth / 1.5;
  }

  // Checks if the mouse click is in the left half of the screen
  isLeftClick() {
      return mouseX <= windowWidth / 2;
  }

  // Handles actions in the main menu or instructions screen
  handleMainMenu() {
      if (this.situation == "menu") {
          // Checks for a click in the play button area
          if (mouseIsPressed && this.isHighClick() && this.isCentralClick()) {
              this.action = "play";
              this.continueGame = true;
          }
          // Checks for a click in the instructions button area
          else if (mouseIsPressed && !this.isHighClick() && this.isCentralClick()) {
              this.action = "instructions";
              this.current_image = this.img_instr;
              this.situation = "instructions";
          }
      }
      // Checks for a click in the back button area in the instructions screen
      else if (mouseIsPressed && this.isHighClick() && !this.isCentralClick() && this.isLeftClick()) {
          this.action = "back";
          this.current_image = this.img_menu;
          this.situation = "menu";
      }
  }
}
