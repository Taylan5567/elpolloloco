class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2500;

  /**
   * Initializes a new instance of the Level class.
   *
   * @param {Array} enemies - The array of enemy objects for the level.
   * @param {Array} clouds - The array of cloud objects for the level.
   * @param {Array} backgroundObjects - The array of background objects for the level.
   */

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
