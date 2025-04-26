class Character extends MovableObject {
  world;
  currentImage = 0;
  speed = 15;

  offset = { top: 95, left: 15, right: 25, bottom: 5 };

  imgWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  imgJumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  imgDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  imgHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  imgIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imgLongIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Initializes the Character instance by loading various image sets
   * for different states (walking, jumping, dead, hurt, idle, long idle)
   * and setting the initial image to the first walking image.
   * Applies gravity and starts the character animation.
   * Sets the initial energy level to 100 and marks the character as not dead.
   * Also, initiates the dead fall animation logic.
   */

  constructor() {
    super();
    this.loadImages(this.imgWalking);
    this.loadImages(this.imgJumping);
    this.loadImages(this.imgDead);
    this.loadImages(this.imgHurt);
    this.loadImages(this.imgIdle);
    this.loadImages(this.imgLongIdle);

    this.loadImage(this.imgWalking[0]);
    this.loadImage(this.imgJumping[0]);
    this.applyGravity();
    this.animate();
    this.energy = 100;
    this.dead = false;
    this.deadFall();
    this.speed = 5;
  }

  /**
   * When the character jumps on an enemy, this function is called. It sets the
   * character's vertical speed to 20 and the last move time to the current time.
   */
  jumpOnEnemy() {
    this.speedY = 20;
    this.lastMove = new Date().getTime();
  }

  /**
   * Sets an interval that, if the character's energy is 0, will make the character
   * fall down the screen, simulating gravity, until the character reaches the
   * bottom of the screen.
   */
  deadFall() {
    setInterval(() => {
      if (this.energy == 0) {
        this.speedY = 10;
        this.dead = true;
        this.y += this.speedY;
      }
    }, 1000 / 60);
  }

  /**
   * Moves the character to the left by its speed. Also updates the lastMove
   * property to the current time.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  /**
   * Animates the character based on the state of the keyboard.
   *
   * The character is animated as follows:
   * - If the character is dead, the dead animation is played.
   * - If the character is hurt, the hurt animation is played.
   * - If the character is idle, the idle animation is played.
   * - If the character is jumping, the jumping animation is played.
   * - If the character is moving left or right, the walking animation is played.
   * - If the character is long idle, the long idle animation is played.
   * - If none of the above conditions are met, the character is not animated.
   *
   * The animation is updated every 50 milliseconds.
   */
  animate() {
    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      } else if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x
      ) {
        this.moveRight();
      }

      if (this.world.keyboard.SPACE && !this.IsAboveGround()) {
        this.speedY = 15;
        this.lastMove = new Date().getTime();
      }

      if (this.dead) {
        this.playAnimate(this.imgDead);
      } else if (this.IsAboveGround()) {
      } else if (this.isHurt()) {
        this.playAnimate(this.imgHurt);
      } else if (this.isLongIdle()) {
        this.playAnimate(this.imgLongIdle);
      } else if (this.isIdle()) {
        this.playAnimate(this.imgIdle);
      } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
        this.playAnimate(this.imgWalking);
      }
    }, 1000 / 30);

    setInterval(() => {
      if (this.IsAboveGround()) {
        this.playAnimate(this.imgJumping);
      }
    }, 1000 / 9);
  }
}
