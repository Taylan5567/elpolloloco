class Endscreen extends DrawableObject {
  gameOverImage = "img/9_intro_outro_screens/game_over/game over!.png";
  youWonImage = "img/You won, you lost/You Win A.png";

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.gameOverImage);
    this.loadImage(this.youWonImage);
  }

  endscreenShowWin() {
    this.loadImage(this.youWonImage);
  }

  endscreenShowLose() {
    this.loadImage(this.gameOverImage);
  }

  drawEndscreen(ctx) {
    this.draw(ctx);
  }
}
