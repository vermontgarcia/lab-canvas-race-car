var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval;
var positions = [canvas.width * 16 / 100,canvas.width * 32 / 100,canvas.width * 53 / 100,canvas.width * 69 / 100];
var velocities = [20];
var carImages = ['./images/red-car.png', './images/car.png']

class Car{
   
  constructor(){
    this.x = 165;
    this.y = canvas.height - 110 - 20;
    this.width = 70;
    this.height = 110;
    this.image = new Image();
    this.image.src = './images/green-f1-car.png';
  }
  
  collition(item){
    return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
}
  
  draw(){
    //if(this.y < 370) this.y += 5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ObsacleCar{
  constructor(position, velocity, carImage){
      this.x = position;
      this.y = -120;
      this.image = new Image();
      this.image.src = carImage;
      this.obstacleVelocity = velocity;
      this.width = 60;
      this.height = 100;
  }

  draw(){
      //if(this.y < 370) this.y += 5;
      //if(frames % 10 === 0 ) this.image = this.image === this.image1 ? this.image2 : this.image1;
      if(frames % 10 === 0 ){
        
        this.y += this.obstacleVelocity

      } 
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

  
class Scenario{
  
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.leftLineX = canvas.width * 11 / 100 ;
    this.rigthLineX = canvas.width * 86 / 100  ;
    this.lateralLinesWidth = canvas.width * 3 / 100  ;
    this.centerLineX = canvas.width * 50 / 100  ;
    this.roadX = canvas.width * 8 / 100 ;
    this.roadWidth = canvas.width * 84 / 100 ;
  }

  gameOver(){
    clearInterval(interval);
    ctx.font = "40px Avenir";
    // Dibujamos el texto en el canvas.
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", canvas.width/2, 190);
    //sonido.pause();
}
  
  draw(){      
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x,this.y,this.width, this.height);
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.roadX,this.y,this.roadWidth, this.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.leftLineX,this.y,this.lateralLinesWidth, this.height);
    ctx.fillRect(this.rigthLineX,this.y,this.lateralLinesWidth, this.height);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.setLineDash([20,15]);
    if(Math.floor(frames/(velocity * 10)) % 2 === 0 ){
      ctx.moveTo(this.centerLineX,this.y-5);
      ctx.lineTo(this.centerLineX, canvas.height);
    } else {
      ctx.moveTo(this.centerLineX,this.y-20);
      ctx.lineTo(this.centerLineX, canvas.height);
    } 
    ctx.stroke();
  }
}

var scenario = new Scenario();
var car = new Car();
var frames = 0;
var velocity = 5;

function startGame() {

  interval = setInterval(function(){
      
    frames++;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    scenario.draw();
    car.draw();
    generateCars();
    drawObstacleCars();
  },1000/60);
}

addEventListener('keydown', function(e){

  
  switch(e.keyCode){
    
    case 37:
    car.x -= 10;    
    break;
    case 39:
    car.x += 10;
    break;
    case 38:
    velocity --;
    break;
    case 40:
    velocity ++;
    break;
    default:
    break;
  }
  if(e.keyCode === 32){
    mario.y -= 130;
       
  }
});


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  }; 
}


var obstacleCars = [];

function generateCars(){
  if (frames % 350 === 0 || frames % 550 === 0 || frames % 700 === 0 || frames % 900 === 0){
    let position = positions[Math.floor(Math.random() *positions.length)];
    let velocity = velocities[Math.floor(Math.random()* velocities.length)];
    let carImage = carImages[Math.floor(Math.random()*carImages.length)]

    let obstacleCar = new ObsacleCar(position, velocity, carImage);
    obstacleCars.push(obstacleCar);
  }
}

function drawObstacleCars(){
  obstacleCars.forEach(function(obstacleCar){
    obstacleCar.draw();
    if(car.collition(obstacleCar)) scenario.gameOver();
  })
}