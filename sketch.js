var trex,trexRunning
var ground, groundImage, invisibleGround
var cloudImage
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score
var gameState= "play"
var gameOverImg, restartImg
var gameOver, restart
var cloudGroup, obstacleGroup
var trexCollide
var jumpSound,dieSound,checkPointSound

function preload() {
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  trexCollide=loadAnimation("trex_collided.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkPointSound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(800,300)
  
  trex=createSprite(50,180,20,50)
  trex.addAnimation("running", trexRunning)
  trex.addAnimation("collide", trexCollide)
  trex.scale=0.5
  trex.setCollider("circle", 0,0,25)
  trex.debug=false
  
  ground=createSprite(200,180,400,20)
  ground.velocityX=-4
  ground.addImage("manoelgomes", groundImage)
  
  invisibleGround=createSprite(200,190,400,10)
  invisibleGround.visible= false
  
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible=false
  
  restart=createSprite(300,140)
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible=false
  
  obstacleGroup=createGroup()
  cloudGroup=createGroup()
  
  
  score= 0
}

function draw() {
  background(180)
  fill(0)
  text("Pontuação: "+ score, 500, 50)
  
  if(gameState=="play"){
    if(score>0 && score%300==0){
      checkPointSound.play()
    }
    
    ground.velocityX=-(4+(score/100))
    if(keyDown("space")&&(trex.y>150)){
      trex.velocityY=-10
      jumpSound.play()
    }
    trex.velocityY=trex.velocityY+0.8
    trex.collide(invisibleGround)
    
    score=round(score+0.5)
    
    if(ground.x<0){
      ground.x=ground.width/2
    }
    
    if(obstacleGroup.isTouching(trex)){
      gameState="end"
      dieSound.play()
    }
       
       
    manoelgome()
  
    manelgome()
   
    drawSprites()
    
  }
  
  else if(gameState=="end"){
    gameOver.visible=true 
    restart.visible=true
    gameOver.depth=trex.depth
    restart.depth=trex.depth
    ground.velocityX=0
    trex.velocityY=0
    trex.changeAnimation("collide", trexCollide)
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
  }
  
  if(mousePressedOver(restart)){
    gameState="play"
    gameOver.visible=false
    restart.visible=false
    trex.changeAnimation("running", trexRunning)
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    score=0
  }
  drawSprites()
  
}
function manoelgome(){
  if (frameCount%30==0){
  var manoelnuvem= createSprite(600,100,40,10)
  manoelnuvem.addImage(cloudImage)
  manoelnuvem.y=random(10,100)
  manoelnuvem.scale=0.4
  manoelnuvem.velocityX=-3
  manoelnuvem.lifetime=200
  trex.depth=manoelnuvem.depth+1
  cloudGroup.add(manoelnuvem)
  }
}

function manelgome(){
  if (frameCount%60==0){
    var obstacle= createSprite(400,165,10,40)
    obstacle.velocityX=-6
    obstacle.scale=0.5
    obstacle.lifetime=200
    var rand=round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
        break
      case 2:obstacle.addImage(obstacle2)
        break
      case 3:obstacle.addImage(obstacle3)
        break
      case 4:obstacle.addImage(obstacle4)
        break
      case 5:obstacle.addImage(obstacle5)
        break
      case 6:obstacle.addImage(obstacle6)
        break
        default :break
    }
        
       obstacleGroup.add(obstacle)
        
  }
}
