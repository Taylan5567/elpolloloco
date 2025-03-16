class MovableObject extends DrawableObject {
  speed = 1;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  lastHit = 0;
  money = 0;
  munition = 0;
  lastMove = 0;

  applyGravity() {
    setInterval(() => {
      if (this.IsAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  IsAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
    this.lastMove = new Date().getTime();
  }

  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  hit() {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  collectCoin() {
    this.money += 1;
    if (this.money < 0) {
      this.money = 0;
    }
  }

  collectBottle() {
    this.munition += 1;
    if (this.munition < 0) {
      this.munition = 0;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  getIdleTime() {
    return (new Date().getTime() - this.lastMove) / 1000;
  }

  isIdle() {
    return this.getIdleTime() > 3;
  }

  isLongIdle() {
    return this.getIdleTime() > 15;
  }
}
