let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let grid = 32;
let count = 0;
let countSpeed = 0;
let appleCount = 0;
let countGame = 0;
let crutch = false;
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
    // спавн змейки

    if (i === 0) {
      context.fillStyle = "black";
    } else {
      context.fillStyle = "green";
    }
    context.fillRect(snake.cells[i].x, snake.cells[i].y, grid - 1, grid - 1);
  }
}

function deathAndApple() {
  snake.cells.forEach(function (cell, index) {
    // съел яблоко
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = rand(2, 14) * grid;
      apple.y = rand(3, 13) * grid;
      appleCount++;
    }

    for (let i = index + 1; i < snake.cells.length - 1; i++) {
      // смерть об себя
      if (cell.x === snake.cells[i + 1].x && cell.y === snake.cells[i + 1].y) {
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = 0;
        snake.dy = 0;
        apple.x = rand(2, 14) * grid;
        apple.y = rand(3, 13) * grid;
        appleCount = 0;
        countGame++;
      }
    }
  });
}
function death() {
  snake.dx = 0;
  snake.dy = 0;
  snake.cells = [];
  snake.maxCells = 1;
  apple.x = rand(2, 14) * grid;
  apple.y = rand(3, 13) * grid;
  appleCount = 0;
  countGame++;
}

function spawnPic(path, x, y, length, width) {
  let img = new Image();
  img.src = path; // изображение для поля
  context.drawImage(img, x, y, length, width);
}

function inputAppleCount() {
  let current = document.getElementById("appleCount");
  current.innerHTML = appleCount;
}

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.KeyCode === 122) && countGame > 0) {
    countGame = 0;
    snake.x = 288;
    snake.y = 320;
    loop();
  }
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  if (countGame > 0) {
    return;
  }

  spawnPic("assets/img/ground.png", 0, 0, 608, 608);
  spawnPic(`assets/img/fruit.png`, apple.x, apple.y, grid - 1, grid - 1);

  spawn();
  deathAndApple();
  setTimeout(loop, 60);

  if (++count <= 3) {
    // возврат пустого значения
    return;
  }
  count = 2;

  speed();
  extension();

  if (snake.x < 30) {
    snake.x = snake.x + grid;
    death();
  }

  if (snake.y < 90) {
    snake.y = snake.y + grid;
    death();
  }
  if (snake.x > 550) {
    snake.x = snake.x - grid;
    death();
  }
  if (snake.y > 550) {
    snake.y = snake.y - grid;
    death();
  }
  inputAppleCount();
}

// управление
function control() {
  document.addEventListener("keydown", function (e) {
    if (!countGame) {
      let a = e.which;
      switch (a) {
        case 37:
          snake.dx = -grid;
          snake.dy = 0;
          break;
        case 38:
          snake.dy = -grid;
          snake.dx = 0;
          break;
        case 39:
          snake.dx = grid;
          snake.dy = 0;
          break;
        case 40:
          snake.dy = grid;
          snake.dx = 0;
          break;
      }
    }
  });
}

loop();
control();
