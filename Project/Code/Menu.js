class Menu {
  constructor(video_start, video_end, img_menu, img_instr, img_sett) {
    this.video_start = video_start;
    this.video_end = video_end;
    this.img_menu = img_menu;
    this.img_instr = img_instr;
    this.img_sett = img_sett;
    this.stop = false;
    this.video_cont = 0; // track the video

    // Ellipse coordinates
    this.but_x_start = 813;
    this.but_x_end = 1114;

    this.but_play_y_start = 335;
    this.but_play_y_end = 469;

    this.but_sett_y_start = 517;
    this.but_sett_y_end = 648;

    this.but_instr_y_start = 691;
    this.but_instr_y_end = 839;

    this.ellipse_x = this.but_x_start + (this.but_x_end - this.but_x_start) / 2;
    this.ellipse_play_y = this.but_play_y_start + (this.but_play_y_end - this.but_play_y_start) / 2;
    this.ellipse_sett_y = this.but_sett_y_start + (this.but_sett_y_end - this.but_sett_y_start) / 2;
    this.ellipse_instr_y = this.but_instr_y_start + (this.but_instr_y_end - this.but_instr_y_start) / 2;

    this.life_play = 50; // Life points
    this.life_sett = 50; // Life points
    this.life_instr = 50; // Life points
  }

  startMenu(video) {
    createCanvas(windowWidth, windowHeight); // Create canvas
    video.play();
    console.log("Video started");
    video.onended(() => this.videoEnded(video));
  }

  videoEnded(video) {
    video.hide();
    console.log("In videoEnded");
    this.video_cont += 1;
    if (this.video_cont == 1) {
      this.mainMenu();
    }
  }

  mainMenu() {
    console.log("Main menu");

    background(this.img_menu);
    ellipseMode(CENTER);
    fill(255, 0);
    noStroke();

    // Building the ellipses for the main menu
    ellipse(this.ellipse_x, this.ellipse_play_y, this.but_x_end - this.but_x_start, this.but_play_y_end - this.but_play_y_start);
    ellipse(this.ellipse_x, this.ellipse_sett_y, this.but_x_end - this.but_x_start, this.but_sett_y_end - this.but_sett_y_start);
    ellipse(this.ellipse_x, this.ellipse_instr_y, this.but_x_end - this.but_x_start, this.but_instr_y_end - this.but_instr_y_start);

    // Decrementing the life of the buttons when clicked
    if (this.isClicking(this.but_play_y_end, this.but_play_y_start)) {
      this.life_play -= 1;
    }
    if (this.isClicking(this.but_sett_y_end, this.but_sett_y_start)) {
      this.life_sett -= 1;
    }
    if (this.isClicking(this.but_instr_y_end, this.but_instr_y_start)) {
      this.life_instr -= 1;
    }

    // Check for life points and handle button actions
    if (this.life_play <= 0) {
      this.play();
    }

    if (this.life_sett <= 0) {
      this.sett();
    }

    if (this.life_instr <= 0) {
      this.instructions();
    }
  }

  isClicking(y_end, y_start) {
    let d = dist(mouseX, mouseY, this.ellipse_x, y_start + (y_end - y_start) / 2);
    return d < (this.but_x_end - this.but_x_start) / 2;
  }

  play() {
    this.start(this.video_end);
    this.stop = true;
  }

  sett() {
    // Implement your settings logic here
  }

  instructions() {
    // Implement your instructions logic here
  }

  isFinished() {
    return this.stop;
  }
}

// Additional functions like setup() and draw() can be added as needed.
