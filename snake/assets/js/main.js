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

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  if (countGame > 0) {
    return;
  }

  const img = new Image();
  img.src = `assets/img/ground.png`; // изображение для поля
  context.drawImage(img, 0, 0);

  const fruit = new Image();
  fruit.src = `assets/img/fruit.png`; //изображение фрукта
  context.drawImage(fruit, apple.x, apple.y, grid - 1, grid - 1);

  for (let i = 0; i < snake.cells.length; i++) {
    // спавн змейки

    if (i === 0) {
      context.fillStyle = "black";
    } else {
      context.fillStyle = "green";
    }
    context.fillRect(snake.cells[i].x, snake.cells[i].y, grid - 1, grid - 1);
  }

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
  setTimeout(loop, 30);
  if (++count <= 3) {
    // возврат пустого значения
    return;
  }
  count = 2;

  function speed() {
    snake.x += snake.dx;
    snake.y += snake.dy;
  }
  speed();

  snake.cells.unshift({ x: snake.x, y: snake.y }); // увеличение длины
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.drawImage(fruit, apple.x, apple.y, grid - 1, grid - 1);

  if (snake.x < 30) {
    snake.dx = 0;
    snake.dy = 0;
    snake.x = snake.x + grid;
    snake.cells = [];
    snake.maxCells = 1;
    apple.x = rand(2, 14) * grid;
    apple.y = rand(3, 13) * grid;
    appleCount = 0;
    countGame++;
  }
  if (snake.y < 90) {
    snake.dx = 0;
    snake.dy = 0;
    snake.y = snake.y + grid;
    snake.cells = [];
    snake.maxCells = 1;
    apple.x = rand(2, 14) * grid;
    apple.y = rand(3, 13) * grid;
    appleCount = 0;
    countGame++;
  }
  if (snake.x > 550) {
    snake.dx = 0;
    snake.dy = 0;
    snake.x = snake.x - grid;
    snake.cells = [];
    snake.maxCells = 1;
    apple.x = rand(2, 14) * grid;
    apple.y = rand(3, 13) * grid;
    appleCount = 0;
    countGame++;
  }
  if (snake.y > 550) {
    snake.dx = 0;
    snake.dy = 0;
    snake.y = snake.y - grid;
    snake.cells = [];
    snake.maxCells = 1;
    apple.x = rand(2, 14) * grid;
    apple.y = rand(3, 13) * grid;
    appleCount = 0;
    countGame++;
  }
  inputAppleCount();
}

// управление
function control() {
  document.addEventListener("keydown", function (e) {
    if (!countGame) {
      if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.KeyCode === 122) && countGame > 0) {
    countGame = 0;
    snake.x = 288;
    snake.y = 320;
    loop();
  }
});

function inputAppleCount() {
  let current = document.getElementById("appleCount");
  current.innerHTML = appleCount;
}

loop();
control();
