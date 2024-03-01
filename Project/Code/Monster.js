/*
Project: 
Monster.js

Authors: 
Rinaldi Danilo, Larovere Vanessa, Baruffolo Noemi, Dutto Patrick.

Description:
In this code, we create the Monster class used in our game code.
*/

class Monster {
    constructor(mn_speed, mn_img, mn_img_jmpsc) {
        // Monster properties
        this.speed = mn_speed;
        this.img = mn_img;
        this.x = random(width / 2 - this.img.width, width / 2 + this.img.width);
        this.y = random(height / 2 - this.img.height, height / 2 + this.img.height);
        //the side where it goes
        this.side_x = random([-1, 1]);
        this.side_y = random([-1, 1]);
        this.progress = 0;
        this.saw = false;
        this.kill = false;
        //lp 0 -> 50
        this.lp = 0;
        this.maxHp = 50;
        this.img_jmpsc = mn_img_jmpsc;
    }

    // Moves the monster within the screen
    move() {
        if (isInScreen(this.x, this.y)) {
            this.progress += 1;
            this.x += (this.speed * (this.progress / 500)) + this.side_x;
            this.y += (this.speed * (this.progress / 500)) + this.side_y;
            this.img.width = this.img.width + this.progress % 3;
            this.img.height = this.img.height + this.progress % 3;
            // Using the resize caused transparency and blurriness, so this method is used now.
        }
    }

    // Displays the monster on the screen
    show() {
        image(this.img, this.x, this.y);
    }

    // Checks if the monster is "killed" based on its life points
    isKilled() {
        if (this.lp >= this.maxHp) {
            this.kill = true;
        }
    }

    // Updates the monster's position and appearance
    update() {
        if (!monster.kill) {
            if (!this.saw) {
                this.move();
            }
            this.isKilled();
            this.show();
        } else {
            killMonster();
        }
    }
}
