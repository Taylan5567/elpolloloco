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

  /**
   * Reduces the energy of the endboss by 40. If the endboss's energy
   * drops to 0 or below, marks the endboss as dead, plays the death
   * animation, and calls the gameEnd function if it exists. If the
   * endboss is not dead, temporarily sets the hitboss flag to true
   * for 1 second.
   */
  hit() {
    this.energy = Math.max(0, this.energy - 40);
    if (this.energy === 0) {
      this.dead = true;
      this.playAnimate(this.imgDead);
      if (typeof gameEnd === "function") gameEnd();
    } else {
      this.hitboss = true;
      setTimeout(() => (this.hitboss = false), 1000);
    }
  }

  /**
   * Animates the endboss. If the world exists and the endboss has not yet
   * had its first contact with the character, moves the endboss to the left
   * at an interval of 16.67 ms (60 times per second). If the endboss is dead,
   * plays the death animation and clears the animation intervals. If the
   * endboss is hit, plays the hurt animation. If the endboss is not hit and
   * the frame index is greater than 8, plays the alert animation, resets the
   * frame index to 0, sets the speed to 2, and plays the walking animation
   * after a 2 second delay. If none of the above conditions are met, plays
   * the walking animation and increments the frame index.
   */
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
