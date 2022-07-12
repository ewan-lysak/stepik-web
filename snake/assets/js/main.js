const CANVAS = document.getElementById("game");
const CONTEXT = CANVAS.getContext("2d");
const GRID = 32;
const CURRENT = document.getElementById("appleCount");

let count = 0;
let countSpeed = 0;
let appleCount = 0;
let countGame = 0;

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

function spawn() {
  for (let i = 0; i < snake.cells.length; i++) {
    if (i === 0) {
      CONTEXT.fillStyle = "black";
    } else {
      CONTEXT.fillStyle = "green";
    }
    CONTEXT.fillRect(snake.cells[i].x, snake.cells[i].y, GRID - 1, GRID - 1);
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
  countGame++;
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
  CONTEXT.drawImage(img, x, y, length, width);
}

function inputAppleCount() {
  CURRENT.innerHTML = appleCount;
}

function ctrlZ() {
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.KeyCode === 122) && countGame > 0) {
      countGame = 0;
      snake.x = 288;
      snake.y = 320;
      loop();
    }
  });
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  if (countGame > 0) {
    return;
  }

  spawnPic("assets/img/ground.png", 0, 0, 608, 608);

  spawnPic(`assets/img/fruit.png`, apple.x, apple.y, GRID - 1, GRID - 1);

  spawn();

  eatApple();

  deathAboutYourself();

  setTimeout(loop, 60);

  if (++count <= 3) {
    // возврат пустого значения
    return;
  }
  count = 2;

  speed();

  extension();

  if (snake.x < 30) {
    snake.x = snake.x + GRID;
    death();
  }

  if (snake.y < 90) {
    snake.y = snake.y + GRID;
    death();
  }

  if (snake.x > 550) {
    snake.x = snake.x - GRID;
    death();
  }

  if (snake.y > 550) {
    snake.y = snake.y - GRID;
    death();
  }

  inputAppleCount();
}

// управление
function control() {
  document.addEventListener("keydown", function (e) {
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
  });
}

loop();

control();

ctrlZ();
