class Status extends DrawableObject {
  imgStatus = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  precentage = 100;

  /**
   * Initializes the status bar with the green health bar images.
   * Calls the constructor of the parent class, loads the images from
   * the `imgStatus` array, and sets the initial position, width, and
   * height of the status bar. Finally, sets the initial percentage to
   * 100 with the `setPrecentage` method.
   */
  constructor() {
    super();
    this.loadImages(this.imgStatus);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPrecentage(100);
  }

  /**
   * Updates the percentage and sets the corresponding image.
   * This function updates the `precentage` attribute with the given value
   * and determines the appropriate image path from the `imgStatus` array
   * using `resolveImageIndex`. The image is then set from the `imageCache`.
   * @param {number} precentage - The new percentage value to set.
   */
  setPrecentage(precentage) {
    this.precentage = precentage;
    let path = this.imgStatus[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current percentage value.
   * The function returns an integer between 0 and 5, corresponding to
   * specific ranges of the percentage attribute. This index can be used
   * to select an appropriate image from the imgStatus array.
   * @returns {number} An index from 0 to 5 corresponding to the percentage range.
   */
  resolveImageIndex() {
    if (this.precentage == 100) {
      return 5;
    } else if (this.precentage >= 80) {
      return 4;
    } else if (this.precentage >= 60) {
      return 3;
    } else if (this.precentage >= 40) {
      return 2;
    } else if (this.precentage >= 20) {
      return 1;
    } else if (this.precentage >= 0) {
      return 0;
    }
  }
}
