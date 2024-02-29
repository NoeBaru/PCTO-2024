/*
Project: 
Project1

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:

It's a game where you have to stop a monster in a hall with your eyes.
Indeed if you look at it it will stop and teleport in an other parti of the screen.
*/

/Monster/
let monster;

let mn_img;
let mn_img_jmpsc;

let mn_speed;
let mn_x;
let mn_y;

let alive = true;

/Background/
let bg_img_game;
let bg_img_act;
let light_img;
let light_img_off;

let light_img_width_start;
let light_img_height_start;
let light_img_width_end;
let light_img_height_end;
let light_img_height_modifier;//it's if the light get smaller of the start one
let light_img_width_modifier;
let light_img_speed;

let ellipseX;
let ellipseY;

let d;

let score_increasing = 3;
let score = score_increasing;

let cont;

/Menu/
let menu;
let img_menu;
let img_instr;
let gameStarted = false;

/Sounds/
let sound_door;
let sound_scream;
let sound_menu;
let sound_go;
let sound_points;

function light() {
    push();
  
    if (monster.saw) {
      light_img_width_modifier = light_img_width_end + monster.img.width * 8;
      light_img_height_modifier = light_img_height_end + monster.img.height * 8;
    } else {
      light_img_width_modifier = light_img_width_start;
      light_img_height_modifier = light_img_height_start;
    }
  
    imageMode(CENTER);
    image(light_img, mouseX, mouseY, light_img_width_modifier, light_img_height_modifier);
  
    pop();
  }

function isLookingMonster() {
  ellipseMode(CENTER);
  fill(255, 0);
  noStroke();

  ellipseX = monster.x + monster.img.width / 2;
  ellipseY = monster.y + monster.img.height / 2;

  ellipse(ellipseX, ellipseY, monster.img.width, monster.img.height);

  d = dist(mouseX, mouseY, ellipseX, ellipseY);

  if (d < monster.img.width / 2) {
    monster.saw = true;
  } else {
    monster.saw = false;
  }
}

function isKillingMonster() {
  if (monster.saw) {
    monster.lp += 1;
  }
}

function isInScreen(x, y) {
  return (
    x > -monster.img.width &&
    x < width &&
    y > -monster.img.height &&
    y < height
  );
}

function wait(time) {
  let start = millis();
  let current;
  do {
    current = millis();
  } while (current < start + time);
}

function killMonster() {

  sound_points.play();
  monster.x = -monster.width;
  monster.y = -monster.height;

  score += score_increasing;

  setup();
  draw();
}

function printScore() {
    background(img_go);
    textSize(55);
    textAlign(CENTER, CENTER);
  
    // Imposta il nuovo tipo di carattere
    textFont(customFont);
  
    // Controlla se il suono non è già in riproduzione prima di avviare la riproduzion
  
    fill(255);
    // Modifica "Score: " + (score / score_increasing - 1) come desideri
    text("Score: " + (score / score_increasing - 1), width / 2, ((height / 2) + windowHeight / 20));
  
    if (!sound_go.isPlaying() && !sound_points.isPlaying()) {
      sound_go.loop();
      sound_points.play();
  }
}

function stopMusicScream(){
    sound_scream.pause()
}

function stopMusicCatch(){
    sound_points.pause()
}

function preload() {
    bg_img_game = loadImage("./Img/Game/Background.png");
    light_img = loadImage("./Img/Game/Light.png");
    light_img_off = loadImage("./Img/Game/LightOff.png");
  
    mn_img = loadImage("./Img/Game/Monster.png");
    mn_img_jmpsc = loadImage("./Img/Game/Monsterjumpscare.png");
  
    img_menu = loadImage("./Img/Game/MenuStart.png");
    img_instr = loadImage("./Img/Game/Instructions.png");
    img_go = loadImage("./Img/Game/gameOver.png")
  
    sound_scream = loadSound("./Sound/Game/Scream.mp3");
    sound_menu = loadSound("./Sound/Game/SoundMenu.mp3");
    sound_go = loadSound("./Sound/Game/SoundGo.mp3");
    sound_points = loadSound("./Sound/Game/SoundCatch.mp3");
  
    customFont = loadFont('Font/SavageArcade.ttf')

    

}

function setup(){

    frameRate(60);
    createCanvas(windowWidth, windowHeight); //When i created the menu i set noCanvas(), so i have to create it after the menu finished
 
    menu = new Menu(img_menu, img_instr);

    mn_speed = score; //possibility to speed up the game basing on the level of the user/

    mn_img.resize(windowWidth / 40, windowWidth / 40);   

    monster = new Monster(mn_speed, mn_img, mn_img_jmpsc);

    bg_img_act = bg_img_game;

    light_img_width_start = 2 * windowWidth;
    light_img_height_start = 2 * windowHeight;
    
    light_img_width_end = 3 * windowWidth;
    light_img_height_end = 3 * windowHeight; 
    
    light_img.resize(light_img_width_start,  light_img_height_start);

    cont = 0;

    sound_scream.setVolume(0.5);
    sound_points.setVolume(1);
}

function draw(){
    if(!gameStarted){
        menu.startMenu();
        if(menu.continueGame){
            gameStarted = true;
        }
    }else{
        background(bg_img_act);
        if (alive) {
            //sound_game.loop();
            //sound_game.play();
            monster.update();
            light();
            isLookingMonster();
            isKillingMonster();
            if (!isInScreen(monster.x, monster.y) && alive && !monster.kill) {
                alive = false;
                //sound_game.pause();
            }
        } else {
      
            wait(random(500, 1500));
            monster.img_jmpsc.width = windowWidth;
            monster.img_jmpsc.height = 2 * windowHeight;
      
            image(monster.img_jmpsc, 0, -windowHeight / 4);  
            if (cont == 0){
                sound_scream.play();
                sound_scream.onended(stopMusicScream);
                cont++
            }else{
                wait(1000)
                printScore();
  
            }
        }
    }
}