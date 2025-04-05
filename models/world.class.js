class World {
  /**
   *
   *
   * @memberof World
   */
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
  hadFirstContact = false;
  bossMusicStarted = false;
  endboss = new Endboss();

  /**
   * Creates an instance of World.
   * @param {*} canvas
   * @param {*} keyboard
   * @memberof World
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getCoins();
    this.getBottles();
    this.checkBossfight();
  }
  /**
   *
   *
   * @memberof World
   */
  setWorld() {
    this.character.world = this;
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach((enemy) => (enemy.world = this));
    }
  }

  /**
   * Initializes and starts the game by setting the game state to started,
   * playing background music, initializing the level and setting up the world
   * environment, including the endboss. The game loop is also started.
   *
   * @memberof World
   */
  startGame() {
    this.isGameStarted = true;
    this.audio.playBackgroundMusic();
    initLevel();
    this.level = levelOne;
    this.setWorld();
    this.audio.playAudio();
    this.endboss = new Endboss();
    this.endboss.world = this;
    this.run();
  }

  /**
   * Restarts the game by resetting the game state to default, clearing the
   * current level, resetting the game data, initializing a new level and
   * restarting the game loop.
   *
   * @memberof World
   */
  restartGame() {
    this.isGameStarted = false;
    this.gameOver = false;
    this.gameWon = false;
    this.hadFirstContact = false; // Reset boss fight trigger
    this.bossMusicStarted = false; // Reset boss music trigger
    this.resetGameData();
    initLevel();
    this.level = levelOne;
    this.setWorld();
    this.audio.resetAudio();
    this.endscreen = null;
  }

  /**
   * Stops the game by clearing the canvas, stopping the game loop, and
   * pausing the audio.
   *
   * @memberof World
   */
  stopGame() {
    this.isGameStarted = false;
    this.clearCanvas();
    this.audio.pauseAudio();
  }

  /**
   * Clears the canvas by getting the 2D context and using the clearRect method
   * to clear the entire canvas area.
   *
   * @memberof World
   */
  clearCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Loads an image from the given path and assigns it to the img property
   * of the World object.
   * @param {string} path - The path to the image.
   * @memberof World
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Resets the game data by creating new instances of the Character, Status, BottleStatus, EndbossStatus, CoinStatus, Coins, Bottle, and Endboss objects.
   * @memberof World
   */
  resetGameData() {
    this.character = new Character();
    this.status = new Status();
    this.bottlestats = new BottleStatus();
    this.bossStats = new EndbossStatus();
    this.coin = new CoinStatus();
    this.items = [new Coins()];
    this.bottle = [new Bottle()];
    this.thrownBottles = [];
    this.endboss = new Endboss();
  }

  /**
   * Draws the current state of the game onto the canvas.
   * Clears the canvas first, then checks if the game has started.
   * If not started, draws the start screen; otherwise, draws the game world.
   * Continuously requests the next animation frame to update the canvas.
   *
   * @memberof World
   */

  draw() {
    this.clearCanvas();
    if (!this.isGameStarted) {
      this.start.drawStartScreen(this.ctx);
    } else {
      this.drawGameWorld();
    }
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the entire canvas area by using the clearRect method on the 2D context.
   * This effectively removes all drawn content, making the canvas blank.
   *
   * @memberof World
   */

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the current state of the game world onto the canvas.
   * 
   * Sets the camera to the character's position, draws the background objects,
   * draws the UI elements, and draws the foreground objects.

   */
  drawGameWorld() {
    this.setCamera();
    this.drawBackground();
    this.drawUI();
    this.drawForeground();
  }

  /**
   * Sets the camera position to the character's position.
   * The camera_x variable is set to the character's x position minus half the canvas width plus a slight offset.
   * The context is saved and translated to the camera's position.
   * This effectively moves the origin of the canvas to the character's position, allowing the game world to move as the character moves.
   */
  setCamera() {
    this.camera_x =
      -this.character.x + this.canvas.width * 0.15 - this.character.width / 2;
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws the background objects and clouds of the current level onto the canvas.
   * This function is called by drawGameWorld() after the camera position has been set.
   * The context is restored after drawing the background objects and clouds to reset the origin of the canvas.
   */
  drawBackground() {
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.clouds);
    this.ctx.restore();
  }

  /**
   * Draws the user interface elements onto the canvas.
   * This includes the status bar, bottle status, coin status,
   * and endboss status. These elements provide the player
   * with important game information.
   *
   * @memberof World
   */

  drawUI() {
    this.addtoMap(this.status);
    this.addtoMap(this.bottlestats);
    this.addtoMap(this.coin);
    this.addtoMap(this.bossStats);
  }

  /**
   * Draws the foreground objects of the game world onto the canvas.
   * This includes the character, enemies, bottles, thrown bottles, and items.
   * The context is translated to the camera's position before drawing the foreground objects.
   * After drawing the foreground objects, the context is restored to its original state.
   *
   * @memberof World
   */
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

  /**
   * Runs the game.
   * This function is called once when the game starts and
   * sets up two intervals to check for certain game events.
   * The first interval checks every 200ms for the following events:
   * - bottle throwing
   * - coin collecting
   * - bottle collecting
   * - boss fight
   * - game over
   * The second interval checks every 50ms for collisions between the
   * character and other objects in the game world.
   * @memberof World
   */
  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectCoin();
      this.checkCollectBottle();
      this.checkBossfight();
      this.checkGameOver();
    }, 200);

    setInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
      }
    }, 50);
  }

  /**
   * Checks for collisions between the character and enemies,
   * and between thrown bottles and enemies and the endboss.
   * If a collision is detected, the appropriate collision
   * handling function is called.
   * @memberof World
   */
  checkCollisions() {
    if (!this.level || !this.level.enemies) return;
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
      this.thrownBottles.forEach((bottle) => {
        if (bottle.isColliding(enemy)) {
          this.checkChickenhit(enemy, bottle);
        }
      });
    });
    if (this.endboss) {
      this.thrownBottles.forEach((bottle) => {
        if (bottle.isColliding(this.endboss)) {
          this.checkBossHit(bottle);
        }
      });
      this.checkEndbossCollision();
    }
  }

  /**
   * Checks if the character is colliding with an enemy.
   * If a collision is detected, checks if the character
   * is hitting the enemy from above or below. If above, the
   * character jumps on the enemy, otherwise the character
   * is hit and loses energy.
   * @param {Enemy} enemy - the enemy to check for collision
   * @memberof World
   */
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

  /**
   * Checks if the given enemy should be hit by the character or by a thrown bottle.
   * If the enemy is hit, removes the enemy after a short delay.
   * If the bottle is given, removes the bottle too.
   * @param {Enemy} enemy - the enemy to hit
   * @param {Bottle} bottle - the bottle that hit the enemy (optional)
   * @memberof World
   */
  checkChickenhit(enemy, bottle) {
    if (typeof enemy.hitChicken === "function") {
      enemy.hitChicken();
    } else if (typeof enemy.hit === "function") {
      enemy.hit();
    }
    setTimeout(() => {
      this.removeEnemy(enemy);
    }, 500);
    if (bottle) {
      this.removeBottle(bottle);
    }
  }

  /**
   * Checks the game state to determine if the game is over.
   * If the character is dead, triggers the game over screen.
   * If the endboss is dead, triggers the win screen.
   * This function should be called in the game loop.
   * @memberof World
   */

  checkGameOver() {
    if (world.character.dead) {
      this.showGameOverScreen();
    } else if (world.endboss.dead) {
      this.showWinScreen();
    }
  }

  /**
   * Shows the game over screen when the character has died.
   * Instantiates an Endscreen object and calls its endscreenShowLose method.
   * @memberof World
   */
  showGameOverScreen() {
    let endscreen = new Endscreen();
    endscreen.endscreenShowLose();
  }

  /**
   * Displays the win screen when the endboss has been defeated.
   * Instantiates an Endscreen object and calls its endscreenShowWin method.
   * @memberof World
   */

  showWinScreen() {
    let endscreen = new Endscreen();
    endscreen.endscreenShowWin();
  }

  /**
   * Checks for collision between the character and the endboss.
   * If a collision is detected, it determines if the character
   * jumped on the endboss or was hit by it.
   * If the character jumped on the endboss, it triggers the endboss's
   * hit method and sets the boss stats bar to the endboss's energy.
   * If the character was hit by the endboss, it triggers the character's
   * hit method and sets the status bar to the character's energy.
   * @memberof World
   */
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

  /**
   * Checks if the bottle hit the endboss.
   * If a collision is detected, it calls the endboss's hit method and
   * sets the boss stats bar to the endboss's energy.
   * It also removes the bottle after a short delay.
   * @param {Bottle} bottle The bottle object that needs to be checked for collision
   * @memberof World
   */
  checkBossHit(bottle) {
    if (typeof this.endboss.hit === "function") {
      this.endboss.hit();
      bottle.splashAnimate();
      this.bossStats.setPrecentage(this.endboss.energy);
    }
    setTimeout(() => {
      this.removeEnemy(this.endboss);
    }, 500);
    if (bottle) {
      this.removeBottle(bottle);
    }
  }

  /**
   * Checks if the throw action should be performed based on the keyboard input and character's available munition.
   * If the 'D' key is pressed and there is munition left, a new ThrowableObject is created and added to the thrownBottles array.
   * The character's munition count is decremented and updated in the bottlestats.
   * After a delay, it checks if the thrown bottle collides with the endboss and triggers the checkBossHit method if a collision occurs.
   * This function is typically called within the game loop to handle the bottle throwing mechanic.
   * @memberof World
   */

  checkThrowObjects() {
    if (this.keyboard.D && this.character.munition > 0) {
      let offsetX = 50,
        offsetY = 50;
      if (this.character.otherDirection) {
        offsetX = -50;
      }
      let thrownBottle = new ThrowableObject(
        this.character.x + offsetX,
        this.character.y + offsetY
      );
      this.thrownBottles.push(thrownBottle);
      this.character.munition--;
      this.bottlestats.setMunition(this.character.munition);
      setTimeout(() => {
        if (thrownBottle.isColliding(this.endboss)) {
          this.checkBossHit(thrownBottle);
        }
      }, 500);
    }
  }

  /**
   * Checks if the player has collided with any coins on the map. If a collision occurs, the player's money count is incremented and the coin is removed from the items array.
   * The coinstats are updated to reflect the increased money count. The coin sound effect is played when a coin is collected.
   * This function is typically called within the game loop to handle the coin collecting mechanic.
   * @memberof World
   */
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

  /**
   * Checks if the player has collided with any bottles on the map. If a collision occurs, the player's munition count is incremented and the bottle is removed from the bottle array.
   * The bottlestats are updated to reflect the increased munition count. This function is typically called within the game loop to handle the bottle collecting mechanic.
   * @memberof World
   */
  checkCollectBottle() {
    this.bottle.forEach((bottle, index) => {
      if (!bottle.isThrown && this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.bottlestats.setMunition(this.character.munition);
        this.bottle.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the player has entered the boss fight area.
   * If the player is close enough to the endboss and this is the first time they have entered the area,
   * the boss music is started and the hadFirstContact flag is set to true.
   * @memberof World
   */
  checkBossfight() {
    if (!this.endboss) return;
    const distanceX = Math.abs(this.endboss.x - this.character.x);
    if (distanceX < 400 && !this.bossMusicStarted && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.bossMusicStarted = true;
      this.audio.playEndbossSound();
    }
  }

  /**
   * Removes the given enemy object from the level's enemies array.
   * If the enemy is an instance of Endboss and the endboss is not dead, it does nothing.
   * @param {Enemy} enemy The enemy object to be removed from the level's enemies array.
   * @memberof World
   */
  removeEnemy(enemy) {
    if (enemy instanceof Endboss && !this.endboss.dead) {
      return;
    }
    let indexToRemove = this.level.enemies.indexOf(enemy);
    if (indexToRemove !== -1) {
      this.level.enemies.splice(indexToRemove, 1);
    }
  }

  /**
   * Removes the given bottle object from the thrownBottles array.
   * If the bottle is not found in the array, it does nothing.
   * @param {Bottle} bottle The bottle object to be removed from the thrownBottles array.
   * @memberof World
   */
  removeBottle(bottle) {
    const index = this.thrownBottles.indexOf(bottle);
    if (index > -1) {
      this.thrownBottles.splice(index, 1);
    }
  }

  /**
   * Generates 3 new coin objects and adds them to the items array.
   * @memberof World
   */
  getCoins() {
    for (let i = 0; i < 3; i++) {
      this.items.push(new Coins());
    }
  }

  /**
   * Generates 3 new Bottle objects and adds them to the bottle array.
   * @memberof World
   */
  getBottles() {
    for (let i = 0; i < 3; i++) {
      this.bottle.push(new Bottle());
    }
  }

  /**
   * Adds an array of MovableObjects to the map by calling addtoMap on each object in the array.
   * @param {MovableObject[]} objects The array of MovableObjects to be added to the map.
   * @memberof World
   */
  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addtoMap(obj);
    });
  }

  /**
   * Adds a MovableObject to the map by calling its draw method and creating a collision rectangle at its position.
   * If the object is facing left, the image is flipped before drawing and flipping back afterwards.
   * @param {MovableObject} mo The MovableObject to be added to the map.
   * @memberof World
   */
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

  /**
   * Flips the image horizontally by saving the current context, translating the canvas,
   * and scaling it negatively along the x-axis. This is typically used to draw a
   * MovableObject that is facing the opposite direction.
   * @param {MovableObject} mo The MovableObject whose image is to be flipped.
   * @memberof World
   */

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the effects of flipImage by flipping the x coordinate back and restoring the canvas context.
   * This is typically used to draw a MovableObject that is facing the opposite direction.
   * @param {MovableObject} mo The MovableObject whose image was flipped.
   * @memberof World
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Draws a blue frame around the hitbox of a MovableObject on the provided canvas context.
   * This is applicable for instances of Character, Chicken, Bottle, Coins, or Endboss.
   * The function checks if the MovableObject has a getHitbox method and then draws the
   * rectangle representing the hitbox on the canvas.
   * @param {CanvasRenderingContext2D} ctx The canvas rendering context where the frame will be drawn.
   * @param {MovableObject} mo The MovableObject whose hitbox will be framed.
   * @memberof World
   */

  drawBlueFrame(ctx, mo) {
    if (
      mo.getHitbox &&
      (mo instanceof Character ||
        mo instanceof Chicken ||
        mo instanceof Bottle ||
        mo instanceof Coins ||
        mo instanceof Endboss)
    ) {
      const box = mo.getHitbox();
      ctx.rect(box.x, box.y, box.width, box.height);
    }
  }
}
