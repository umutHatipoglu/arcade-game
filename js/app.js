// Canvas border constants
const BORDER_BOTTOM = 440;
const BORDER_RIGHT = 420;
const BORDER_LEFT_TOP = 0;

// Step size for player moves
const STEP_SIZE_Y = 90;
const STEP_SIZE_X = 100;

//Initial position coordinate for player 
const PlayerInititalPosition = {
    x: 205,
    y: 405
};
//Initial row y-coordinate position for enemy
const initialEnemyPositionY = {
    0: 50,
    1: 135,
    2: 225,
    3: 310,
    4: 400
};
// Parent class for enemy and player which covers the common functionality and properties for both of them
class GameRole {
    width = 101;
    height = 171;
    speed = getRandomInt(10); 
    constructor(sprite, x, y){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    // Update the enemy position for each time framework tick 
    // Update the player position if player win and reach the water
    update = (dt) => {
        if(dt){
            this.x += this.x * (dt) + this.speed;
        } else if(this.y < 10){
            this.resetPosition();
        }
    }
    //Draw the enemy and player img into canvas
    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//Enemy class holds the functionality about collision check with player 
class Enemy extends GameRole {
    constructor(sprite, x, y, player){
        super(sprite, x, y);
        this.player = player;
     }
     //Calculate whether enemy and player collide
     //and reset player position if collision happens
     checkCollisions = () => {
        const isCollide = !(
            ( ( this.y + this.height - 100 ) < ( this.player.y ) ) ||
            ( this.y + 100 > ( this.player.y + this.player.height ) ) ||
            ( ( this.x + this.width - 20 ) < this.player.x ) ||
            ( this.x + 20> ( this.player.x + this.player.width ) )
        );

        if(isCollide){
            player.resetPosition();
        }
     }
}
//Player class holds the functionality about moving player instance into initial position
//based on collision or reaching the target
//and handling user interaction 
class Player extends GameRole {
    constructor(sprite, x, y){
        super(sprite, x, y);
     }
     //Move player into initial position
    resetPosition = () => {
        this.x = PlayerInititalPosition.x;
        this.y = PlayerInititalPosition.y;
    };
    //Handle user interaction for player instance
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

const player = new Player('images/char-boy.png', PlayerInititalPosition.x, PlayerInititalPosition.y);

let allEnemies = [];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const totalEnemy = 100;

//Create enemy instances based on random time and position
for(let i = 0; i < totalEnemy; i++){
    setTimeout(() => {
        allEnemies.push(new Enemy('images/enemy-bug.png',  1, initialEnemyPositionY[getRandomInt(5)], player));

    }, i * getRandomInt(5000));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
