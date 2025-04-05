class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Constructs a new BackgroundObject instance.
   * Loads the specified image and sets the initial position.
   *
   * @param {string} imagePath - The path to the image.
   * @param {number} x - The initial x-coordinate of the background object.
   */

  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
