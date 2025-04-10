class ThrowableObject extends MovableObject {
  world;
  isThrown = false;

  imgThrow = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imgSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  offset = { top: 10, left: 45, right: 25, bottom: 5 };

  currentImage = 0;

  /**
   * Creates a new instance of ThrowableObject at the given position.
   * It calls the parent's constructor, sets the initial image, and sets the
   * initial properties of the object. It also calls the throwBottle and animate
   * methods to start the throwing animation and the position update.
   * @param {number} x - The x position of the object.
   * @param {number} y - The y position of the object.
   */
  constructor(x, y) {
    super();
    this.loadImages(this.imgThrow);
    this.loadImages(this.imgSplash);
    this.loadImage(this.imgThrow[0]);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throwBottle();
    this.animate();
    this.isSplashing = false;
    this.bottleSplash();
  }

  /**
   * Throws the bottle in the air. Sets the bottle to thrown and sets its initial
   * vertical speed to 10. Applies gravity to the bottle and moves the bottle
   * horizontally by 10 pixels each 25 milliseconds.
   */
  throwBottle() {
    this.isThrown = true;
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  bottleSplash() {
    this.isSplashing = true;
    this.hasSplashed = true;
    this.playAnimate(this.imgSplash);
  }

  /**
   * Animates the throwable object by cycling through its splash and throw images.
   * Calls splashAnimate() to determine if the splash animation should play. If
   * splash animation is not active and the object is thrown, it plays the throw
   * animation. This function runs at a set interval of 50 milliseconds.
   */
  animate() {
    setInterval(() => {
      if (this.isThrown) {
        this.playAnimate(this.imgThrow);
      }
    }, 50);
  }
}
