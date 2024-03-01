/*
Project: 
Project1

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:

It's a game where you have to stop a monster in a hall with your eyes.
Indeed if you look at it it will stop and teleport in an other parti of the screen.
when yu stop it, you will increse your points
*/

/monster/
let monster;

// Images
let mn_img;
let mn_img_jmpsc;

// Movement
let mn_speed;
let mn_x;
let mn_y;

// Manages the hitbox of Smiley
let ellipseX;
let ellipseY;

// Manages the mouse
let d;

// Manages the score and speed of Smiley
let score_increasing = 3;
let score = score_increasing;

// Player's life
let alive = true;

/background/
// Images
let bg_img_game;
let bg_img_act;
let light_img;
let light_img_off;

// Light
// Manages the flashlight enlargement
let light_img_width_start;
let light_img_height_start;
let light_img_width_end;
let light_img_height_end;

// Variables to better manage the flashlight enlargement
let light_img_height_modifier;
let light_img_width_modifier;

let cont;

/Menu/
let menu;
let img_menu;
let img_instr;
let gameStarted = false;

// Sounds
let sound_scream;
let sound_menu;
let sound_go;
let sound_points;

function light() {
    push();

    // Adjust light size based on whether the monster is seen
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

// Checks if the mouse is over the monster
function isLookingMonster() {
    ellipseMode(CENTER);
    fill(255, 0);
    noStroke();

    ellipseX = monster.x + monster.img.width / 2;
    ellipseY = monster.y + monster.img.height / 2;

    ellipse(ellipseX, ellipseY, monster.img.width, monster.img.height);

    d = dist(mouseX, mouseY, ellipseX, ellipseY);

    // Sets the monster as "seen" if the mouse is over it
    if (d < monster.img.width / 2) {
        monster.saw = true;
    } else {
        monster.saw = false;
    }
}

// Handles the process of "killing" the monster
function isKillingMonster() {
    if (monster.saw) {
        monster.lp += 1;
    }
}

// Checks if the monster is within the screen boundaries
function isInScreen(x, y) {
    return (
        x > -monster.img.width &&
        x < width &&
        y > -monster.img.height &&
        y < height
    );
}

// Pauses the execution for a specified time
function wait(time) {
    let start = millis();
    let current;
    do {
        current = millis();
    } while (current < start + time);
}

// "Kills" the monster and updates the score
function killMonster() {
    sound_points.play();
    monster.x = -monster.width;
    monster.y = -monster.height;

    score += score_increasing;

    setup();
    draw();
}

// Displays the final score on the screen
function printScore() {
    background(img_go);
    textSize(55);
    textAlign(CENTER, CENTER);

    textFont(customFont);

    fill(255);

    text("Score: " + (score / score_increasing - 1), width / 2, ((height / 2) + windowHeight / 20));

    // Plays end-game sounds
    if (!sound_go.isPlaying() && !sound_points.isPlaying()) {
        sound_go.loop();
        sound_points.play();
    }
}

// Stops the scream sound
function stopMusicScream() {
    sound_scream.stop();
}

// Stops the menu music
function stopMusicMenu() {
    sound_menu.stop();
}

// Preloads images, sounds, and fonts
function preload() {
    bg_img_game = loadImage("./Img/Game/Background.png");
    light_img = loadImage("./Img/Game/Light.png");
    light_img_off = loadImage("./Img/Game/LightOff.png");

    mn_img = loadImage("./Img/Game/Monster.png");
    mn_img_jmpsc = loadImage("./Img/Game/Monsterjumpscare.png");

    img_menu = loadImage("./Img/Game/MenuStart.png");
    img_instr = loadImage("./Img/Game/Instructions.png");
    img_go = loadImage("./Img/Game/gameOver.png");

    sound_scream = loadSound("./Sound/Game/Scream.mp3");
    sound_menu = loadSound("./Sound/Game/SoundMenu.mp3");
    sound_go = loadSound("./Sound/Game/SoundGo.mp3");
    sound_points = loadSound("./Sound/Game/SoundCatch.mp3");

    customFont = loadFont('Font/SavageArcade.ttf');
}

// Sets up initial configurations
function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    menu = new Menu(img_menu, img_instr);

    mn_speed = score;

    mn_img.resize(windowWidth / 40, windowWidth / 40);

    monster = new Monster(mn_speed, mn_img, mn_img_jmpsc);

    bg_img_act = bg_img_game;

    light_img_width_start = 2 * windowWidth;
    light_img_height_start = 2 * windowHeight;

    light_img_width_end = 3 * windowWidth;
    light_img_height_end = 3 * windowHeight;

    light_img.resize(light_img_width_start, light_img_height_start);

    cont = 0;

    sound_scream.setVolume(1);
    sound_points.setVolume(0.5);
}

// Main game loop
function draw() {
    if (!gameStarted) {
        // Displays the start menu
        menu.startMenu();

        // Plays menu music
        if (!sound_menu.isPlaying()) {
            sound_menu.loop();
        }

        // If the player chooses to continue, start the game and stop the menu music
        if (menu.continueGame) {
            gameStarted = true;
            stopMusicMenu();
        }
    } else {
        // Main game logic
        background(bg_img_act);

        if (alive) {
            monster.update();
            light();
            isLookingMonster();
            isKillingMonster();

            // Checks if the monster is out of the screen
            if (!isInScreen(monster.x, monster.y) && alive && !monster.kill) {
                alive = false;
            }
        } else {
            // If player is "dead"
            wait(random(500, 1500));

            // Adjusts the jumpscare image size
            monster.img_jmpsc.width = windowWidth;
            monster.img_jmpsc.height = 2 * windowHeight;

            image(monster.img_jmpsc, 0, -windowHeight / 4);

            // Plays scream sound once
            if (cont == 0) {
                sound_scream.play();
                sound_scream.onended(stopMusicScream);
                cont++;
            } else {
                wait(1000);
                printScore();
            }
        }
    }
}
