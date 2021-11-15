// Определяем глобальные переменные для холста и контекста 
var canvas;
var context;

window.onload = function() {
  // Подготавливаем холст
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Рисуем фон лабиринта
  drawMaze("maze.png", 268, 5);

  // При нажатии клавиши вызываем функцию processKey()
  window.onkeydown = processKey;
};
// Отслеживаем текущую позицию значка
var x = 0;
var y = 0;

// Таймер, включающий и отключающий новый лабиринт в любое время
var timer;

function drawMaze(mazeFile, startingX, startingY) {
  // Остановить таймер (если запущен)
  clearTimeout(timer);

  // Остановить перемещение значка
  dx = 0;
  dy = 0;

  // Загружаем изображение лабиринта
  var imgMaze = new Image();
  imgMaze.onload = function() {
    // Изменяем размер холста в соответствии 
	// с размером изображения лабиринта
    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;

    // Рисуем лабиринт
    context.drawImage(imgMaze, 0,0);

    // Рисуем значок
    x = startingX;
    y = startingY;

    var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);
    context.stroke();

    // Рисуем следующий кадр через 10 миллисекунд
    timer = setTimeout("drawFrame()", 10);
  };
  imgMaze.src = mazeFile;
}

// Скорость перемещения значка
var dx = 0;
var dy = 0;

function processKey(e) {
  // Если значок находится в движении, останавливаем его
  dx = 0;
  dy = 0;

  // Если нажата стрелка вверх, начинаем двигаться вверх
  if (e.keyCode == 38) {
    dy = -1;
  }

  // Если нажата стрелка вниз, начинаем двигаться вниз
  if (e.keyCode == 40) {
    dy = 1;
  }

  // Если нажата стрелка влево, начинаем двигаться влево
  if (e.keyCode == 37) {
    dx = -1;
  }

  // Если нажата стрелка вправо, начинаем двигаться вправо
  if (e.keyCode == 39) {
    dx = 1;
  }
}

function drawFrame() {
  // Обновляем кадр только если значок движется
  if (dx != 0 || dy != 0) {
    // Закрашиваем перемещение значка желтым цветом
    context.beginPath();
    context.fillStyle = "rgb(254,244,207)";
    context.rect(x, y, 15, 15);
    context.fill()

    // Обновляем координаты значка, создавая перемещение
    x += dx;
    y += dy;

    // Проверка столкновения со стенками лабиринта
	// (вызывается доп. функция)
    if (checkForCollision()) {
      x -= dx;
      y -= dy;
      dx = 0;
      dy = 0;
    }

    // Перерисовываем значок
    var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);

    // Проверяем дошел ли пользователь до финиша.
	// Если дошел, то выводим сообщение
    if (y > (canvas.height - 17)) {
      alert("Ты победил!");
      return;
    }
  }

  // Рисуем следующий кадр через 10 миллисекунд
  timer = setTimeout("drawFrame()", 10);
}
