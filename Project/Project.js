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

    mn_speed = 10;
    mn_img.resize(windowWidth / 40, windowWidth / 40);
    mn_x = (windowWidth / 2) - (mn_img.width / 2);
    mn_y = (windowHeight / 2) - (mn_img.height / 2);
    

    monster = new Monster(mn_y, mn_x, mn_speed, mn_img);

    bg_img_act = bg_img_game;

}

function isInScreen(x, y) {
    return x > 0 && x < width - monster.img.width &&
        y > 0 && y < height;
}

function wait(time){
    
    start = millis();
    do
    {
        background(51);
        current = millis();
    }
    while(current < start + time)
}

function draw(){

    background(bg_img_act);
    monster.update(); 
    if (!isInScreen(monster.x, monster.y) && alive == true){        
        wait(random(100, 2000));
        alive = false;
    }  
    if (alive == false){
        background(monster.img)
    }

}
