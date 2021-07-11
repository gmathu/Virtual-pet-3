//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feedPet,addDog;
var fedTime,lastFed;
var foodObj;
foodS = 30;
function preload()
{
  //load images here
dogImg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");


}

function setup() {
  database = firebase.database();
    console.log(database);
  createCanvas(1000, 700);
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 dog =  createSprite(750,250,50,50);
 dog.addImage(dogImg); 
 dog.scale = 0.2;

 
 feed = createButton("Feed the Dog")
 feed.position(900,95);
 feed.mousePressed(feedDog)

 addFood = createButton("Add Food")
addFood.position(996,95);
addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  
  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed : 12 AM ",350,30);
  }else{
    text("Last Feed : " + lastFed + "AM ",350,30);
  }
  
  drawSprites();
}

function readStock(data){

foodS = data.val();
foodObj.updateFoodStock(foodS);

}

function feedDog(){

  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




