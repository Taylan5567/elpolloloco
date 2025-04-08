let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by getting the canvas element and creating a new World object.
 * This is the entry point of the game.
 * @function init
 *
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  if (world.audio && typeof world.audio.pauseAudio !== "function") {
    world.audio.pauseAudio = function () {
      console.log("Audio paused");
    };
    world.audio.playAudio = function () {
      console.log("Audio played");
    };
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Starts the game by calling the startGame method of the World object and
 * making the START button disappear and the MUTE button appear. Also, it
 * makes the control buttons for mobile devices appear or disappear
 * depending on the height of the window.
 * @function startEngine
 */
function startEngine() {
  world.startGame();
  document.getElementById("start").style.display = "none";
  document.getElementById("mute").style.display = "block";

  setInterval(() => {
    if (window.innerHeight < 600) {
      document.getElementById("right").style.display = "block";
      document.getElementById("left").style.display = "block";
      document.getElementById("jump").style.display = "block";
      document.getElementById("throw").style.display = "block";
    } else {
      document.getElementById("right").style.display = "none";
      document.getElementById("left").style.display = "none";
      document.getElementById("jump").style.display = "none";
      document.getElementById("throw").style.display = "none";
    }
  }, 1);
}

/**
 * Restarts the game by calling the restartGame method of the World object.
 * This is used after the game is over (either by winning or losing) to
 * reset the game state and prepare the game for a new start.
 * @function gameOver
 */
function gameOver() {
  world.restartGame();
}

/**
 * Handles the touchstart and touchend events for the "left" button in
 * mobile mode. When the button is pressed, it sets the LEFT key to true, and
 * when the button is released, it sets the LEFT key to false. This
 * allows the player to move left when the button is pressed.
 */
function moveLeftMobile() {
  document.getElementById("left").addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });
}

function moveRightMobile() {
  document.getElementById("right").addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });
}

/**
 * Handles the touchstart and touchend events for the "jump" button in
 * mobile mode. When the button is pressed, it sets the SPACE key to true, and
 * when the button is released, it sets the SPACE key to false. This
 * allows the player to jump when the button is pressed.
 */
function jumpMobile() {
  document.getElementById("jump").addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });
  document.getElementById("jump").addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });
}

/**
 * Handles the touchstart and touchend events for the "throw" button in
 * mobile mode. When the button is pressed, it sets the D key to true, and
 * when the button is released, it sets the D key to false. This
 * allows the player to throw a fireball when the button is pressed.
 */
function throwMobile() {
  document.getElementById("throw").addEventListener("touchstart", () => {
    keyboard.D = true;
  });
  document.getElementById("throw").addEventListener("touchend", () => {
    keyboard.D = false;
  });
}

/**
 * Toggles the mute state of the game's background music. When called,
 * it checks the current volume of the background music. If muted (volume is 0),
 * it sets the volume back to 1 and updates the mute button icon to indicate sound is on.
 * If not muted, it mutes the background music by setting the volume to 0 and updates
 * the mute button icon to indicate sound is off.
 */

function muteGame() {
  const muteButton = document.getElementById("mutebutton");
  const isMuted = world.audio.backgroundMusic.volume === 0;

  world.audio.backgroundMusic.volume = isMuted ? 1 : 0;
  muteButton.src = isMuted
    ? "/img/10_icons/volume.png"
    : "/img/10_icons/mute.png";
  isMuted ? world.audio.playAudio() : world.audio.pauseAudio();
}

/**
 * Checks if the game has ended either by the player winning or losing, and
 * displays the respective screens. If the player has won, the endboss is dead.
 * If the player has lost, the character is dead. The function is called in the
 * game loop and is used to stop the game when it has ended.
 */
function checkGameEnd() {
  if (!world || !world.character || !world.endboss) {
    return;
  }
  if (world.character.dead) {
    checkCharacterDead();
    clearInterval(endGameInterval);
  } else if (world.endboss.dead) {
    checkBossDead();
    clearInterval(endGameInterval);
  }
}
const endGameInterval = setInterval(() => {
  checkGameEnd();
}, 100);

/**
 * Checks if the boss is dead and handles the endgame logic for winning.
 */
function checkBossDead() {
  const youWinElement = document.getElementById("youwin");
  if (youWinElement) {
    youWinElement.style.display = "block";
    document.getElementById("youwinbackground").style.display = "block";
    document.getElementById("mute").style.display = "none";
    document.getElementById("gameover").style.display = "block";
    hideGameControls();
    world.stopGame();
  }
}

/**
 * Checks if the character is dead and handles the endgame logic for losing.
 */
function checkCharacterDead() {
  const youLoseElement = document.getElementById("youlost");
  if (youLoseElement) {
    youLoseElement.style.display = "block";
    document.getElementById("youwinbackground").style.display = "block";
    document.getElementById("mute").style.display = "none";
    document.getElementById("gameover").style.display = "block";
    hideGameControls();
    world.stopGame();
  }
}

/**
 * Hides all game controls (right, left, jump, throw) by setting their
 * display property to "none". This is used to stop the game when the
 * boss or the character are dead.
 */
function hideGameControls() {
  document.getElementById("right").style.display = "none";
  document.getElementById("left").style.display = "none";
  document.getElementById("jump").style.display = "none";
  document.getElementById("throw").style.display = "none";
}

/**
 * Stops the game by calling the stopGame() method on the world object
 * when the boss or the character are dead.
 */
function gameStop() {
  if (world.endboss.dead || world.character.dead) {
    world.stopGame();
  }
}

/**
 * Resets the game state by hiding certain UI elements, resetting the world state,
 * and preparing the game for a new start. Specifically, it hides win/lose screens,
 * ensures the mute button is visible and set to unmuted, displays the start button,
 * and resets the `hadFirstContact` state in the world.
 */
function restartGame() {
  world.restartGame();
  ["youwin", "youlost", "youwinbackground", "gameover"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });
  const muteButton = document.getElementById("mute");
  if (muteButton) muteButton.style.display = "block";
  const muteIcon = document.getElementById("mutebutton");
  if (muteIcon) muteIcon.src = "../img/10_icons/volume.png";
  const startButton = document.getElementById("start");
  if (startButton) startButton.style.display = "block";
  world.hadFirstContact = false;
}
