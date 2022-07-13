const GRID = 32;

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const current = document.getElementById("appleCount");
let appleCount = 0;
let countGame = false;
let gameLoop = null;

let snake = {
  x: 288,
  y: 320,
  dx: 0,
  dy: 0,
  cells: [],
  maxCells: 1,
};

let apple = {
  x: 320,
  y: 320,
};

function speed() {
  snake.x += snake.dx;
  snake.y += snake.dy;
}

function extension() {
  snake.cells.unshift({ x: snake.x, y: snake.y }); // увеличение длины
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
}

function spawnSnake() {
  for (let i = 0; i < snake.cells.length; i++) {
    if (i === 0) {
      context.fillStyle = "black";
    } else {
      context.fillStyle = "green";
    }
    context.fillRect(snake.cells[i].x, snake.cells[i].y, GRID - 1, GRID - 1);
  }
}

function death() {
  snake.dx = 0;
  snake.dy = 0;
  snake.cells = [];
  snake.maxCells = 1;
  apple.x = rand(2, 14) * GRID;
  apple.y = rand(3, 13) * GRID;
  appleCount = 0;
  clearInterval(gameLoop);
  countGame = true;
}

function eatApple() {
  snake.cells.forEach(function (cell) {
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = rand(2, 14) * GRID;
      apple.y = rand(3, 13) * GRID;
      appleCount++;
    }
  });
}

function deathAboutYourself() {
  snake.cells.forEach(function (cell, index) {
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        death();
      }
    }
  });
}

function spawnPic(path, x, y, length, width) {
  let img = new Image();
  img.src = path;
  context.drawImage(img, x, y, length, width);
}

function drawAppleCount() {
  current.innerHTML = appleCount;
}

function restart(e) {
  if ((e.ctrlKey || e.KeyCode === 122) && countGame) {
    countGame = false;
    snake.x = 288;
    snake.y = 320;
    gameLoop = setInterval(loop, 100);
  }
}

function checkEdge() {
  switch (true) {
    case snake.x < 30:
      snake.x = snake.x + GRID;
      death();

    case snake.y < 90:
      snake.y = snake.y + GRID;
      death();

    case snake.x > 550:
      snake.x = snake.x - GRID;
      death();

    case snake.y > 550:
      snake.y = snake.y - GRID;
      death();
  }
}

function control(e) {
  if (!countGame) {
    switch (e.which) {
      case 37:
        snake.dx = -GRID;
        snake.dy = 0;
        break;

      case 38:
        snake.dy = -GRID;
        snake.dx = 0;
        break;

      case 39:
        snake.dx = GRID;
        snake.dy = 0;
        break;

      case 40:
        snake.dy = GRID;
        snake.dx = 0;
        break;
    }
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  spawnPic("assets/img/ground.png", 0, 0, 608, 608);

  spawnPic(`assets/img/fruit.png`, apple.x, apple.y, GRID - 1, GRID - 1);

  spawnSnake();

  eatApple();

  deathAboutYourself();

  speed();

  extension();

  checkEdge();

  inputAppleCount();
}

document.addEventListener("keydown", restart);

document.addEventListener("keydown", control);

gameLoop = setInterval(loop, 100);
