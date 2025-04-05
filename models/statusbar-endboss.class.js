class EndbossStatus extends DrawableObject {
  imgStatus = [
    "img/7_statusbars/2_statusbar_endboss/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green100.png",
  ];

  /**
   * Creates a new EndbossStatus object.
   * This object will have the width of 200px and the height of 60px.
   * It will be placed at the x position of 500px and the y position of 0px.
   * The precentage of the endboss status bar will be set to 100.
   */
  constructor() {
    super();
    this.loadImages(this.imgStatus);
    this.loadImage(this.imgStatus[5]);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPrecentage(100);
  }

  /**
   * Sets the precentage of the endboss status bar.
   * This will update the image displayed in the status bar.
   * @param {number} precentage the precentage of the endboss status bar.
   */
  setPrecentage(precentage) {
    this.precentage = precentage;
    let path = this.imgStatus[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the index of the image in the this.imgStatus array, depending on the precentage value.
   * The index is determined by the following conditions:
   * - precentage == 100: index = 5
   * - precentage > 80: index = 4
   * - precentage > 60: index = 3
   * - precentage > 40: index = 2
   * - precentage > 20: index = 1
   * - precentage >= 0: index = 0
   * @returns {number} the index of the image in the this.imgStatus array
   */
  resolveImageIndex() {
    if (this.precentage == 100) {
      return 5;
    } else if (this.precentage > 80) {
      return 4;
    } else if (this.precentage > 60) {
      return 3;
    } else if (this.precentage > 40) {
      return 2;
    } else if (this.precentage > 20) {
      return 1;
    } else if (this.precentage >= 0) {
      return 0;
    }
  }
}
