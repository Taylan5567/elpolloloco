let canvas;
let world;
let keyboard  = new Keyboard();

document.addEventListener('DOMContentLoaded', () => {
    moveLeftMobile();
  });
  


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    if (world.audio && typeof world.audio.pauseAudio !== 'function') {
        world.audio.pauseAudio = function() {
            console.log('Audio paused');
        };
        world.audio.playAudio = function() {
            console.log('Audio played');
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



function startEngine() {
    world.startGame();
    document.getElementById('start').style.display = "none";
    
    var displayValue = (world.gameOver || world.gameWon) ? "none" : "block";
    var controls = ["left", "right", "jump", "throw"];
    
    for (var i = 0; i < controls.length; i++) {
        document.getElementById(controls[i]).style.display = displayValue;
    }
}


function gameOver() {
    world.restartGame();
} 


function moveLeftMobile() {
    document.getElementById('left').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });
    document.getElementById('left').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
}

function moveRightMobile() {
    document.getElementById('right').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    document.getElementById('right').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
}

function jumpMobile() {
    document.getElementById('jump').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    document.getElementById('jump').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

function throwMobile() {
    document.getElementById('throw').addEventListener('touchstart', () => {
        keyboard.D = true;
    });
    document.getElementById('throw').addEventListener('touchend', () => {
        keyboard.D = false;
    });
}  

function fullscreenMobile() {
    let fullscreen = document.getElementById('canvasContainer');

    if (window.innerHeight < 500 || window.innerHeight > 500) {
        if (fullscreen.requestFullscreen) {
            fullscreen.requestFullscreen();
        } else if (fullscreen.mozRequestFullScreen) { 
            fullscreen.mozRequestFullScreen();
        } else if (fullscreen.webkitRequestFullscreen) {
            fullscreen.webkitRequestFullscreen();
        } else if (fullscreen.msRequestFullscreen) { 
            fullscreen.msRequestFullscreen();
        }
    }
}


function muteGame() {
    let muteButton = document.getElementById('mute');
    muteButton.addEventListener('click', () => {
        if (world.audio) {
            if (world.audio.backgroundMusic.volume === 0) {
                world.audio.playAudio();
                muteButton.src = 'img/10_icons/volume.png';
            } else {
                world.audio.pauseAudio();
                muteButton.src = 'img/10_icons/mute.png';
            }
        }
    });
}


function endgame() {
    world.endscreen.endscreenShow()
}



let restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    restartButton.disabled = true; // Button deaktivieren
    world.restartGame();
    restartButton.disabled = false; // Button nach 1 Sekunde wieder aktivieren
});
