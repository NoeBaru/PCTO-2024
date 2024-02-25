/*
Project: 
Project1

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:

It's a game where you have to stop a monster in a hall with your eyes.
Indeed if you look at it it will stop and teleport in an other parti of the screen.
*/

/*Monster*/
let monster;

let mn_img;

let mn_speed;
let mn_x;
let mn_y;

let mn_modifier;

/*Background*/
let bg_img_game;
let bg_img_act;
let bg_img_off;

let light = true;

let alive = true;




function preload(){

    bg_img_game = loadImage("./Img/Background.png");
    bg_img_off = loadImage("./Img/BackgroundOff.png")

    mn_img = loadImage("./Img/Monster.png");

}

function setup(){

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    mn_speed = 3; /*possibility to speed up the game basing on the level of the user*/

    mn_img.resize(windowWidth / 40, windowWidth / 40);
    

    monster = new Monster(mn_speed, mn_img);

    bg_img_act = bg_img_game;

}

function blackMask(){

    push();

    imageMode(CENTER);
    if(mouseX)
    image(bg_img_off, mouseX, mouseY, 2 * windowWidth, 2 * windowHeight);

    pop();

}

function isInScreen(x, y) {
    return x > - monster.img.width && x < width &&
        y > - monster.img.height && y < height;
}

function wait(time){
    
    start = millis();
    do
    {
        current = millis();
    }
    while(current < start + time)
}

function draw(){

    background(bg_img_act);
    if (alive == true){
        monster.update(); 
        blackMask();
        if (!isInScreen(monster.x, monster.y) && alive == true){        
            wait(random(100, 2000));
            alive = false;
        } 
    }else{
        background(monster.img)
    }

}