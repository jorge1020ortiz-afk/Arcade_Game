/* =========================================
   OBTENER EL CANVAS
========================================= */

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

/* =========================================
   TAMAÑO DEL CANVAS
========================================= */

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* =========================================
   ELEMENTOS HTML
========================================= */

const speedText =
document.getElementById("speedText");

const kValue =
document.getElementById("kValue");

const scoreText =
document.getElementById("scoreText");

const levelText =
document.getElementById("levelText");

const speedNumber =
document.getElementById("speedNumber");

const kSlider =
document.getElementById("kSlider");

/* =========================================
   BOTONES MOBILE
========================================= */

const leftBtn =
document.getElementById("leftBtn");

const rightBtn =
document.getElementById("rightBtn");

const upBtn =
document.getElementById("upBtn");

const downBtn =
document.getElementById("downBtn");

/* =========================================
   VARIABLES PRINCIPALES
========================================= */

/*
Coeficiente de fricción
*/

let k = 0.03;

/*
Velocidad horizontal
del carro
*/

let velocity = 0;

/*
Velocidad del juego
*/

let roadSpeed = 18;

/*
Aceleración lateral
*/

let acceleration = 0.6;

/* SCORE */

let score = 0;

/* NIVEL */

let level = 1;

/* GAME OVER */

let gameOver = false;

/* =========================================
   OBJETO DEL JUGADOR
========================================= */

const player = {

  x: canvas.width / 2,

  y: canvas.height - 170,

  width: 70,

  height: 120

};

/* =========================================
   CONTROLES
========================================= */

let leftPressed = false;
let rightPressed = false;

let upPressed = false;
let downPressed = false;

/* =========================================
   SLIDER
========================================= */

kSlider.addEventListener(
  "input",
  () => {

    k =
    parseFloat(kSlider.value);

    kValue.textContent =
    k.toFixed(2);

  }
);

/* =========================================
   TECLADO
========================================= */

document.addEventListener(
  "keydown",
  (e) => {

    if(e.key === "ArrowLeft"){

      leftPressed = true;

    }

    if(e.key === "ArrowRight"){

      rightPressed = true;

    }

    if(e.key === "ArrowUp"){

      upPressed = true;

    }

    if(e.key === "ArrowDown"){

      downPressed = true;

    }

  }
);

document.addEventListener(
  "keyup",
  (e) => {

    if(e.key === "ArrowLeft"){

      leftPressed = false;

    }

    if(e.key === "ArrowRight"){

      rightPressed = false;

    }

    if(e.key === "ArrowUp"){

      upPressed = false;

    }

    if(e.key === "ArrowDown"){

      downPressed = false;

    }

  }
);

/* =========================================
   CONTROLES MOBILE
========================================= */

leftBtn.addEventListener(
  "touchstart",
  () => {

    leftPressed = true;

  }
);

leftBtn.addEventListener(
  "touchend",
  () => {

    leftPressed = false;

  }
);

rightBtn.addEventListener(
  "touchstart",
  () => {

    rightPressed = true;

  }
);

rightBtn.addEventListener(
  "touchend",
  () => {

    rightPressed = false;

  }
);

upBtn.addEventListener(
  "touchstart",
  () => {

    upPressed = true;

  }
);

upBtn.addEventListener(
  "touchend",
  () => {

    upPressed = false;

  }
);

downBtn.addEventListener(
  "touchstart",
  () => {

    downPressed = true;

  }
);

downBtn.addEventListener(
  "touchend",
  () => {

    downPressed = false;

  }
);

/* =========================================
   VARIABLES CARRETERA
========================================= */

let roadOffset = 0;

/* =========================================
   ENEMIGOS
========================================= */

const enemies = [];

/* =========================================
   CREAR ENEMIGOS
========================================= */

function spawnEnemy(){

  const lanes = [

    canvas.width / 2 - 120,

    canvas.width / 2,

    canvas.width / 2 + 120

  ];

  const randomLane =
  lanes[Math.floor(
    Math.random() * lanes.length
  )];

  enemies.push({

    x: randomLane,

    y: -150,

    width: 70,

    height: 120,

    /*
    Más nivel =
    más velocidad
    */

    speed:
    (roadSpeed * 0.8) + (level * 0.8)

  });

}

/* =========================================
   GENERAR ENEMIGOS
========================================= */

function enemySpawner(){

  if(!gameOver){

    spawnEnemy();

  }

  /*
  Más nivel =
  más enemigos
  */

  let spawnRate = 900;

  if(level >= 2){

    spawnRate = 750;

  }

  if(level >= 4){

    spawnRate = 600;

  }

  if(level >= 6){

    spawnRate = 450;

  }

  setTimeout(
    enemySpawner,
    spawnRate
  );

}

enemySpawner();

/* =========================================
   COLISIONES
========================================= */

function checkCollision(a,b){

  return (

    a.x - a.width/2 <
    b.x + b.width/2 &&

    a.x + a.width/2 >
    b.x - b.width/2 &&

    a.y <
    b.y + b.height &&

    a.y + a.height >
    b.y

  );

}

/* =========================================
   DIBUJAR CARROS
========================================= */

function drawCar(x,y,color){

  /* CUERPO */

  ctx.fillStyle = color;

  ctx.beginPath();

  ctx.roundRect(
    x - 35,
    y,
    70,
    120,
    22
  );

  ctx.fill();

  /* BORDE */

  ctx.lineWidth = 5;

  ctx.strokeStyle = "black";

  ctx.stroke();

  /* CABINA */

  ctx.fillStyle = "#2c2c2c";

  ctx.beginPath();

  ctx.roundRect(
    x - 18,
    y + 18,
    36,
    55,
    10
  );

  ctx.fill();

  ctx.stroke();

  /* RUEDAS */

  ctx.fillStyle = "black";

  ctx.fillRect(x - 42,y + 18,8,22);
  ctx.fillRect(x + 34,y + 18,8,22);

  ctx.fillRect(x - 42,y + 78,8,22);
  ctx.fillRect(x + 34,y + 78,8,22);

}

