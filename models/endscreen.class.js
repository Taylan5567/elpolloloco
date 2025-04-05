class Endscreen extends DrawableObject {
  gameOverImage = "img/9_intro_outro_screens/game_over/game over!.png";
  youWonImage = "img/You won, you lost/You Win A.png";

  /**
   * Constructor for Endscreen.
   * @param {number} x - The x position of the endscreen.
   * @param {number} y - The y position of the endscreen.
   * @constructor
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.gameOverImage);
    this.loadImage(this.youWonImage);
  }

  /**
   * Sets the endscreen image to the win image.
   * Called when the game ends with a win.
   */
  endscreenShowWin() {
    this.loadImage(this.youWonImage);
  }

  /**
   * Sets the endscreen image to the game over image.
   * Called when the game ends with a loss.
   */
  endscreenShowLose() {
    this.loadImage(this.gameOverImage);
  }

  /**
   * Draws the endscreen on the given 2D context.
   * @param {CanvasRenderingContext2D} ctx - The 2D context to draw on.
   */
  drawEndscreen(ctx) {
    this.draw(ctx);
  }
}
