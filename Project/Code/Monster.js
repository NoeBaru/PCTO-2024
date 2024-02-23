/*
Project: 
Monster.js

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
In this code we create the class Monster that we will use in our code.
*/
class Monster {
    constructor(mn_speed, mn_img, mn_modifier){
        this.speed = mn_speed;
        this.img = mn_img;
        this.modifier = mn_modifier;
        this.x = random(width / 2 - this.img.width, width / 2 + this.img.width);
        this.y = random(height / 2 - this.img.height, height / 2 + this.img.height);
        this.side_x = random([-1, 1]);
        this.side_y = random([-1, 1]);
    }

    

    move(){ 
        if(isInScreen(this.x, this.y)){
            this.x += (this.speed / this.modifier) + this.side_x;
            this.y += (this.speed / this.modifier) + this.side_y;
            this.img.resize(this.img.width + this.speed/this.modifier, this.img.height + this.speed/this.modifier);
        }
    }

    show() {
        image(this.img, this.x, this.y);
    }

    update() {
        
        this.move();
        this.show();

    }
    
}