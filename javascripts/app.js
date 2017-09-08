// Rover Object Goes Here
// ======================

function addRover(rovers, n) {
  for (var i = 0; i < n; i++) {
    rovers.push({
      id: i,
      direction: 0,
      position: [0, 0]
    });
  }
}

function getPosition(rover) {
  return rover.position;
}

function getOrientation (rover) {
  return DIRECTIONS[rover.direction];
}

function turnRight(rover){
  rover.direction--;

  if (rover.direction < 0) {
    rover.direction = DIRECTIONS.length - 1;
  }

  return rover.direction;
}

function turnLeft(rover){

  rover.direction++;

  if (rover.direction > DIRECTIONS.length - 1) {
    rover.direction = 0;
  }

  return rover.direction;
}

function freeOfObstacules(pos, obstacles) {
  return obstacles.filter(function (o) {
    return o[0] === pos[0] && o[1] === pos[1];
  }).length === 0;
}

function isFree(pos, rovers) {
  return rovers.filter(function (o) {
    return o[0] === pos[0] && o[1] === pos[1];
  }).length === 0;
}

function moveFordward(rover, obstacles, rovers){
  var orientation = getOrientation(rover);
  var temp = rover.position.slice(0);

  if (orientation === 'W' && temp[0] > 0) {
      temp[0] -= 1;
  } else if (orientation === 'E' && temp[0] < 9) {
      temp[0] += 1;
  } else if (orientation === 'N' && temp[1] > 0 ) {
      temp[1] -= 1;
  } else if (orientation === 'S' && temp[1] < 9 ) {
      temp[1] += 1;
  }

  if (!freeOfObstacules(temp, obstacles)) {
    console.log('Obstacule at ' + temp);
  } else if (!isFree(temp, rovers)) {
    console.log('Rover at ' + temp);
  } else {
    rover.position = temp.slice(0);
  }
}

function turnBackwards (rover) {
  rover.direction = rover.direction - 2;

  if (rover.direction < 0) {
    rover.direction = DIRECTIONS.length + rover.direction;
  }
}

function moveBackwards(rover, obstacles, rovers) {
  turnBackwards(rover);
  moveFordward(rover, obstacles, rovers);
}

function commands(rover, str, positions) {

  var length = str.length;

  for(var i = 0; i < length; i++) {
    if(str[i] === 'f') {
      moveFordward(rover, OBSTACLES, positions);
    } else if(str[i] === 'r') {
      turnRight(rover);
    } else if(str[i] === 'l') {
      turnLeft(rover);
    } else if(str[i] === 'b') {
      moveBackwards(rover, OBSTACLES, positions);
    }

    console.log(rover.position, rover.id);
  }
}

var DIRECTIONS = ['N', 'W', 'S', 'E'];
var OBSTACLES = [
  [1, 2],
  [4, 6],
  [7, 2]
];
var ROVERS = [];
var COMANDOS = ['lffrbff', 'rbbrff', 'lfflff', 'rfflrff', 'lffrbb'];

addRover(ROVERS, 5);

var positions = [];

for (var i = 0; i < ROVERS.length; i++) {
  positions = ROVERS.map(function (rover) {
    return getPosition(rover);
  });

  commands(ROVERS[i], COMANDOS[i], positions);
}
