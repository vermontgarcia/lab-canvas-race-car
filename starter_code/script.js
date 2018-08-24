var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

class Car{
   
  constructor(){
    this.x = 175;
    this.y = canvas.height - 80 - 20;
    this.width = 50;
    this.height = 80;
    this.image = new Image();
    this.image.src = './images/car.png';
  }   
  
  draw(){
    //if(this.y < 370) this.y += 5;
    //if(frames % 10 === 0 ) this.image = this.image === this.image1 ? this.image2 : this.image1;
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

  var interval = setInterval(function(){
      
    frames++;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    scenario.draw();
    car.draw();
    //generateObstacles();
    //drawObstacles();
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
