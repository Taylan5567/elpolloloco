class Endboss extends MovableObject {
  currentImage = 0;
  speed = 2;
  world;
  audio = new GameAudio();

  offset = { top: 0, left: 0, right: 0, bottom: 0 };

  imgAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imgWalking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  imgHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imgDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgHurt);
    this.loadImages(this.imgAlert);
    this.loadImages(this.imgDead);
    this.loadImage(this.imgWalking[0]);
    this.loadImage(this.imgHurt[0]);
    this.x = 2300;
    this.y = 60;
    this.height = 400;
    this.width = 300;
    this.animation();
    this.energy = 120;
    this.hitboss = false;
    this.dead = false;
  }

  hit() {
    this.energy -= 40;
    if (this.energy <= 0) {
      this.energy = 0; // Ensure energy does not go below 0
      this.dead = true;
      this.playAnimate(this.imgDead);
      if (typeof gameEnd === "function") {
        gameEnd();
      } else {
        console.error("gameEnd function is not defined");
      }
    } else {
      this.hitboss = true;
      setTimeout(() => {
        this.hitboss = false;
      }, 1000);
    }
  }

  animation() {
    this.animateInterval = setInterval(() => {
      if (this.world && !this.world.hadFirstContact) {
        this.moveLeft();
      }
    }, 1000 / 60);

    let i = 0;
    this.animationInterval = setInterval(() => {
      if (this.dead) {
        clearInterval(this.animationInterval);
        clearInterval(this.animateInterval);
        this.playAnimate(this.imgDead);
        return;
      }
      if (this.hitboss) {
        this.playAnimate(this.imgHurt);
      } else if (i > 8) {
        this.playAnimate(this.imgAlert);
        setTimeout(() => {
          i = 0;
          this.speed = 2;
          this.playAnimate(this.imgWalking);
        }, 2000);
      } else {
        this.playAnimate(this.imgWalking);
      }
      i++;
    }, 200);
  }
}
