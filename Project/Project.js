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


let score_incresing = 3;
let score = score_incresing;


/*Menu*/

let menu;

let video_start;
let video_end;
let img_menu;
let img_instr;
let img_sett;

function light(){

    push();

    if(monster.saw){

        light_img_width_modifier = light_img_width_end + (monster.img.width * 8);
        light_img_height_modifier = light_img_height_end + (monster.img.height * 8);


    }else{

        light_img_width_modifier = light_img_width_start;
        light_img_height_modifier = light_img_height_start;

    }

    imageMode(CENTER); 
    image(light_img, mouseX, mouseY, light_img_width_modifier, light_img_height_modifier);
    
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

function videoLoaded(video){
    video.size(windowWidth, windowHeight);
}

function preload(){

    bg_img_game = loadImage("./Img/Game/Background.png");
    light_img = loadImage("./Img/Game/Light.png")
    light_img_off = loadImage("./Img/Game/LightOff.png")

    mn_img = loadImage("./Img/Game/Monster.png");
    mn_img_jmpsc = loadImage ("./img/Game/Monsterjumpscare.png");

    video_start = createVideo("./Video/Game/VideoMenuIntro.mp4");
    video_end = createVideo("./Video/Game/VideoMenuOutro.mp4");
    img_menu = loadImage("./Img/Game/MenuStart.png");
    img_instr = loadImage("./Img/Game/Instructions.png");
    img_sett = loadImage("./Img/Game/Background.png");


}

function setup(){

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    videoLoaded(video_start);
    videoLoaded(video_end);

    menu = new Menu(video_start, video_end, img_menu, img_instr, img_sett); 

    mn_speed = score; /*possibility to speed up the game basing on the level of the user*/

    mn_img.resize(windowWidth / 40, windowWidth / 40);   

    monster = new Monster(mn_speed, mn_img, mn_img_jmpsc);

    bg_img_act = bg_img_game;

    light_img_width_start = 2 * windowWidth;
    light_img_height_start = 2 * windowHeight;
    
    light_img_width_end = 3 * windowWidth;
    light_img_height_end = 3 * windowHeight; 
    
    light_img.resize(light_img_width_start,  light_img_height_start)
    
    //video_start.play();
    //menu.start(video_start);

}

function draw(){

    //do{
        menu.startMenu(menu.video_start);
    //}while(menu.isFinished());


    background(bg_img_act);
    if (alive == true){
        monster.update(); 
        light();
        isLookingMonster();
        isKillingMonster();
        if (!isInScreen(monster.x, monster.y) && alive == true && !monster.kill){        
            alive = false;
        } 
    }else{
        background(light_img_off)
        wait(random(500, 1500))
        monster.img_jmpsc.width = windowWidth;
        monster.img_jmpsc.height = 2 * windowHeight;
        image(monster.img_jmpsc, 0, -windowHeight / 4);
        wait(random(500, 1000));
        printScore();
    }

}