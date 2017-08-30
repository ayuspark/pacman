'use strict';
var world = [];
var rowNumber = Math.floor((window.innerHeight - 200)/40);
console.log(rowNumber, window.innerHeight);
var colNumber = Math.floor((window.innerWidth - 200)/40);
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
  world[rowNumber-3][colNumber-4] = 4; //locate heart
  world[Math.floor(rowNumber-2)][Math.floor(colNumber-2)] = 5; //locate ghost
}

function displayWorld(){
  document.getElementById('world_container').style.width = (window.innerWidth - 200) + 'px';

  for(let j = 0; j < world.length; j++){
    for(let i = 0; i < world[j].length; i++){
      var div = document.createElement('div');
      var br = document.createElement('br');
      if(world[j][i] === 0){
        div.setAttribute('class', 'brick');
      } else if(world[j][i] === 4){
        div.setAttribute('class', 'heart');
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

var ghostDiv = document.createElement('div');
var ghost = {
  x: Math.floor(colNumber-2),
  y: Math.floor(rowNumber-2),
  createGhostDiv: function(){
    ghostDiv.setAttribute('id', 'ghost');
    document.getElementById('world_container').appendChild(ghostDiv);
  }
}

function displayGhost(x, y){
  ghostDiv.style.top = (y) * 1.25 + 'rem';
  ghostDiv.style.left = (x) * 1.25 + 'rem';
}

function rotate(key, obj){
  if(key === 38){
    obj.style.transform = 'rotate(-90deg)';
  } else if(key === 40){
    obj.style.transform = 'rotate(90deg)'
  } else if(key === 37){
    obj.style.transform = 'rotate(180deg)'
  } else if(key === 39){
    obj.style.transform = 'rotate(0)'
  }
}

function movePacman(e){
  var key = e.keyCode;
  console.log(key);
  if(key === 38 && world[pacman1.y - 1][pacman1.x] !== 0){
    pacman1.y -= 1;
    rotate(38, pacmanDiv);
  } else if(key === 40 && world[pacman1.y + 1][pacman1.x] !== 0){
    pacman1.y += 1;
    rotate(40, pacmanDiv);
  } else if(key === 37 && world[pacman1.y][pacman1.x - 1] !== 0){
    pacman1.x -= 1;
    rotate(37, pacmanDiv);
  } else if(key === 39 && world[pacman1.y][pacman1.x + 1] !== 0){
    pacman1.x += 1;
    rotate(39, pacmanDiv);
  }
  eatCoin(pacman1.y, pacman1.x);
  displayPacman(pacman1.x, pacman1.y);
}

function eatCoin(y, x){
  var divPosition = pacman1.y * (colNumber + 1) + pacman1.x;
  var coinEatenDiv = document.getElementById('world_container').children[divPosition];
  if(world[y][x] === 1){
    world[y][x] = 2;
    coinEatenDiv.setAttribute('class', '');
    Pacman.count++;
  } else if(world[y][x] === 4){
    world[y][x] = 2;
    coinEatenDiv.setAttribute('class', '');
    Pacman.count += 50;
  }
  document.getElementById('score').innerHTML = Pacman.count;
}

function moveGhost(){
  if(pacman1.x > ghost.x && world[ghost.y][ghost.x+1] !== 0){
    ghost.x ++;
  }
  if(pacman1.x < ghost.x && world[ghost.y][ghost.x-1] !== 0){
    ghost.x --;
  }
  if(pacman1.y > ghost.y && world[ghost.y+1][ghost.x] !== 0){
    ghost.y ++;
  }
  if(pacman1.y < ghost.y && world[ghost.y-1][ghost.x] !== 0){
    ghost.y --;
  }
  if(ghost.y === pacman1.y && ghost.x === pacman1.x){
    setTimeout(function(){
      window.removeEventListener('keydown', movePacman);
      window.clearInterval(ghostInterval);
      alert('you die');
    }, 200)
  }
  displayGhost(ghost.x, ghost.y)
}


createWorldArray();
displayWorld();
var pacman1 = new Pacman(1, 1);
pacman1.createPacmanDiv();
displayPacman(pacman1.x, pacman1.y);

ghost.createGhostDiv();
displayGhost(ghost.x, ghost.y);

window.addEventListener('keydown', movePacman);
var ghostInterval = window.setInterval(moveGhost, 300)
