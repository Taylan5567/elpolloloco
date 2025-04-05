class Coins extends DrawableObject {
  offset = { top: 30, left: 30, right: 30, bottom: 30 };

  imgCoins = ["img/8_coin/coin_1.png", "img/8_coin/coin_1.png"];

  /**
   * Initializes a new instance of the Coins class. Loads the coin images and sets the initial
   * image to be displayed. Randomly sets the coin's x and y position within specified ranges.
   * Also sets the height and width of the coin.
   */

  constructor() {
    super();
    this.loadImages(this.imgCoins);
    this.loadImage(this.imgCoins[0]);

    this.x = 200 + Math.random() * 1000;
    this.y = 200 + Math.random() * 50;

    this.height = 100;
    this.width = 100;
  }
}
