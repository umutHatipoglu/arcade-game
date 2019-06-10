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

class GameRole {
    width = 101;
    height = 171;
    speed = getRandomInt(10); 
    constructor(sprite, x, y){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    update = (dt) => {
        if(dt){
            this.x += this.x * (dt) + this.speed;
        } else if(this.y < 10){
            this.resetPosition();
        }
    }
    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends GameRole {
    constructor(sprite, x, y, player){
        super(sprite, x, y);
        this.player = player;
     }
     checkCollisions = () => {
        const isCollide = !(
            ( ( this.y + this.height - 100 ) < ( player.y ) ) ||
            ( this.y + 100 > ( player.y + player.height ) ) ||
            ( ( this.x + this.width - 20 ) < player.x ) ||
            ( this.x + 20> ( player.x + player.width ) )
        );

        if(isCollide){
            player.resetPosition();
        }
     }
}

class Player extends GameRole {
    constructor(sprite, x, y){
        super(sprite, x, y);
     }

    resetPosition = () => {
        this.x = PlayerInititalPosition.x;
        this.y = PlayerInititalPosition.y;
    };

    handleInput = (direction) => {
        switch(direction){
            case "left":
                if(this.x >= BORDER_LEFT_TOP + STEP_SIZE_X){
                    this.x = this.x - STEP_SIZE_X;
                }
                break;
            case "right":
                if(this.x < BORDER_RIGHT - STEP_SIZE_X){
                    this.x = this.x + STEP_SIZE_X;
                }
                break;
            case "up":
                if(this.y >= 0){
                    this.y = this.y - STEP_SIZE_Y;
                }
                break;
            case "down":
                if(this.y < BORDER_BOTTOM - STEP_SIZE_Y){
                    this.y = this.y + STEP_SIZE_Y;
                }
                break;         
        }
    }
}

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
