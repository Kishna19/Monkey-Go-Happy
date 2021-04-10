var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,background;
var bananaImage,obstacleImage,backgroundImage,monkeyImage;
var obstacleGroup,bananaGroup;
var invisibleGround;

var score = 0;

function preload()
{
  backgroundImage = loadImage("jungle.jpg");
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",                     "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(800,500);
  
  background = createSprite(500,250,20,20);
  background.addImage(backgroundImage);
  background.scale = 1.8;
  
  monkey = createSprite(50,450,20,20);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale = 0.16;
  
  invisibleGround = createSprite(200,495,1200,20);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}

function draw() {
  
  if(gameState === PLAY){
  
  // moving ground
    background.velocityX = -5 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  monkey.collide(invisibleGround);
  obstacleGroup.collide(invisibleGround);
  
  if(keyDown("space") && monkey.y >= 160)
  {
    monkey.y = monkey.y - 15
  }
  
  monkey.velocityY = monkey.velocityY + 0.2;
  
  food();
  spawnObstacle();
  
  if(monkey.isTouching(bananaGroup))
  {
    bananaGroup.destroyEach();
    score = score +1;
  } 
  
  
   if(monkey.isTouching(obstacleGroup))
  {
    monkey.collide(obstacleGroup);
    bananaGroup.destroyEach();
    monkey.velocityX = 0;
    obstacleGroup.velocityX = 0;
    background.velocityX = 0;
    gameState = END;
  }
  
  
  drawSprites();
  
  fill("yellow");
  textSize(15);
  text("Score:" + score,400,20);
  
  }else if(gameState === END)
  {
    score = 0
    
    stroke("red");
    textSize(30);
    fill("red");
    text("GAME OVER",400,250); 
    
    stroke("red");
    textSize(20);
    fill("red");
    text("PRESS r",380,200); 
    
    PressR();
  }
  
  //console.log(monkey.y);
  //monkey.debug = true;
  
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, Math.round(random(165,320)), 20, 20);
    //banana.debug = true;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.setLifetime = 200;
    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(740, 450, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.35;
    obstacle.setCollider("rectangle", 0, 0, 400, 300);
    //obstacle.debug = true;
    obstacle.velocityX = -8;
    obstacle.setLifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function PressR()
{
  if(keyDown("r") && gameState === END)
  {
   gameState = PLAY;
  }
}