class GameAudio {
  isMuted = false; // Flag to indicate if the audio is muted

  /**
   * Initializes the game audio by creating Audio objects for background music, coin, bottle, hit, and endboss sounds.
   * The volume of the background music is set to 1 (full volume), and the volume of the other sounds is set to 0 (no volume).
   */
  constructor() {
    this.backgroundMusic = new Audio("audio/background.mp3");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 1;

    this.coinSound = new Audio("audio/coin.mp3");
    this.coinSound.volume = 1;

    this.bottleSound = new Audio("audio/bottle.mp3");
    this.bottleSound.volume = 1;

    this.hitSound = new Audio("audio/hit.mp3");
    this.hitSound.volume = 1;

    this.endbossSound = new Audio("audio/endboss.mp3");
    this.endbossSound.volume = 1;
  }

  /**
   * Checks the mute state every 100ms and plays or pauses the audio accordingly.
   * If the audio is muted, it plays the audio. If the audio is not muted, it pauses the audio.
   * The interval is cleared after its first execution to prevent continuous checking.
   * @method checkMuted
   * @memberof GameAudio
   * @instance
   */
  checkMuted() {
    const intervalMute = setInterval(() => {
      if (this.isMuted) {
        this.playAudio();
      } else {
        this.isMuted = false;
        this.pauseAudio();
      }
    }, 100);
    clearInterval(intervalMute);
  }

  /**
   * Plays the endboss sound and pauses the background music.
   * @method playEndbossSound
   * @memberof GameAudio
   * @instance
   */
  playEndbossSound() {
    if (!this.isMuted || world.endboss.hadFirstContact) {
      this.playerEndbossSound();
    }
    setInterval(() => {
      if (this.isMuted) {
        this.endbossSound.pause();
      } else if (world.endboss.hadFirstContact) {
        this.playerEndbossSound();
      }
    }, 100);
  }

  /**
   * Plays the endboss sound and pauses the background music.
   * Sets the volume of the endboss sound to 1 and resets the current time to 0.
   * @method playerEndbossSound
   * @memberof GameAudio
   * @instance
   */
  playerEndbossSound() {
    this.endbossSound.play();
    this.endbossSound.volume = 1;
    this.backgroundMusic.pause();
    this.endbossSound.currentTime = 0;
  }

  /**
   * Plays the background music and resets the current time to 0.
   * @method playBackgroundMusic
   * @memberof GameAudio
   * @instance
   */
  playBackgroundMusic() {
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  /**
   * Pauses all audio by setting their volume to 0.
   * @method pauseAudio
   * @memberof GameAudio
   * @instance
   */
  pauseAudio() {
    this.endbossSound.volume = 0;
    this.backgroundMusic.volume = 0;
    this.coinSound.volume = 0;
    this.bottleSound.volume = 0;
    this.hitSound.volume = 0;
  }

  /**
   * Restores the volume of all audio elements to full volume (1).
   * This includes background music, coin sound, bottle sound, and hit sound.
   *
   * @method playAudio
   * @memberof GameAudio
   * @instance
   */
  playAudio() {
    this.backgroundMusic.volume = 1;
    this.coinSound.volume = 1;
    this.bottleSound.volume = 1;
    this.hitSound.volume = 1;
  }

  /**
   * Plays the coin sound effect. The sound is reset to the beginning before playing.
   * @method playCoinSound
   * @memberof GameAudio
   * @instance
   */
  playCoinSound() {
    this.coinSound.currentTime = 0;
    this.coinSound.play();
  }

  /**
   * Plays the bottle sound effect. The sound is reset to the beginning before playing.
   * @method playBottleSound
   * @memberof GameAudio
   * @instance
   */
  playBottleSound() {
    this.bottleSound.currentTime = 0;
    this.bottleSound.play();
  }

  /**
   * Plays the hit sound effect. The sound is reset to the beginning before playing.
   * @method playHitSound
   * @memberof GameAudio
   * @instance
   */
  playHitSound() {
    this.hitSound.currentTime = 0;
    this.hitSound.play();
  }

  /**
   * Sets the volume of the background music to the given value.
   * @method setMusicVolume
   * @memberof GameAudio
   * @instance
   * @param {number} volume - The new volume value. Must be between 0 and 1.
   */
  setMusicVolume(volume) {
    this.backgroundMusic.volume = volume;
  }

  /**
   * Sets the volume of the sound effects to the given value.
   * @method setEffectsVolume
   * @memberof GameAudio
   * @instance
   * @param {number} volume - The new volume value. Must be between 0 and 1.
   */
  setEffectsVolume(volume) {
    this.coinSound.volume = volume;
    this.bottleSound.volume = volume;
    this.hitSound.volume = volume;
    this.endbossSound.volume = volume;
  }

  /**
   * Resets all audio elements to their initial state by setting their current time to 0 and pausing them.
   * @method resetAudio
   * @memberof GameAudio
   * @instance
   */
  resetAudio() {
    this.pauseAudio();
    this.backgroundMusic.currentTime = 0;
    this.coinSound.currentTime = 0;
    this.bottleSound.currentTime = 0;
    this.hitSound.currentTime = 0;
    this.endbossSound.currentTime = 0;
  }
}
