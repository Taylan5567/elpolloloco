class CoinStatus extends DrawableObject {
  imgMoney = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  money = 0;

  /**
   * Initializes a new instance of the CoinStatus class. Loads images for the
   * coin status bar and sets the initial position and dimensions. Sets the
   * initial cash amount to 0.
   */
  constructor() {
    super();
    this.loadImages(this.imgMoney);
    this.x = 30;
    this.y = 43;
    this.width = 200;
    this.height = 60;
    this.setCash(0);
  }

  /**
   * Updates the cash amount and the displayed coin image based on the current money count.
   * Sets the money field to the provided amount, resolves the appropriate image index
   * for the coin status bar, and updates the image to reflect the current money status.
   *
   * @param {number} money - The current money count to set and display on the status bar.
   */
  setCash(money) {
    this.money = money;
    let path = this.imgMoney[this.resolveImageIndexCoin()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index for the coin status bar based on the current money count.
   * Returns an index into the imgMoney array that corresponds to the current money status.
   * @returns {number} The image index for the current money status.
   */
  resolveImageIndexCoin() {
    if (this.money == 0) {
      return 0;
    } else if (this.money == 1) {
      return 1;
    } else if (this.money == 2) {
      return 2;
    } else if (this.money == 3) {
      return 3;
    } else if (this.money == 4) {
      return 4;
    } else if (this.money >= 5) {
      return 5;
    }
  }
}
