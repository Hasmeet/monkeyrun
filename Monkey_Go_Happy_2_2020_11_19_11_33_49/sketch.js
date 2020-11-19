var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var forest, forestImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage=loadImage("jungle.jpg");
}



function setup() {
  
  forest=createSprite(200,200,30,30);
  forest.addImage(forestImage);
  forest.velocityX=-7;
  forest.x=forest.width/2;
  
 
  ground=createSprite(400,360,900,10)  
  ground.velocityX=-7;
  ground.x=ground.width/2;
  ground.visible=false;
  console.log(ground.x);  
  
  monkey=createSprite(80,325,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.12;    
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();  
  survivalTime=0;  
  score=0;  
  
  drawSprites();
}


function draw() {
  background("white");
  
  if(gameState==PLAY){
    if(forest.x<0){
      forest.x=forest.width/2;
    }
    stroke("red");
    fill("yellow");
    textSize(20);
    text("Score = "+ score,150,80 );
    
 stroke("darkgreen");
 fill("red")
 textSize(20);  
 survivalTime=Math.ceil(frameCount/frameRate())  
 text("SurvivalTime: "+survivalTime,100,50)  ;
    
   monkey .velocityY = monkey.velocityY + 0.8
    
    if(ground.x<0){
  ground.x=ground.width/2;
  }  
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY=-15;
  } 
    
    if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+5;  
   }  
    food();  
   spawnObstacle();
  
if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  }
    else if(gameState===END){
      ground.velocityX = 0;
      forest.velocityX=0;
      
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
      
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
      
    monkey.velocityY=monkey.velocityY +0.8;  
      
      stroke("red");
    fill("yellow");
    textSize(20);
    text("Score = "+ score,150,80 );
    
 stroke("darkgreen");
 fill("red")
 textSize(20);   
 text("SurvivalTime: "+survivalTime,100,50)  ;
      
    fill("blue");
    text("Game Over",150,200);
    textSize(70);
      
  stroke("lightblue");
 fill("lightblue")
 textSize(15); 
  text("Press Enter to restart the game",70,170)
      
      if(keyDown("enter")){
        reset();
      }
    }
    
      
   monkey.collide(ground);  
   drawSprites();  
}

function food(){
if(frameCount %80===0){
banana=createSprite(500,25,10,20)
banana.y=Math.round(random(120,200));
banana.addImage(bananaImage);
banana.velocityX=-4;
banana.scale=0.1; 
banana.lifetime=200;
 
foodGroup.add(banana);  
   }  
}

function spawnObstacle(){
if(frameCount % 300===0){
var obstacle=createSprite(500,325,23,32);
obstacle.velocityX=-5;
obstacle.addImage(obstacleImage); 
obstacle.scale=0.2;  
obstacle.lifetime=200;
obstacle.setCollider("circle", 0, 0, 200);  
  
  obstacleGroup.add(obstacle);
  
   }  
}

function reset(){
   gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score = 0;
  survivalTime=0; 
  monkey.changeAnimation("moving",monkey_running);
}




