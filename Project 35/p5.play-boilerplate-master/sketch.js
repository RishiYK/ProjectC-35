var bgImg; 
var balloon, balloonImg; 
var database; 
var position; 


function preload(){ 

  bgImg = loadImage("Imgs/bg.png");
  balloonImg = loadAnimation("Imgs/Balloon.png","Imgs/Balloon2.png","Imgs/balloon3.png");
  

}


function setup() {
  //initialise database 
  database = firebase.database(); 


  //create a canvas 
  createCanvas(1500,700);
  
  //balloon sprite 
  balloon = createSprite(200, 200, 100, 100);
  balloon.addAnimation("balloonImage", balloonImg); 
  balloon.scale = 0.5

  var balloonPos = database.ref('balloon/position'); 
  balloonPos.on("value", readPosition, showError)
}

function draw() {
  background(bgImg);  

  if (keyDown("left")){
    writePosition(-10,0)
    balloon.scale = 0.7; 

  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
    balloon.scale = 0.1
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      balloon.scale = 0.3
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,10);
      balloon.scale = 0.5
  }


  drawSprites();
}

function writePosition(x, y){ 
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
  
}

function readPosition(data){
  position = data.val(); 
  balloon.x = position.x; 
  balloon.y = position.y; 
}

function showError(){
  console.log("show error");
}