class Cloud extends MovableObject {
  y = 0;
  height = 300;
  width = 500;

  /**
   * Creates a new Cloud instance, loading the initial image and setting
   * the initial position and animation. The x-coordinate is randomized
   * between 0 and 500, and the cloud is animated to move across the screen.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500;
    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left at a consistent speed.
   * This function uses setInterval to repeatedly call the moveLeft
   * method, making the cloud appear to move across the screen. The
   * animation runs at a frame rate of 15 frames per second.
   */

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 15);
  }
}
