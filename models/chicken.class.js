class Chicken extends MovableObject {
    height = 100;
    y = 330;
    imgWalking = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imgDead = [
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    speed = 0.15;
    currentImage = 0;
    offset = { top: 10, left: 0, right: 0, bottom: 5 };

    hit = false;
    dead = false;
    energy = 5;
    
    constructor() {
      super();
      this.loadImages(this.imgWalking);
      this.loadImages(this.imgDead);
      this.loadImage(this.imgWalking[0]);
      
      this.x = 400 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.5;
      this.animate();
    }

    hitChicken() {
      this.energy--;
      if (this.energy <= 0) {
          this.dead = true;
      } else {
          this.hit = true;
      }
  }
  
    
    animate() {
        setInterval(() => {
            if (this.hit) {
              this.playAnimate(this.imgDead);
            } else {
                this.playAnimate(this.imgWalking);
                this.moveLeft();
            }
        }, 200);
    }
  }
  