class DrawableObject {
  img;
  imageCache = {};
  x = 120;
  y = 180;
  height = 250;
  width = 100;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Draws the image of the DrawableObject onto the canvas context at its current position.
   * If the image is not loaded, a warning is logged to the console.
   * In case of an error during drawing, a warning and the image source are logged.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas where the image will be drawn.
   */

  draw(ctx) {
    try {
      if (this.img) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        console.warn();
      }
    } catch (error) {}
  }

  /**
   * Plays an animation defined by the given array of image paths.
   * The animation is played by iterating through the array, loading the image from the cache and assigning it to the img property.
   * The currentImage property is incremented with each call, wrapping around to the beginning of the array once it reaches the end.
   *
   * @param {string[]} images - An array of image paths
   */
  playAnimate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Determines whether this object is colliding with another MovableObject.
   * The function checks for intersection between the hitboxes of the two objects.
   *
   * @param {MovableObject} mo - The other MovableObject to check for collision against.
   * @returns {boolean} - True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Calculates the hitbox of the object based on its position and dimensions, taking the offset into account.
   * The hitbox is an object with the properties x, y, width and height, which describe the position and size of the hitbox.
   * The hitbox is used to check for collisions with other objects.
   * @returns {Object} - The hitbox of the object.
   */
  getHitbox(mo) {
    return (
      this.speedY < 0 &&
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + 40 &&
      this.y + this.offset.top < mo.y
    );
  }

  /**
   * Loads an array of images into the image cache.
   * @param {string[]} arr - An array of image paths
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Loads a single image from the specified path and assigns it to the img property.
   * This method creates a new Image object and sets its source to the provided path.
   *
   * @param {string} path - The path of the image to load.
   */

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
