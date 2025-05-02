let canvas;
let world;
let keyboard = new Keyboard();
let endGameInterval;

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
    world.audio.pauseAudio = function () {};
    world.audio.playAudio = function () {};
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
    if (window.innerHeight < 600 || isMobileOrTablet()) {
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
 * Adds event listeners to a button for both mobile and desktop devices.
 * It will listen for touchstart, touchend, and touchcancel events for
 * mobile devices and mousedown, mouseup, and mouseleave events for
 * desktop devices. When the button is pressed, it will call the
 * activate() function, which should activate the corresponding key
 * in the Keyboard object. When the button is released, it will call
 * the deactivate() function, which should deactivate the corresponding
 * key in the Keyboard object.
 * @param {string} buttonId The id of the button element.
 * @param {string} key The key in the Keyboard object to activate/deactivate.
 * @function addMobileAndDesktopControls
 */
function addMobileAndDesktopControls(buttonId, key) {
  const button = document.getElementById(buttonId);
  let isTouch = false;

  const activate = () => {
    keyboard[key] = true;
    button.classList.add("active");
  };

  const deactivate = () => {
    keyboard[key] = false;
    button.classList.remove("active");
  };

  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // verhindert Scrollen, Kontextmenü etc.
      isTouch = true;
      activate();
    },
    { passive: false }
  );

  button.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      deactivate();
      setTimeout(() => (isTouch = false), 100);
    },
    { passive: false }
  );

  button.addEventListener(
    "touchcancel",
    (e) => {
      deactivate();
    },
    false
  );

  button.addEventListener(
    "mousedown",
    (e) => {
      if (!isTouch) {
        e.preventDefault();
        activate();
      }
    },
    false
  );

  button.addEventListener(
    "mouseup",
    (e) => {
      if (!isTouch) {
        e.preventDefault();
        deactivate();
      }
    },
    false
  );

  button.addEventListener("mouseleave", (e) => {
    if (!isTouch) {
      deactivate();
    }
  });
}

/**
 * Sets up the game controls for both mobile and desktop devices.
 * Each control is a button that is displayed on the screen and
 * can be pressed by the user to control the game.
 * @function setupControls
 * @memberof Game
 * @instance
 */
function setupControls() {
  addMobileAndDesktopControls("throw", "D");
  addMobileAndDesktopControls("jump", "SPACE");
  addMobileAndDesktopControls("right", "RIGHT");
  addMobileAndDesktopControls("left", "LEFT");
}

window.addEventListener("DOMContentLoaded", () => {
  setupControls();
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
/**
 * Toggles the mute state of the game's background music. When called,
 * it checks the current volume of the background music.
 */
function muteGame() {
  const isMuted = world.audio.isMuted;
  world.audio.isMuted = !isMuted;
  localStorage.setItem("isMuted", world.audio.isMuted);

  const muteIcon = document.getElementById("mutebutton");
  if (muteIcon) {
    muteIcon.src = world.audio.isMuted
      ? "img/10_icons/mute.png"
      : "img/10_icons/volume.png";
  }
  world.audio.isMuted ? world.audio.pauseAudio() : world.audio.playAudio();
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
  if (world.character.dead || world.character.energy <= 0) {
    checkCharacterDead();
    clearInterval(endGameInterval);
  } else if (world.endboss.dead || world.endboss.energy <= 0) {
    checkBossDead();
    clearInterval(endGameInterval);
  }
}
endGameInterval = setInterval(() => {
  checkGameEnd();
}, 100);

/**
 * Starts a new interval that calls checkGameEnd every 100ms. If an interval
 * already exists, it is stopped before starting a new one. This is used to
 * check if the game has ended after the endboss has been defeated or the
 * character has died.
 * @function startEndGameInterval
 * @memberof Game
 * @instance
 */
function startEndGameInterval() {
  if (endGameInterval) {
    clearInterval(endGameInterval);
  }

  endGameInterval = setInterval(() => {
    checkGameEnd();
  }, 100);
}

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
 * display property to "hidden". This is used to stop the game when the
 * boss or the character are dead.
 */
function hideGameControls() {
  document.getElementById("right").classList.add("hidden");
  document.getElementById("left").classList.add("hidden");
  document.getElementById("jump").classList.add("hidden");
  document.getElementById("throw").classList.add("hidden");
}

/** This is used to stop the game when the boss or the character are dead.
 * @memberof Game
 * @instance
 */
function showGameControls() {
  document.getElementById("right").classList.remove("hidden");
  document.getElementById("left").classList.remove("hidden");
  document.getElementById("jump").classList.remove("hidden");
  document.getElementById("throw").classList.remove("hidden");
}
/**
 * Stops the game by calling the stopGame() method on the world object when the boss or the character are dead.
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
  if (muteIcon) muteIcon.src = "img/10_icons/volume.png";
  const startButton = document.getElementById("start");
  if (startButton) startButton.style.display = "none";
  world.hadFirstContact = false;
  showGameControls();
  initializeMuteState();
  startEndGameInterval();
}

/**
 * Initializes the mute state of the game by reading the state from localStorage,
 * updating the mute button icon accordingly, and either pausing or playing the audio based on the state.
 */
function initializeMuteState() {
  const isMuted = localStorage.getItem("isMuted") === "true"; // Lese den Zustand aus localStorage
  world.audio.isMuted = isMuted;

  const muteIcon = document.getElementById("mutebutton");
  if (muteIcon) {
    muteIcon.src = isMuted
      ? "img/10_icons/mute.png"
      : "img/10_icons/volume.png";
  }

  if (isMuted) {
    world.audio.pauseAudio();
  }
}

window.onload = () => {
  init();
  initLevel();
  initializeMuteState();
  checkGameEnd();
  toggleControls();
  checkOrientation();
  disableInteractionOnMobile();
};

window.addEventListener("resize", () => {
  toggleControls();
  checkOrientation();
  disableInteractionOnMobile();
});
