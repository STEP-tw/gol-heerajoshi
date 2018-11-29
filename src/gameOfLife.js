const  { createGrid,initialGrid, updateGridPosition, findNeighbours, isValidNeighbour,  startGame } = require('./gameLibrary.js');

const nextGeneration = function(currGeneration,bounds) {
  let { topLeft,bottomRight } = bounds;
  let length = bottomRight[0] - topLeft[0] + 1;
  let breadth = bottomRight[1] - topLeft[1] + 1;
  let grid = createGrid(length,breadth);

  grid=  initialGrid(grid, currGeneration);

  grid =updateGridPosition(grid);

  let aliveGeneration=[];
  for(let row=0; row< length; row++){
    for(let column = 0; column<breadth; column++){
      grid[row][column]==1 && aliveGeneration.push([row,column]) ;
    }
  }
  return aliveGeneration;
}

module.exports = { nextGeneration };
