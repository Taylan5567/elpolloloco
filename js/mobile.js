/**
 * This function is called when the window is fully loaded and all
 * resources are available.
 * @memberof Game
 * @instance
 */
function isMobileOrTablet() {
  const ua = navigator.userAgent;
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isIpadDesktopMode =
    navigator.maxTouchPoints > 1 && /Macintosh/.test(ua);
  const mqNoHover = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;
  return isMobileUA || isIpadDesktopMode || mqNoHover;
}

/**
 * Determines if the current device is an iPad by checking its screen resolution
 * @returns {boolean} True if the device matches any known iPad resolution, false otherwise.
 */
function isIpad() {
  const ratio = window.devicePixelRatio || 1;
  const width = window.screen.width * ratio;
  const height = window.screen.height * ratio;

  const knownIpadResolutions = [
    [1024, 1366], // iPad Pro 12.9"
    [820, 1180], // iPad Air (4./5. Gen)
    [810, 1080], // iPad 10. Gen
    [768, 1024], // Klassisches iPad
    [834, 1112], // iPad Pro 10.5"
    [834, 1194], // iPad Pro 11"
    [744, 1133], // iPad Mini 6
  ];

  return knownIpadResolutions.some(
    ([w, h]) => (width === w && height === h) || (width === h && height === w)
  );
}

/**
 * Checks the orientation of the device and toggles the display
 * of an overlay element based on the orientation. Specifically for iPads,
 * it shows the overlay when the device is in portrait mode and hides
 * it when in landscape mode.
 */
function checkOrientation() {
  const overlay = document.getElementById("overlay");
  if (!overlay) {
    console.warn("Overlay-Element nicht gefunden.");
    return;
  }

  const isPortrait = window.innerHeight > window.innerWidth; // Prüfe, ob das Gerät im Hochformat ist

  if (isPortrait) {
    hideAllGame();
  } else {
    showAllGame();
  }
}

function hideAllGame() {
  document.getElementById("canvas").style.display = "none";
  overlay.style.display = "block";
  document.getElementById("descr").style.display = "none";
  document.getElementById("ueber").style.display = "none";
}

function showAllGame() {
  document.getElementById("canvas").style.display = "block";
  document.getElementById("ueber").style.display = "block";
  overlay.style.display = "none";
  if (!innerHeight > 800) {
    document.getElementById("descr").style.display = "none";
  } else if (innerHeight < 500) {
    document.getElementById("ueber").style.display = "none";
  }
}

/**
 * Toggles the display of the game controls depending on the device and game state.
 * If the game is started and the device is a mobile or tablet, the controls are
 * displayed. Otherwise, they are hidden.
 * @memberof Game
 */
function toggleControls() {
  checkOrientation();
  if (world.isGameStarted) {
    if (isMobileOrTablet()) {
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
  }
}
