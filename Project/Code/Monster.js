/*
Project: 
Monster.js

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
In this code we create the class Monster that we will use in our code.
*/
class Monster {
    constructor(mn_y, mn_x, mn_speed, mn_img){
        this.x = mn_x;
        this.y = mn_y;
        this.speed = mn_speed;
        this.img = mn_img;
    }

    

    move(){ 
        if(isInScreen(this.x, this.y)){
            
            this.x -= this.speed / 2;
            this.y += this.speed / 2;
            this.img.resize(this.img.width + this.speed, this.img.height + this.speed);
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