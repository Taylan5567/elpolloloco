class Endboss extends MovableObject {
  currentImage = 0;
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

  /**
   * Constructs a new Endboss object, initializing its properties and loading
   * necessary images. Sets the initial position, size, energy, and status
   * flags. Starts the animation sequence for the Endboss.
   */

  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgHurt);
    this.loadImages(this.imgAlert);
    this.loadImages(this.imgDead);
    this.loadImage(this.imgWalking[0]);
    this.x = 700;
    this.y = 60;
    this.height = 400;
    this.width = 300;
    this.energy = 120;
    this.hitboss = false;
    this.dead = false;
    this.phase = 1;
    this.animateInterval = null;
    this.animationInterval = null;
    this.world;
  }

  checkBossfight(character, audio) {
    const distanceX = Math.abs(this.x - this.world.character.x);

    if (distanceX < 400 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      world.audio.playEndbossSound();
      this.startFight(this.world.character);
    }
  }

  startFight(character) {
    this.speed = 2;
    this.animateMovement(character);
    this.animateActions();
  }

  animateMovement(character) {
    this.animateInterval = setInterval(() => {
      if (this.dead) {
        clearInterval(this.animateInterval);
        return;
      }

      const distanceX = this.x - this.world.character.x;
      if (distanceX > 0) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }, 1000 / 30); // 30 FPS
  }

  animateActions() {
    this.animationInterval = setInterval(() => {
      if (this.dead) {
        clearInterval(this.animationInterval);
        this.playAnimate(this.imgDead);
        return;
      }

      if (this.hitboss) {
        this.playAnimate(this.imgHurt);
        this.hitboss = false;
      } else if (this.phase === 1) {
        this.playAnimate(this.imgWalking);
        console.log("Phase 1");
      } else if (this.phase === 2) {
        this.playAnimate(this.imgAlert);
      } else if (this.phase === 3) {
        this.playAnimate(this.imgWalking);
      }
    }, 200);
  }

  updatePhase() {
    if (this.energy > 70) {
      this.phase = 1; // Phase 1
    } else if (this.energy > 30) {
      this.phase = 2; // Phase 2
    } else {
      this.phase = 3; // Phase 3
    }
  }

  hit() {
    if (this.energy > 0) {
      this.energy -= 10;
      this.hitboss = true;
      this.updatePhase();
      if (this.energy <= 0) {
        this.die();
      }
    }
  }

  die() {
    this.dead = true;
    this.speed = 0;
    clearInterval(this.animateInterval);
    clearInterval(this.animationInterval);
    console.log("Endboss ist besiegt!");
  }
}
