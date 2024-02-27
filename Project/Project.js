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

let alive = true;

/*Background*/
let bg_img_game;
let bg_img_act;
let torch_img;
let torch_img_off;

let torch_img_width_start;
let torch_img_height_start;
let torch_img_width_end;
let torch_img_height_end;
let torch_img_height_modifier;//it's if the torch get smaller of the start one
let torch_img_width_modifier;
let torch_img_speed;

let ellipseX;
let ellipseY;

let d;


let score_incresing = 3;
let score = score_incresing;




function preload(){

    bg_img_game = loadImage("./Img/Background.png");
    torch_img = loadImage("./Img/BackgroundOff.png")
    torch_img_off = loadImage("./Img/lightOff.png")

    mn_img = loadImage("./Img/Monster.png");
    mn_img_jmpsc = loadImage ("./img/Monsterjumpscare.png");


}

function setup(){

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    mn_speed = score; /*possibility to speed up the game basing on the level of the user*/

    mn_img.resize(windowWidth / 40, windowWidth / 40);   
    

    monster = new Monster(mn_speed, mn_img, mn_img_jmpsc);

    bg_img_act = bg_img_game;

    torch_img_width_start = 2 * windowWidth;
    torch_img_height_start = 2 * windowHeight;
    
    torch_img_width_end = 3 * windowWidth;
    torch_img_height_end = 3 * windowHeight; 
    
    torch_img.resize(torch_img_width_start,  torch_img_height_start)

    

}


function torch(){

    push();

    if(monster.saw){

        torch_img_width_modifier = torch_img_width_end + (monster.img.width * 8);
        torch_img_height_modifier = torch_img_height_end + (monster.img.height * 8);


    }else{

        torch_img_width_modifier = torch_img_width_start;
        torch_img_height_modifier = torch_img_height_start;

    }

    imageMode(CENTER); 
    image(torch_img, mouseX, mouseY, torch_img_width_modifier, torch_img_height_modifier);
    
    pop();

}

function isLookingMonster(){
    ellipseMode(CENTER);
    fill(255, 0);
    noStroke();
    
    ellipseX = monster.x + monster.img.width / 2;
    ellipseY = monster.y + monster.img.height / 2;

    ellipse(ellipseX, ellipseY, monster.img.width, monster.img.height);

    d = dist(mouseX, mouseY, ellipseX, ellipseY);

    if (d < monster.img.width / 2){
        monster.saw = true;
    }else{
        monster.saw = false;
    }

}

function isKillingMonster(){

    if (monster.saw){

        monster.lp += 1;
       
    }
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

function killMonster(){

    monster.x = -monster.width;
    monster.y = -monster.height;

    score += score_incresing;

    

    setup();
    draw();


}

function printScore(){
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Score: " + ((score / score_incresing) - 1), width / 2, height / 2);
}

function draw(){

    background(bg_img_act);
    if (alive == true){
        monster.update(); 
        torch();
        isLookingMonster();
        isKillingMonster();
        if (!isInScreen(monster.x, monster.y) && alive == true && !monster.kill){        
            wait(random(100, 2000));
            alive = false;
        } 
    }else{
        background(torch_img_off)
        wait(random(500, 1000))
        monster.img_jmpsc.width = windowWidth;
        monster.img_jmpsc.height = windowHeight;
        image(monster.img_jmpsc, 0, 0);

        printScore();
    }

}