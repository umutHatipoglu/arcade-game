const BORDER_BOTTOM = 440;
const BORDER_RIGHT = 420;
const BORDER_LEFT_TOP = 0;

const STEP_SIZE_Y = 90;
const STEP_SIZE_X = 100;

const PlayerInititalPosition = {
    x: 205,
    y: 405
}

const initialEnemyPositionY = {
    0: 50,
    1: 135,
    2: 225,
    3: 310,
    4: 400
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
