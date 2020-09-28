//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogSprite;
var database;

function preload()
{
  dog = loadImage("./images/dogImg.png");
  happyDog = loadImage("./images/dogImg1.png");
  
}

function setup() {
	createCanvas(500, 500);
  dogSprite = createSprite(250,300,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() { 


background(46, 139, 87);
fill("yellow");
textSize(15);
stroke("blue");
text("Press UP ARROW key to feed Bruno a treat and make him happy :)",20,30);
fill("purple");
textSize(25);
stroke("red");

text("Treats Remaining: "+foodS,150,150);
dogSprite.addImage(dog);

if(keyWentDown(UP_ARROW)){
  if(foodS>=1)
  {
    foodS = foodS-1;
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  
}
  drawSprites();
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<0){
    x=0;
  }
  database.ref('/').update({Food :x});

}


