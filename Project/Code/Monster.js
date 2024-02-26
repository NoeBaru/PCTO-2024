/*
Project: 
Monster.js

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
In this code we create the class Monster that we will use in our code.
*/
class Monster {
    constructor(mn_speed, mn_img){
        this.speed = mn_speed;
        this.img = mn_img;
        this.x = random(width / 2 - this.img.width, width / 2 + this.img.width);
        this.y = random(height / 2 - this.img.height, height / 2 + this.img.height);
        this.side_x = random([-1, 1]);
        this.side_y = random([-1, 1]);
        this.progress = 0;
        this.saw = false;
    }

    

    move(){ 
        if(isInScreen(this.x, this.y)){
            this.progress += 1;
            this.x += (this.speed * (this.progress / 1000)) + this.side_x;
            this.y += (this.speed * (this.progress / 1000)) + this.side_y;
            this.img.resize(this.img.width + this.progress % 2, this.img.height + this.progress % 2);
            //console.log("progress:" + this.progress % 2);
        }
    }

    show() {
        image(this.img, this.x, this.y);
    }

    update() {
        
        if (!this.saw){
            this.move();
        }
        this.show();

    }
    
}