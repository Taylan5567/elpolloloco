class Start extends DrawableObject {
  startButton = {
    x: 20,
    y: 20,
    width: 120,
    height: 50,
  };

  x = 0;
  y = 0;

  /**
   * Creates a new Start object.
   *
   * @param {number} x - The x coordinate of the start screen.
   * @param {number} y - The y coordinate of the start screen.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
    this.x = x;
    this.y = y;
    this.height = 480;
    this.width = 720;
  }

  /**
   * Draws the start screen on the given 2D context.
   * @param {CanvasRenderingContext2D} ctx - The 2D context to draw on.
   */
  drawStartScreen(ctx) {
    this.draw(ctx);
  }
}