/* =========================================
   GAME LOOP
========================================= */

function gameLoop(){

  /* LIMPIAR */

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  /* =====================================
     FONDO POR NIVEL
  ===================================== */

  let backgroundColor = "#efe6d3";

  if(level >= 2){

    backgroundColor = "#d8c7ab";

  }

  if(level >= 3){

    backgroundColor = "#b89f7a";

  }

  if(level >= 4){

    backgroundColor = "#8a7155";

  }

  if(level >= 5){

    backgroundColor = "#5e4b3a";

  }

  ctx.fillStyle = backgroundColor;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  /* =====================================
     CARRETERA
  ===================================== */

  let roadColor = "#4b3a2f";

  if(level >= 3){

    roadColor = "#3a2b22";

  }

  if(level >= 5){

    roadColor = "#241913";

  }

  ctx.fillStyle = roadColor;

  ctx.fillRect(
    canvas.width / 2 - 220,
    0,
    440,
    canvas.height
  );

  /* BORDES */

  ctx.strokeStyle = "black";

  ctx.lineWidth = 6;

  ctx.strokeRect(
    canvas.width / 2 - 220,
    0,
    440,
    canvas.height
  );

  /* =====================================
     LINEAS
  ===================================== */

  roadOffset += roadSpeed;

  if(roadOffset > 120){

    roadOffset = 0;

  }

  for(let i = -20; i < 20; i++){

    ctx.fillStyle = "#f8f1df";

    ctx.fillRect(

      canvas.width / 2 - 5,

      i * 120 + roadOffset,

      10,

      70

    );

  }

  /* =====================================
     ACELERAR Y FRENAR
  ===================================== */

  if(upPressed){

    roadSpeed += 0.2;

  }

  if(downPressed){

    roadSpeed -= 0.2;

  }

  /* LIMITES */

  if(roadSpeed < 8){

    roadSpeed = 8;

  }

  if(roadSpeed > 35){

    roadSpeed = 35;

  }

  /* =====================================
     MOVIMIENTO
  ===================================== */

  if(leftPressed){

    velocity -= acceleration;

  }

  if(rightPressed){

    velocity += acceleration;

  }

  /*
  Decaimiento exponencial
  */

  velocity *= (1 - k);

  player.x += velocity;

  /* =====================================
     LIMITES
  ===================================== */

  const leftLimit =
  canvas.width / 2 - 170;

  const rightLimit =
  canvas.width / 2 + 170;

  if(player.x < leftLimit){

    player.x = leftLimit;

    velocity = 0;

  }

  if(player.x > rightLimit){

    player.x = rightLimit;

    velocity = 0;

  }

  /* =====================================
     DIBUJAR JUGADOR
  ===================================== */

  drawCar(
    player.x,
    player.y,
    "#f8f1df"
  );

  /* =====================================
     ENEMIGOS
  ===================================== */

  enemies.forEach((enemy,index) => {

    enemy.y += enemy.speed;

    drawCar(
      enemy.x,
      enemy.y,
      "#d9c2a3"
    );

    /* SCORE */

    if(enemy.y > canvas.height + 150){

      enemies.splice(index,1);

      score++;

      /*
      SUBIR NIVEL
      */

      if(score % 30 === 0){

        level++;

        roadSpeed += 2;

      }

    }

    /* COLISION */

    if(checkCollision(player,enemy)){

      gameOver = true;

    }

  });

  /* =====================================
     ACTUALIZAR HUD
  ===================================== */

  speedText.textContent =
  Math.floor(Math.abs(velocity) * 10);

  scoreText.textContent =
  score;

  levelText.textContent =
  level;

  speedNumber.textContent =
  Math.floor(roadSpeed * 6);

  /* =====================================
     GAME OVER
  ===================================== */

  if(gameOver){

    ctx.fillStyle =
    "rgba(0,0,0,0.6)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.fillStyle =
    "#fff8e7";

    ctx.font =
    "bold 70px Fredoka";

    ctx.textAlign = "center";

    ctx.fillText(

      "GAME OVER",

      canvas.width / 2,

      canvas.height / 2 - 20

    );

    ctx.font =
    "24px Fredoka";

    ctx.fillStyle =
    "#e6d2b5";

    ctx.fillText(

      "PRESS SPACE",

      canvas.width / 2,

      canvas.height / 2 + 40

    );

    return;

  }

  /* LOOP */

  requestAnimationFrame(
    gameLoop
  );

}

/* =========================================
   INICIAR
========================================= */

gameLoop();

/* =========================================
   REINICIAR
========================================= */

document.addEventListener(
  "keydown",
  (e) => {

    if(e.code === "Space" && gameOver){

      enemies.length = 0;

      score = 0;

      level = 1;

      velocity = 0;

      roadSpeed = 18;

      player.x =
      canvas.width / 2;

      gameOver = false;

      gameLoop();

    }

  }
);

/* =========================================
   REINICIO MOBILE
========================================= */

canvas.addEventListener(
  "touchstart",
  () => {

    if(gameOver){

      enemies.length = 0;

      score = 0;

      level = 1;

      velocity = 0;

      roadSpeed = 18;

      player.x =
      canvas.width / 2;

      gameOver = false;

      gameLoop();

    }

  }
);