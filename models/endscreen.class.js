class Endscreen extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  world; 
  
  againButton = {
    x: 300,
    y: 400,
    width: 120,
    height: 50
  };

  gameOverImage = 'img/9_intro_outro_screens/game_over/game over!.png';
  youWonImage = 'img/You won, you lost/You Win A.png';

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.gameOverImage);
    this.loadImage(this.youWonImage);
  }

  endscreenShow() {
    if (this.world.character.isDead()) {
      this.endscreenShowLose();
    }
      else if (!this.world.character.isDead()) {
        this.endscreenShowWin();
    }
  }

  endscreenShowWin() {
    this.loadImage(this.youWonImage);
  }

  endscreenShowLose() {
    this.loadImage(this.gameOverImage);
  }

  drawEndscreen(ctx) {
    this.draw(ctx);
    ctx.fillStyle = "#cf6113";
    ctx.fillRect(this.againButton.x, this.againButton.y, this.againButton.width, this.againButton.height);
    ctx.fillStyle = "black";
    ctx.font = "20px Bangers";
    ctx.textAlign = "center";
    ctx.fillText("Again", this.againButton.x + this.againButton.width / 2, this.againButton.y + this.againButton.height / 2 + 7);
  }

  isAgainButtonClicked(clickX, clickY) {
    return (
      clickX >= this.againButton.x &&
      clickX <= this.againButton.x + this.againButton.width &&
      clickY >= this.againButton.y &&
      clickY <= this.againButton.y + this.againButton.height
    );
  }
}
