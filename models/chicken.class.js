class Chicken extends MovableObject {
  height = 100;
  y = 330;
  imgWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imgDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  speed = 0.15;
  currentImage = 0;
  offset = { top: 10, left: 0, right: 0, bottom: 5 };

  hit = false;
  dead = false;
  energy = 5;

  /**
   * Creates a new Chicken object.
   *
   * This constructor calls the super-constructor to initialize the object, loads the walking and dead
   * images, and then sets the initial position, speed, and animation of the Chicken object. The x-position
   * is set to a random value between 400 and 900, the speed is set to a random value between 0.15 and 0.65,
   * and the animation is started.
   * @memberof Chicken
   * @instance
   */
  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgDead);
    this.loadImage(this.imgWalking[0]);

    this.x = 400 + Math.random() * 2300;
    this.speed = 1 + Math.random() * 2;
    this.animate();
  }

  /**
   * Decrements the energy of the Chicken and sets the hit status to true if the energy is above 0.
   * If the energy reaches 0, the Chicken is set to be dead.
   * @memberof Chicken
   * @instance
   */
  hitChicken() {
    this.energy--;
    if (this.energy <= 0) {
      this.dead = true;
    } else {
      this.hit = true;
    }
  }

  /**
   * Animates the Chicken object. If the Chicken is hit, it will play the dead animation and not move.
   * Otherwise, it will play the walking animation and move to the left.
   * @memberof Chicken
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
    }, 1000 / 20);
  }
}
