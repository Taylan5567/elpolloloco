class Endboss extends MovableObject {
  hitboss = false;
  dead = false;
  alertBoss = false;
  isFighting = false;
  animateInterval = null;
  energy = 99;
  hadFirstContact = false;
  characterDirection;
  speed = 15;
  currentImage = 0;
  world = null;

  offset = { top: 0, left: 0, right: 0, bottom: 0 };

  imgAlertBoss = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imgWalkingBoss = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  imgHurtBoss = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imgDeadBoss = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  imgAtackingBoss = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Constructs a new Endboss object, initializing its properties and loading
   * necessary images. Sets the initial position, size, energy, and status
   * flags. Starts the animation sequence for the Endboss.
   */

  constructor() {
    super();
    this.loadImages(this.imgWalkingBoss);
    this.loadImages(this.imgHurtBoss);
    this.loadImages(this.imgAlertBoss);
    this.loadImages(this.imgDeadBoss);
    this.loadImages(this.imgAtackingBoss);
    this.loadImage(this.imgAlertBoss[0]);
    this.x = 2000;
    this.y = 60;
    this.height = 400;
    this.width = 300;
    this.bossFight();
    this.lastHitTime = null;
    this.checkEndbossSound();
    this.speed = 15;
  }

  /**
   * Starts the Endboss fight by setting an interval to animate and update the
   * Endboss at a rate of 150 milliseconds. The interval will be stopped if the
   * game is not running. The interval will call the checkBossFight, animateActions,
   * and checkDistanceToPlayer methods.
   * @memberof Endboss
   * @instance
   */
  bossFight() {
    this.animateInterval = setInterval(() => {
      if (world.isGameStarted) {
        this.checkBossFight();
        this.animateActions();
        this.checkDistanceToPlayer();
      }
    }, 1000 / 10);
  }

  /**
   * Checks if the Endboss should start fighting. If the Endboss has had its first
   * contact with the player, it will animate its movement and play the endboss
   * sound. If the Endboss is dead, it will stop animating.
   * @memberof Endboss
   * @instance
   */
  checkBossFight() {
    if (this.hadFirstContact) {
      this.animateMovement();
    }
  }

  /** Continuously checks if the Endboss has had its first contact with the player.
   * If so, it starts playing the endboss sound and stops further checks.
   * The check is performed at an interval of 100 milliseconds.
   * @memberof Endboss
   * @instance
   */
  checkEndbossSound() {
    const bossmusic = setInterval(() => {
      if (this.hadFirstContact) {
        this.playEndbossSound();
        clearInterval(bossmusic);
      }
    }, 100);
  }

  /**
   * Starts playing the endboss sound effect by calling the
   * {@link GameAudio#playEndbossSound} method on the world's audio object.
   * @memberof Endboss
   * @instance
   */
  playEndbossSound() {
    world.audio.playEndbossSound();
  }

  /**
   * Moves the Endboss object towards the player. If the distance to the player
   * is less than 100 pixels, the Endboss moves left. Otherwise, it moves right.
   * If the Endboss is dead, it stops animating.
   * @param {Character} character The character object to check distance to.
   */
  animateMovement(character) {
    if (this.dead) {
      clearInterval(this.animateInterval);
      return;
    }
    const player = world.character.x;
    const distanceX = Math.abs(this.x - player);
    if (distanceX < 10) {
      this.fight();
    }
  }

  /**
   * Moves the Endboss object towards the player. If the distance to the player
   * is less than 400 pixels, the Endboss moves left. Otherwise, it moves right.
   * This function is called in the animation interval of the Endboss.
   * @memberof Endboss
   * @instance
   */
  moveToPlayer() {
    const playerX = world.character.x;
    const distanceX = Math.abs(this.x - playerX);

    if (distanceX < 400 && this.x > playerX) {
      this.moveLeft();
      this.otherDirectionFight();
    } else if (distanceX < 400 && this.x < playerX) {
      this.moveRight();
      this.otherDirectionFight();
    } else {
      if (this.x > playerX) {
        this.moveLeft();
        this.speed = 25;
      } else {
        this.moveRight();
        this.speed = 25;
      }
    }
  }

  /**
   * Sets the other direction flag of the Endboss according to the current position
   * of the character. If the character is to the left of the Endboss, the flag is
   * set to true. Otherwise, it is set to false.
   * @memberof Endboss
   * @instance
   */
  otherDirectionFight() {
    if (this.x < world.character.x) {
      this.otherDirection = true;
    }
    if (this.x > world.character.x) {
      this.otherDirection = false;
    }
  }

  /**
   * Animates the Endboss object according to its status flags. If the Endboss is
   * dead, it will play the dead animation. If the Endboss is hit, it will play the
   * hurt animation. If the Endboss is fighting, it will play the attacking animation.
   * If the Endboss is alert, it will play the walking animation and move towards the
   * player. Otherwise, it will play the alert animation.
   * @memberof Endboss
   * @instance
   */
  animateActions() {
    if (this.dead) {
      this.playAnimate(this.imgDeadBoss);
    } else if (this.hitboss) {
      this.playAnimate(this.imgHurtBoss);
    } else if (this.isFighting) {
      this.playAnimate(this.imgAtackingBoss);
    } else if (this.alertBoss) {
      this.playAnimate(this.imgWalkingBoss);
      this.moveToPlayer();
    } else {
      this.playAnimate(this.imgAlertBoss);
    }
  }

  /**
   * Checks if the distance to the player is less than 400 pixels.
   * If this is the case, the boss will start moving towards the player.
   * @return {boolean} True if the distance is less than 400, false otherwise.
   */

  checkDistanceToPlayer() {
    const player = world.character;
    const distanceX = Math.abs(this.x - player.x);

    if (distanceX < 400) {
      this.hadFirstContact = true;
      this.alertBoss = true;
    }
    return distanceX < 400;
  }

  /**
   * Handles the hit logic for the endboss.
   * @param {number} currentTime - The current timestamp.
   * @returns {void}
   */
  hit() {
    const currentTime = new Date().getTime();
    if (!this.lastHitTime || currentTime - this.lastHitTime > 1000) {
      this.lastHitTime = currentTime;
      if (this.energy > 0) {
        this.energy -= 25;
        this.hitboss = true;
        setTimeout(() => {
          this.hitboss = false;
        }, 1000);
        if (this.energy <= 0) {
          this.die();
        }
      }
    }
  }

  /**
   * Initiates the fighting sequence for the Endboss. If the Endboss is not dead and
   * is not currently fighting, sets the fighting status to true, and disables alert and
   * hit statuses. The fighting status will be automatically reset to false after 700ms.
   * This function ensures that the Endboss transitions smoothly into a fighting state.
   */
  fight() {
    if (!this.dead && !this.isFighting) {
      this.isFighting = true;
      this.alertBoss = false;
      this.hitboss = false;
      setTimeout(() => (this.isFighting = false), 700);
    }
  }

  /**
   * Sets the Endboss to a dead state. This will clear the animate interval, set the
   * speed to 0, and set the dead flag to true.
   * @memberof Endboss
   * @instance
   */
  die() {
    this.dead = true;
    this.speed = 0;
    this.playAnimate(this.imgDeadBoss);
    clearInterval(this.animateInterval);
  }
}
