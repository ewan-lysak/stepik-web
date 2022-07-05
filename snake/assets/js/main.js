let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let grid = 32;
let count = 0;
let countSpeed = 0;
let appleCount = 0;
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
  const img = new Image();
  img.src = `assets/img/ground.png`; // изображение для поля
  img.onload = function () {
    let pattern = context.createPattern(img, "no-repeat");
    context.fillStyle = pattern;
    context.fillRect(10, 10, 620, 620);
  };

  requestAnimationFrame(loop);
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
  const fruit = new Image();
  fruit.src = `assets/img/fruit.png`;
  img.onload = function () {
    let pat = context.createPattern(fruit, "no-repeat");
    context.fillStyle = pat;
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  };
  context.drawImage(fruit, apple.x, apple.y, grid - 1, grid - 1);

  if (snake.x < 30 || snake.y < 90 || snake.x > 550 || snake.y > 550) {
    // смерть об стенку
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
  context.fillStyle = "black"; //спавн змейки
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
