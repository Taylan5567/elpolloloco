class Coins extends DrawableObject {
  offset = { top: 30, left: 30, right: 30, bottom: 30 };

  imgCoins = ["img/8_coin/coin_1.png", "img/8_coin/coin_1.png"];

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
