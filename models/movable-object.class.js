class MovableObject extends DrawableObject {
  speed = 2;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  lastHit = 0;
  money = 0;
  munition = 0;
  lastMove = 0;
  lastHitTime = 0;
  hitCooldown = 100;

  /**
   * Applies gravity to the object. If the object is above the ground or
   * falling, this function will make the object fall down the screen.
   *
   * @memberof MovableObject
   */
  applyGravity() {
    setInterval(() => {
      if (this.IsAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Determines if the object is above the ground level.
   * For ThrowableObject instances, it always returns true.
   * For other instances, it returns true if the object's y-coordinate is less than 180.
   * @returns {boolean} True if the object is above ground level, otherwise false.
   */

  IsAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks if the energy of the character is 0 or less and if true, sets the
   * characters dead status to true and logs "Character dead" to the console.
   */
  isDead() {
    if (world.character.energy <= 0) {
      world.character.dead = true;
      console.log("Character dead");
    }
  }

  /**
   * Moves the object to the right by its speed.
   * Sets otherDirection to false and updates the lastMove
   * property to the current time.
   * @returns {void}
   */

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
    this.lastMove = new Date().getTime();
  }

  /**
   * Moves the object to the left by its speed. Also updates the lastMove
   * property to the current time.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  /**
   * Handles the hit logic for the object.
   * @param {number} currentTime - The current timestamp.
   * @returns {void}
   */
  hit() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHitTime >= this.hitCooldown) {
      this.energy -= 2;
      if (this.energy < 0) {
        this.energy = 0;
        this.dead = true;
      } else {
        this.lastHit = currentTime; // Update the last hit timestamp
        this.lastHitTime = currentTime; // Update the cooldown timestamp
      }
    }
  }

  /**
   * Increments the object's money count by one.
   * If the money count exceeds 0, it is set to 0.
   * This function is typically called when the object collects a coin on the map.
   */
  collectCoin() {
    this.money += 1;
    if (this.money < 0) {
      this.money = 0;
    }
  }

  /**
   * Increments the object's munition count by one.
   * If the munition count exceeds 0, it is set to 0.
   * This function is typically called when the object collects a bottle on the map.
   */
  collectBottle() {
    this.munition += 1;
    if (this.munition < 0) {
      this.munition = 0;
    }
  }

  /**
   * Determines if the object is currently hurt based on the time elapsed since the last hit.
   * @return {boolean} True if the object has been hurt within the last second, false otherwise.
   */

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Calculates the time in seconds since the object last moved.
   * @return {number} The idle time in seconds.
   */

  getIdleTime() {
    return (new Date().getTime() - this.lastMove) / 1000;
  }

  /**
   * Checks if the object has been idle for more than 3 seconds.
   * @return {boolean} True if the object has been idle for more than 3 seconds, false otherwise.
   */
  isIdle() {
    return this.getIdleTime() > 3;
  }

  /**
   * Checks if the object has been idle for more than 15 seconds.
   * @return {boolean} True if the object has been idle for more than 15 seconds, false otherwise.
   */
  isLongIdle() {
    return this.getIdleTime() > 15;
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

  /**
   * Adds an array of MovableObjects to the map by calling addtoMap on each object in the array.
   * @param {MovableObject[]} objects The array of MovableObjects to be added to the map.
   */
  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addtoMap(obj);
    });
  }
}
