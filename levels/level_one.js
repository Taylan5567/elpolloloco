let levelOne;

/**
 * Initializes the first level of the game by creating a new Level object.
 * The level includes a set of enemies (Chickens, Endboss, TinyChickens),
 * clouds, and a sequence of background objects. The background objects
 * are created with specific images and positions to form the layered
 * visual environment of the level.
 */

function initLevel() {
  levelOne = new Level(
    [new Chicken(), new Endboss(), new TinyChicken()],
    [new Chicken(), new TinyChicken()],
    [new Chicken(), new TinyChicken()],
    [new Cloud()],
    [
      new BackgroundObject(
        "img/5_background/layers/air.png",
        -719,
        0,
        1200,
        400
      ),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0, 0, 1200, 400),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        719,
        0,
        1200,
        400
      ),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        719 * 2,
        0,
        1200,
        400
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        719 * 3,
        0,
        1200,
        400
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ]
  );
}
