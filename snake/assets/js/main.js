let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let grid = 32;
let count = 0;
let countSpeed = 0;
let appleCount = 0;
let countGame = 0;
let snake = {
  x: 320,
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
  let ctrl;
  let z;
  window.addEventListener("keydown", function (e) {
    if (e.which === 17) {
      ctrl = 1;
    }
  });
  window.addEventListener("keydown", function (e) {
    if (e.which === 90) {
      z = 1;
    }
  });
  alert(ctrl);
  if (z === 1 && ctrl == 1) {
    countGame = 0;
  }
  z = 0;
  ctrl = 0;

  if (countGame > 0) {
    return;
  }
  const img = new Image();
  img.src = `assets/img/ground.png`; // изображение для поля
  context.drawImage(img, 0, 0);

  const fruit = new Image();
  fruit.src = `assets/img/fruit.png`; //изображение фрукта
  context.drawImage(fruit, apple.x, apple.y, grid - 1, grid - 1);

  // context.fillStyle = "red"; //спавн змейки
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // съел яблоко
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = rand(2, 14) * grid;
      apple.y = rand(3, 13) * grid;
      appleCount++;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      // смерть об себя
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 288;
        snake.y = 320;
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = 0;
        snake.dy = 0;
        apple.x = rand(2, 14) * grid;
        apple.y = rand(3, 13) * grid;
        appleCount = 0;
      }
    }
  });
  setTimeout(loop, 100);
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
  });
}

function inputAppleCount() {
  let current = document.getElementById("appleCount");
  current.innerHTML = appleCount;
}

control();
loop();
