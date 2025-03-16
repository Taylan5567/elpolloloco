class GameAudio {
  constructor() {
    this.backgroundMusic = new Audio("audio/background.mp3");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0;

    this.coinSound = new Audio("audio/coin.mp3");
    this.coinSound.volume = 0;

    this.bottleSound = new Audio("audio/bottle.mp3");
    this.bottleSound.volume = 0;

    this.hitSound = new Audio("audio/hit.mp3");
    this.hitSound.volume = 0;

    this.endbossSound = new Audio("audio/endboss.mp3");
    this.endbossSound.volume = 0;
  }

  playEndbossSound() {
    this.endbossSound.currentTime = 0;
    this.endbossSound.play().catch((err) => {
      console.warn("endboss", err);
    });
    this.backgroundMusic.pause();
  }

  playBackgroundMusic() {
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play().catch((err) => {
      console.warn("background", err);
    });
  }

  pauseAudio() {
    this.endbossSound.volume = 0;
    this.backgroundMusic.volume = 0;
    this.coinSound.volume = 0;
    this.bottleSound.volume = 0;
    this.hitSound.volume = 0;
  }

  playAudio() {
    this.endbossSound.volume = 1;
    this.backgroundMusic.volume = 1;
    this.coinSound.volume = 1;
    this.bottleSound.volume = 1;
    this.hitSound.volume = 1;
  }

  playCoinSound() {
    this.coinSound.currentTime = 0;
    this.coinSound.play();
  }

  playBottleSound() {
    this.bottleSound.currentTime = 0;
    this.bottleSound.play();
  }

  playHitSound() {
    this.hitSound.currentTime = 0;
    this.hitSound.play();
  }

  setMusicVolume(volume) {
    this.backgroundMusic.volume = volume;
  }

  setEffectsVolume(volume) {
    this.coinSound.volume = volume;
    this.bottleSound.volume = volume;
    this.hitSound.volume = volume;
    this.endbossSound.volume = volume;
  }
}
