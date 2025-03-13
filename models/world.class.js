class World {
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
  isGameStarted = false;
  gameOver = false;
  gameWon = false;               
  hadFirstContact = false;
  bossMusicStarted = false;
  endboss = null;
  muteIcon = new Image();
  unmuteIcon = new Image();
  muteButton = { x: 650, y: 420, width: 50, height: 50 };
  endscreen = new Endscreen(0, 0);

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.muteIcon.src = 'img/10_icons/mute.png';
    this.unmuteIcon.src = 'img/10_icons/volume.png';
    this.canvas.addEventListener("click", this.handleCanvasClick.bind(this));
    this.draw();
    this.setWorld();
    this.run();
    this.getCoins();
    this.getBottles();
    this.checkBossfight();
  }

  setWorld() {
    this.character.world = this;
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach(enemy => enemy.world = this);
    }
  }

  startGame() {
    this.isGameStarted = true;
    this.audio.playBackgroundMusic();
    initLevel();             
    this.level = levelOne;  
    this.setWorld();
    this.audio.playAudio();
    this.endboss = new Endboss();
    this.endboss.world = this;
  }

  restartGame() {
    this.isGameStarted = false;
    this.gameOver = false;
    this.gameWon = false;
    this.resetGameData();
    initLevel();
    this.level = levelOne;
    this.setWorld();
    this.audio.resetAudio();
    this.endscreen = null;
  }

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

  draw() {
    this.clearCanvas();
    if (!this.isGameStarted) {
      this.start.drawStartScreen(this.ctx);
    } else if (this.gameOver) {
      this.endscreen = new Endscreen(0, 0, this.gameOver);
      if (!this.endscreen) {
        this.endscreen = new Endscreen(0, 0, this.gameWon);
      }
      this.endscreen.drawEndscreen(this.ctx);
    } else {
      this.drawGameWorld();
    }
    requestAnimationFrame(() => this.draw());
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGameWorld() {
    this.setCamera();
    this.drawBackground();
    this.drawUI();
    this.drawForeground();
  }

  setCamera() {
    this.camera_x = -this.character.x + this.canvas.width * 0.15 - this.character.width / 2;
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
  }

  drawBackground() {
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.clouds);
    this.ctx.restore();
  }

  drawUI() {
    this.addtoMap(this.status);
    this.addtoMap(this.bottlestats);
    this.addtoMap(this.coin);
    this.addtoMap(this.bossStats);
  }

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



  handleCanvasClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    if (!this.isGameStarted) {
      this.startGame();
    } else if (this.gameOver) {
      this.restartGame();
    } 
  }


  run() {
    setInterval(() => {
      if (!this.gameOver) {
        this.checkThrowObjects();
        this.checkCollectCoin();
        this.checkCollectBottle();
        this.checkBossfight();
        if (this.character.energy <= 0) {
          this.gameOver = true;
          this.gameWon = false;
        }
        if (this.endboss && this.endboss.dead) {
          this.gameOver = true;
          this.gameWon = true;
        }
      }
    }, 200);

    setInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
      }
    }, 50);
  }

  checkCollisions() {
    if (!this.level || !this.level.enemies) return;
    this.level.enemies.forEach(enemy => {
      this.checkEnemyCollision(enemy);
      this.thrownBottles.forEach(bottle => {
        if (bottle.isColliding(enemy)) {
          this.checkChickenhit(enemy, bottle);
        }
      });
    });
    if (this.endboss) {
      this.thrownBottles.forEach(bottle => {
        if (bottle.isColliding(this.endboss)) {
          this.checkBossHit(bottle);
        }
      });
      this.checkEndbossCollision();
    }
  }

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

  checkChickenhit(enemy, bottle) {
    if (typeof enemy.hitChicken === 'function') {
      enemy.hitChicken();
    } else if (typeof enemy.hit === 'function') {
      enemy.hit();
    }
    setTimeout(() => {
      this.removeEnemy(enemy);
    }, 500);
    if (bottle) {
      this.removeBottle(bottle);
    }
  }

  checkEndbossCollision() {
    if (!this.endboss || !this.character.isColliding(this.endboss)) return;
    const charBox = this.character.getHitbox();
    const bossBox = this.endboss.getHitbox();
    if ((charBox.y + charBox.height) - 10 < bossBox.y) {
      this.character.jumpOnEnemy();
      this.endboss.hit();
      this.bossStats.setPrecentage(this.endboss.energy);
    } else {
      this.character.hit();
      this.audio.playHitSound();
      this.status.setPrecentage(this.character.energy);
    }
  }

  checkBossHit(bottle) {
    if (typeof this.endboss.hit === 'function') {
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

  checkThrowObjects() {
    if (this.keyboard.D && this.character.munition > 0) {
      let offsetX = 50, offsetY = 50;
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

  checkCollectBottle() {
    this.bottle.forEach((bottle, index) => {
      if (!bottle.isThrown && this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.bottlestats.setMunition(this.character.munition);
        this.bottle.splice(index, 1);
      }
    });
  }

  checkBossfight() {
    if (!this.endboss) return;
    const distanceX = Math.abs(this.endboss.x - this.character.x);
    if (distanceX < 400 && !this.bossMusicStarted) {
      this.hadFirstContact = true;
      this.bossMusicStarted = true;
      this.audio.playEndbossSound();
    }
  }

  removeEnemy(enemy) {
    if (enemy instanceof Endboss && !this.endboss.dead) {
      return;
    }
    let indexToRemove = this.level.enemies.indexOf(enemy);
    if (indexToRemove !== -1) {
      this.level.enemies.splice(indexToRemove, 1);
    }
  }

  removeBottle(bottle) {
    const index = this.thrownBottles.indexOf(bottle);
    if (index > -1) {
      this.thrownBottles.splice(index, 1);
    }
  }

  getCoins() {
    for (let i = 0; i < 3; i++) {
      this.items.push(new Coins());
    }
  }

  getBottles() {
    for (let i = 0; i < 3; i++) {
      this.bottle.push(new Bottle());
    }
  }

  addObjectstoMap(objects) {
    objects.forEach(obj => {
      this.addtoMap(obj);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  drawBlueFrame(ctx, mo) {
    if (mo.getHitbox && (mo instanceof Character || mo instanceof Chicken || mo instanceof Bottle || mo instanceof Coins || mo instanceof Endboss)) {
      const box = mo.getHitbox();
      ctx.rect(box.x, box.y, box.width, box.height);
    }
  }
}
