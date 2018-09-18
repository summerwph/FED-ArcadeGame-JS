// Enemies our player must avoid
let Enemy = function(x, y, speed) {

    // The enemies position and move speed
    this.x = x;
    this.y = y;
    this.height = 30;
    this.width = 60;
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    // Checking if the emeny out of the border and the emeny cross the screen.
    if (this.x > 505) {
      this.x = -100;
    }

    //Checking if the collision with player
    for (let enemy of allEnemies) {
      enemy.checkCollisions(player);
    }
};

Enemy.prototype.checkCollisions = function(p) {

    // Using the area matching to detect collision
    if (this.x < p.x + p.width  && this.x + this.width  > p.x &&
      this.y < p.y + p.height && this.y + this.height > p.y) {
        // The emeny-player collision, reset the game.
        p.x = 202;
        p.y = 405;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player's cless
let Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.height = 30;
  this.width = 30;
  this.speed = speed;
  this.sprite = 'images/char-horn-girl.png';

}

// Update Player's position to check if the player moves off screen or wins the game.
Player.prototype.update = function() {

    // Player cannot move off screen
    // Checking if the player touch the border(left, right and bottm walls)
    if (this.x >= 410) {
      this.x = 410;
    }else if (this.x <= 0) {
      this.x = 0;
    }else if (this.y >= 430) {
      this.y = 430;
    }

    // Checking if the player touch the water area or top wall to win the game.
    console.log(this.y);
    if (this.y <= -35) {
        this.x = 202;
        this.y = 405;
        alert("Congraluations! You Win!");
        gameLevel += 1;
        document.querySelector('.levels').innerHTML = gameLevel;
        increaseEnemies(gameLevel);
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // displayLevel(gameLevel);
};

Player.prototype.handleInput = function(dt) {
  switch (dt) {
    case "up":
      this.y -= 55;
      break;
    case "down":
      this.y += 55;
      break;
    case "left":
      this.x -= 50;
      break;
    case "right":
      this.x += 50;
      break;
    default:
  }
};

// Increase number of enemies on screen based on player's score
const increaseEnemies = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.clear();

    // load new set of enemies
    for (let i = 1; i <= numEnemies; i++) {
        let enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.add(enemy);
    }
    console.log(allEnemies);
};

let gameLevel = 1;
let allEnemies = new Set();
let enemy = new Enemy(-100, Math.random() * 184 + 50, Math.random() * 256);
let player = new Player(202, 405);
allEnemies.add(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // console.log(allowedKeys[e.keyCode]);
});
