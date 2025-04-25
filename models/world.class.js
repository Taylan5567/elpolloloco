class World {
  /** @param {boolean} isGameStarted - Indicates if the game has started.*/
  start = new Start(0, 0);
  endscreen = null;
  character = new Character();
  audio = new GameAudio();
  status = new Status();
  bottlestats = new BottleStatus();
  bossStats = new EndbossStatus();
  coin = new CoinStatus();
  items = [new Coins()];
  enemy = [new Chicken()];
  level = null;
  bottle = [new Bottle()];
  thrownBottles = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  endboss = new Endboss();
  isGameStarted = false;
  gameRestart = false;

  /** Creates an instance of World.
   * @param {*} canvas @param {*} keyboard */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getCoins();
    this.getBottles();
  }
  /* Sets the world for the character and enemies. */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach((enemy) => (enemy.world = this));
    }
  }

  /*Initializes and starts the game by setting the game state to started,*/
  startGame() {
    this.isGameStarted = true;
    this.audio.playBackgroundMusic();
    initLevel();
    this.level = levelOne;
    this.setWorld();
    this.audio.checkMuted();
    this.endboss = new Endboss();
    this.endboss.world = this;
    this.run();
  }
  /**
   * Resets the game state by setting all game state properties to their initial, default values.
   * @function resetGameState
   */
  resetGameState() {
    this.isGameStarted = false;
    this.gameOver = false;
    this.gameWon = false;
    this.endboss.hadFirstContact = false;
    this.bossMusicStarted = false;
  }

  /** Resets the game objects to their initial state. This includes resetting game data, initializing the level, setting the world context, and resetting audio elements.
   */
  resetGameObjects() {
    this.resetGameData();
    initLevel();
    this.level = levelOne;
    this.setWorld();

    if (this.audio && typeof this.audio.resetAudio === "function") {
      this.audio.resetAudio();
      this.audio.playAudio();
    }
  }

  /**
   * Resets all game data to its initial state. This method is called when
   * the game is restarted.
   */
  resetGameData() {
    this.character = new Character();
    this.status = new Status();
    this.bottlestats = new BottleStatus();
    this.bossStats = new EndbossStatus();
    this.coin = new CoinStatus();
    this.items = [];
    this.bottle = [];
    this.getCoins();
    this.getBottles();
    this.thrownBottles = [];
    this.endboss = new Endboss();
  }

  /**
   * Restarts the game by resetting the game state and all game objects.
   * @function restartGame
   */
  restartGame() {
    this.resetGameState(); // Setze Spielzustände zurück
    this.resetGameObjects(); // Setze Spielobjekte zurück
    this.isGameStarted = true; // Starte das Spiel neu
    this.gameRestart = true;
    this.audio.playBackgroundMusic();
    setTimeout(() => {
      this.gameRestart = false;
    }, 5000);
  }

  /* Stops the game by clearing the canvas, stopping the game loop, and */
  stopGame() {
    this.clearCanvas();
    this.audio.pauseAudio();
  }

  /* Clears the canvas by getting the 2D context and using the clearRect method */
  clearCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /* Loads an image from the given path and assigns it to the img property of the World object. */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /** Resets the game data by creating new instances of the Character, Status, BottleStatus, EndbossStatus, CoinStatus, Coins, Bottle, and Endboss objects. */

  /* Draws the current state of the game onto the canvas. */
  draw() {
    this.clearCanvas();
    if (!this.isGameStarted) {
      this.start.drawStartScreen(this.ctx);
    } else {
      this.drawGameWorld();
    }
    requestAnimationFrame(() => this.draw());
  }

  /* Clears the entire canvas area by using the clearRect method on the 2D context. */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /* Draws the current state of the game world onto the canvas.*/
  drawGameWorld() {
    this.setCamera();
    this.drawBackground();
    this.drawUI();
    this.drawForeground();
  }

  /* Sets the camera to follow the character by adjusting the canvas origin.*/
  setCamera() {
    this.camera_x =
      -this.character.x + this.canvas.width * 0.15 - this.character.width / 2;
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
  }

  /* Draws the background and clouds of the current level, resetting the canvas origin afterward.*/
  drawBackground() {
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.clouds);
    this.ctx.restore();
  }

  /* Draws the UI elements (status bar, bottles, coins, endboss) on the canvas. */
  drawUI() {
    this.addtoMap(this.status);
    this.addtoMap(this.bottlestats);
    this.addtoMap(this.coin);
    this.addtoMap(this.bossStats);
  }

  /** Draws the foreground objects (character, enemies, bottles, items) on the canvas, adjusting for the camera's position.*/
  drawForeground() {
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addtoMap(this.character);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.bottle);
    this.addObjectstoMap(this.thrownBottles);
    this.addObjectstoMap(this.items);
    this.ctx.restore();
  }

  /* Runs the game by checking for events (e.g., throwing bottles, collecting items, */
  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectCoin();
      this.checkCollectBottle();
    }, 200);
    setInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
      }
    }, 50);
  }

  /* Checks for collisions between the character and enemies, and between thrown bottles and enemies and the endboss. */
  checkCollisions() {
    if (!this.level?.enemies) return;
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
      this.thrownBottles.forEach((bottle) => {
        if (bottle.isColliding(enemy)) this.checkChickenhit(enemy, bottle);
        if (this.endboss && bottle.isColliding(this.endboss))
          this.checkBossHit(bottle);
      });
    });
    if (this.endboss) this.checkEndbossCollision();
  }

  /* Checks if the character collides with an enemy. */
  checkEnemyCollision(enemy) {
    if (enemy.dead) return;
    if (!this.character.isColliding(enemy)) return;
    const { y, height } = this.character.getHitbox();
    const charBottom = y + height;
    const enemyTop = enemy.getHitbox().y;
    if (charBottom - 10 < enemyTop) {
      this.checkChickenhit(enemy);
      this.character.jumpOnEnemy();
    } else {
      this.character.hit();
      this.audio.playHitSound();
      this.status.setPrecentage(this.character.energy);
    }
  }

  /** Handles enemy hits by the character or a thrown bottle, removing them after a delay. */
  checkChickenhit(enemy, bottle) {
    if (typeof enemy.hitChicken === "function") {
      enemy.hitChicken();
    } else if (typeof enemy.hit === "function") {
      enemy.hit();
    }
    if (bottle && typeof bottle.bottleSplash === "function") {
      bottle.bottleSplash();
    }
    setTimeout(() => {
      this.removeEnemy(enemy);
      this.removeBottle(bottle);
    }, 500);
  }

  /* Handles collisions between the character and the endboss, updating energy and stats accordingly. */
  checkEndbossCollision() {
    if (!this.endboss || !this.character.isColliding(this.endboss)) return;
    const charBox = this.character.getHitbox();
    const bossBox = this.endboss.getHitbox();
    if (charBox.y + charBox.height - 10 < bossBox.y) {
      this.character.jumpOnEnemy();
      this.endboss.hit();
      this.bossStats.setPrecentage(this.endboss.energy);
    } else {
      this.character.hit();
      this.audio.playHitSound();
      this.status.setPrecentage(this.character.energy);
    }
  }

  /* Checks if a bottle hits the endboss, updates stats, and removes the bottle after a delay.*/
  checkBossHit(bottle) {
    if (typeof this.endboss.hit === "function") {
      this.endboss.hit();
      this.bossStats.setPrecentage(this.endboss.energy);
    }
    if (bottle && typeof bottle.bottleSplash === "function") {
      bottle.bottleSplash();
      setTimeout(() => {
        if (bottle) {
          this.removeBottle(bottle);
        }
      }, 800);
    }
  }
  /** Handles bottle throwing based on keyboard input and available munition, updating stats and checking collisions */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.munition > 0) {
      let offsetX = this.character.otherDirection ? -50 : 50;
      let thrownBottle = new ThrowableObject(
        this.character.x + offsetX,
        this.character.y + 50
      );
      this.thrownBottles.push(thrownBottle);
      this.bottlestats.setMunition(--this.character.munition);
      setTimeout(() => {
        if (thrownBottle.isColliding(this.endboss))
          this.checkBossHit(thrownBottle);
      }, 500);
    }
  }

  /** Checks if the player has collided with any coins on the map. If a collision occurs, the player's money count is incremented and the coin is removed from the items array. */
  checkCollectCoin() {
    this.items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.character.collectCoin();
        this.coin.setCash(this.character.money);
        this.items.splice(index, 1);
        this.audio.playCoinSound();
      }
    });
  }

  /** Checks if the player has collided with any bottles on the map. If a collision occurs, the player's munition count is incremented and the bottle is removed from the bottle array. */
  checkCollectBottle() {
    this.bottle.forEach((bottle, index) => {
      if (!bottle.isThrown && this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.bottlestats.setMunition(this.character.munition);
        this.bottle.splice(index, 1);
      }
    });
  }

  /* Removes the given enemy object from the level's enemies array. */
  removeEnemy(enemy) {
    if (enemy instanceof Endboss && !this.endboss.dead) {
      return;
    }
    let indexToRemove = this.level.enemies.indexOf(enemy);
    if (indexToRemove !== -1) {
      this.level.enemies.splice(indexToRemove, 1);
    }
  }

  /** Removes the given bottle object from the thrownBottles array. */
  removeBottle(bottle) {
    const index = this.thrownBottles.indexOf(bottle);
    if (index > -1) {
      this.thrownBottles.splice(index, 1);
    }
  }

  /** Generates 3 new coin objects and adds them to the items array. */
  getCoins(count = 6) {
    for (let i = 0; i < count; i++) {
      const coin = new Coins();
      this.items.push(coin);
    }
  }

  /** Generates 3 new Bottle objects and adds them to the bottle array. */
  getBottles(count = 6) {
    for (let i = 0; i < count; i++) {
      const bottle = new Bottle();
      this.bottle.push(bottle);
    }
  }

  /** @param {MovableObject[]} objects The array of MovableObjects to be added to the map.*/
  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addtoMap(obj);
    });
  }

  /** Adds a MovableObject to the map by calling its draw method and creating a collision rectangle at its position. */
  addtoMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    this.ctx.beginPath();
    this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  /** @param {MovableObject} mo The MovableObject whose image is to be flipped.*/
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /** @param {MovableObject} mo The MovableObject whose image was flipped. */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
