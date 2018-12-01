const  { createGrid, initialGrid, updateGridPosition, isCurrentGenValid, findNeighbours, isValidNeighbour, startGame } = require('./gameLibrary.js');

const nextGeneration = function(currGeneration,bounds) {
  let { topLeft,bottomRight } = bounds;
  let breadth = bottomRight[0] - topLeft[0] + 1;
  let length = bottomRight[1] - topLeft[1] + 1;

  let grid = createGrid(length,breadth);
  let newBound = {length, breadth}

  let filterCurrGeneration = isCurrentGenValid(newBound);

  currGeneration=  currGeneration.map((x)=> [x[0] - topLeft[0], x[1] - topLeft[1]]);
  currGeneration= currGeneration.filter( filterCurrGeneration);

  grid =  initialGrid(grid, currGeneration);
  let updatedGrid = updateGridPosition(grid);
  let aliveGeneration=[];
  for(let row = 0; row < breadth; row++){
    for(let column = 0; column < length; column++){
      updatedGrid[row][column] == 1 && aliveGeneration.push([row,column]);
    }
  }
  return aliveGeneration.map((x)=> [x[0] + topLeft[0], x[1] + topLeft[1]]);

}


module.exports = { nextGeneration };
