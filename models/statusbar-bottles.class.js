class BottleStatus extends DrawableObject {
  imgMunition = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  munition = 0;

  /**
   * The constructor for the BottleStatus class.
   * This method is called when a new BottleStatus object is created.
   * It calls the superclass constructor, loads in the images for the bottle status bar,
   * sets its position, width, and height, and sets the munition value to 0.
   * @param {Number} munition - The amount of munition for the bottle status bar.
   */
  constructor() {
    super();
    this.loadImages(this.imgMunition);
    this.x = 30;
    this.y = 93;
    this.width = 200;
    this.height = 60;
    this.setMunition(0);
  }

  /**
   * Updates the munition value for the bottle status bar and sets the corresponding image.
   * This method changes the current munition count and updates the displayed image
   * in the status bar to reflect the new munition level.
   * @param {Number} munition - The new amount of munition to be set.
   */

  setMunition(munition) {
    this.munition = munition;
    let path = this.imgMunition[this.resolveImageIndexMunition()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index for the bottle status bar based on the current munition value.
   * This method determines which image to display in the status bar based on the current munition count.
   * The image index is used to set the corresponding image in the status bar.
   * @returns {Number} The image index for the bottle status bar based on the current munition value.
   */
  resolveImageIndexMunition() {
    if (this.munition == 0) {
      return 0;
    } else if (this.munition == 1) {
      return 1;
    } else if (this.munition == 2) {
      return 2;
    } else if (this.munition == 3) {
      return 3;
    } else if (this.munition == 4) {
      return 4;
    } else if (this.munition >= 5) {
      return 5;
    }
  }
}
