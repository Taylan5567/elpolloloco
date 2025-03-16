class Start extends DrawableObject {
  startButton = {
    x: 20,
    y: 20,
    width: 120,
    height: 50,
  };

  x = 0;
  y = 0;

  constructor(x, y) {
    super();
    this.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
    this.x = x;
    this.y = y;
    this.height = 480;
    this.width = 720;
  }

  drawStartScreen(ctx) {
    this.draw(ctx);
  }
}
