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

  constructor(x, y) {
    super();
    this.hasSplashed = false;
    this.loadImages(this.imgThrow);
    this.loadImages(this.imgSplash);
    this.loadImage(this.imgThrow[0]);
    this.loadImage(this.imgSplash[0]);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throwBottle();
    this.animate();
  }

  throwBottle() {
    this.isThrown = true;
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  splashAnimate() {
    setInterval(() => {
      if (this.currentImage >= this.imgSplash.length) {
        this.currentImage = 0;
        this.playAnimate(this.imgSplash);
      }
    }, 50);
  }

  animate() {
    setInterval(() => {
      if (this.splashAnimate()) {
        this.playAnimate(this.imgSplash);
      } else if (this.isThrown) {
        this.playAnimate(this.imgThrow);
      }
    }, 50);
  }
}
