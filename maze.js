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
