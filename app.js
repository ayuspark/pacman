'use strict';
var world = [];
var rowNumber = Math.floor((window.innerHeight - 200)/20);
console.log(rowNumber, window.innerHeight);
var colNumber = Math.floor((window.innerWidth - 200)/20);
console.log(colNumber, window.innerWidth);

function createWorldArray(){
  for(let j = 0; j < rowNumber; j++){
    var rowInWorld = new Array(colNumber);
    for(let i = 0; i < colNumber; i++){
      rowInWorld[i] = Math.floor(Math.random() * 2);
      if(j > 1 && i > 0 && j < rowNumber - 1 && i < colNumber - 1){
        if(rowInWorld[i] === 1 && world[j - 1][i] === 0 && rowInWorld[i - 1] === 0){
          world[j - 1][i - 1] = 1;
          world[j - 1][i] = 1;
          world[j - 1][i + 1] = 1;
          rowInWorld[i - 1] = 1;
          rowInWorld[i + 1] = 1;
          continue;
        }
      }
    }
    world.push(rowInWorld);
  }
  //create borders
  world.forEach(function(val){
    val[0] = 0;
    val[val.length - 1] = 0;
  })
  world[0].fill(0);
  world[world.length - 1].fill(0);
  world[1][1] = 1; //leave space for pacman
  // console.table(world);

}

function displayWorld(){
  document.getElementById('world_container').style.width = (window.innerWidth - 200) + 'px';

  for(let j = 0; j < world.length; j++){
    for(let i = 0; i < world[j].length; i++){
      var div = document.createElement('div');
      var br = document.createElement('br');
      if(world[j][i] === 0){
        div.setAttribute('class', 'brick');
      } else {
        div.setAttribute('class', 'coin');
      }
      document.getElementById('world_container').appendChild(div);
      if(i === world[j].length - 1){
        document.getElementById('world_container').appendChild(br);
      }
    }
  }
}

var pacmanDiv = document.createElement('div');
function Pacman(x, y){
  this.x = x;
  this.y = y;
  this.createPacmanDiv = function (){
    pacmanDiv.setAttribute('id', 'pacman');
    document.getElementById('world_container').appendChild(pacmanDiv);
  }
}

//counting the coins
Pacman.count = 0;

function displayPacman(x, y){
  pacmanDiv.style.top = y * 1.25 + 'rem';
  pacmanDiv.style.left = x * 1.25 + 'rem';
}

function movePacman(e){
  var key = e.keyCode;
  console.log(key);
  if(key === 38 && world[pacman1.y - 1][pacman1.x] !== 0){
    pacman1.y -= 1;
    // eatCoin(pacman1.y, pacman1.x);
  } else if(key === 40 && world[pacman1.y + 1][pacman1.x] !== 0){
    pacman1.y += 1;
  } else if(key === 37 && world[pacman1.y][pacman1.x - 1] !== 0){
    pacman1.x -= 1;
    // eatCoin(pacman1.y, pacman1.x - 1);
  } else if(key === 39 && world[pacman1.y][pacman1.x + 1] !== 0){
    pacman1.x += 1;
    // eatCoin(pacman1.y, pacman1.x + 1);
  }
  eatCoin(pacman1.y, pacman1.x);
  // eatCoin(pacman1.y, pacman1.x);
  displayPacman(pacman1.x, pacman1.y);
  // console.log('pacman posiiton' + pacman1.y + ' ' + pacman1.x);
}

function eatCoin(y, x){
  if(world[y][x] === 1){
    // world[y][x] = 0;
    var divPosition = pacman1.y * (colNumber + 1) + pacman1.x;
    var coinEatenDiv = document.getElementById('world_container').children[divPosition];
    // console.log(divPosition, coinEatenDiv);
    coinEatenDiv.setAttribute('class', '');
    Pacman.count++;
  }
  document.getElementById('score').innerHTML = Pacman.count;
  // console.log(Pacman.count);
}

createWorldArray();
displayWorld();
var pacman1 = new Pacman(1, 1);
pacman1.createPacmanDiv();
displayPacman(pacman1.x, pacman1.y);

window.addEventListener('keydown', movePacman);
