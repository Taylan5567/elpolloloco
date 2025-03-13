class Character extends MovableObject {
    world;
    currentImage = 0;
    speed = 5;
    energy = 100;
    dead = false;

    offset = { top: 95, left: 15, right: 25, bottom: 5 };


    imgWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    imgJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    imgDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    imgHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    imgIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    imgLongIdle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    

    constructor() {
        super();
        this.loadImages(this.imgWalking);
        this.loadImages(this.imgJumping);
        this.loadImages(this.imgDead);
        this.loadImages(this.imgHurt);
        this.loadImages(this.imgIdle);
        this.loadImages(this.imgLongIdle);
      
        this.loadImage(this.imgWalking[0]);
        this.applyGravity();
        this.animate();
      }

      jumpOnEnemy() {
        this.speedY = 20;  
        this.lastMove = new Date().getTime();
      }

      isDead() {
       if (this.energy <= 0) {
           this.dead = true;
       }
    }
    
      
      animate() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            } else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }
    
            if (this.world.keyboard.SPACE && !this.IsAboveGround()) {
                this.speedY = 15;
                this.lastMove = new Date().getTime();
            }
            
             
            if (this.dead) {
                this.playAnimate(this.imgDead);
            } else if (this.isHurt()) {
                this.playAnimate(this.imgHurt);
            } else if (this.isLongIdle()) {
                this.playAnimate(this.imgLongIdle);
            } else if (this.isIdle()) {
                this.playAnimate(this.imgIdle);
            } else if (this.IsAboveGround() || this.speedY > 0) {
                this.playAnimate(this.imgJumping);
            } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                this.playAnimate(this.imgWalking);
            }
        }, 50);
    }
    
}