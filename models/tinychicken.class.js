class TinyChicken extends Chicken {
  imgWalking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  imgDead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = { top: 0, left: 0, right: 0, bottom: 0 };

  /**
   * Creates a new TinyChicken object.
   *
   * This constructor calls the super-constructor to load the walking and dead
   * images, and then sets the initial position, height, width, and speed of the
   * TinyChicken object. The x-position is set to a random value between 390 and
   * 890, and the y-position is set to 350. The height and width are set to 90, and
   * the speed is set to a random value between 1 and 1.5.
   * @memberof TinyChicken
   * @instance
   */
  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgDead);
    this.loadImage(this.imgWalking[0]);

    this.x = 390 + Math.random() * 1500;
    this.y = 350;
    this.height = 90;
    this.width = 90;
    this.speed = 2 + Math.random() * 1;
  }

  /**
   * Animates the TinyChicken. If the TinyChicken is hit, it will play the dead animation.
   * Otherwise, it will play the walking animation and move to the left.
   * @memberof TinyChicken
   * @instance
   */
  animate() {
    setInterval(() => {
      if (this.hit) {
        this.playAnimate(this.imgDead);
      } else {
        this.playAnimate(this.imgWalking);
        this.moveLeft();
      }
    }, 1000 / 9);
  }
}
