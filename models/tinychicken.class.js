class TinyChicken extends Chicken {

    imgWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    imgDead = [ 'img/3_enemies_chicken/chicken_small/2_dead/dead.png' ];


    offset = { top: 20, left: 0, right: 0, bottom: 5 };



  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgDead);
    this.loadImage(this.imgWalking[0]);
    
    this.x = 390 + Math.random() * 500;
    this.y = 350;
    this.height = 90;
    this.width = 90;
    this.speed = 1 + Math.random() * 0.5;
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