const createGrid = function(length,breadth){
  let  cells = new Array(breadth).fill(length);
  return cells.map( x=> new Array(x).fill(0));
}

const makeCellAlive = function(grid,position){
  grid[position[0]][position[1]] = 1;
  return grid;
}

const initialGrid = function(grid,inputs){
  return inputs.reduce(makeCellAlive,grid);
}

const findNeighbours = function(cell){
  let array = [-1,0,1]
  let neighbours = [];
  array.forEach((row)=>
    array.forEach((column)=>{
      neighbours.push([row+cell[0], column+cell[1]]);
    }))
  let result = neighbours.filter((position)=> !(position[0]==cell[0] && position[1] == cell[1]));
  return result;
}

const isValidNeighbour = function(grid){
  return function(neighbour){
    return doesElementExistInARange(neighbour, grid);
  }
}

const doesElementExistInARange = function(element, grid){
  let lowerLimit = 0;
  let upperLimit = grid.length;
  let upperLimit2 = grid[0].length;

  let lowestElement = Math.min(element[0], element[1]);
  let greatestElement = Math.max(element[0], element[1]);
  return (element[0] >= 0  && element[1] >= 0 && element[0] < upperLimit && element[1] < upperLimit2);
}


const startGame = function(inputs){
  let grid = createGrid(inputs.length,inputs.breadth);
  let gridLength = grid.length;
  let initializedGrid = initialGrid(grid,inputs.aliveCells);
}

const isNeighbourAlive = function(grid){
  return function(neighbour){
    return grid[neighbour[0]][neighbour[1]] == 1;
  }
}
const isCurrentGenValid = function( bound){
  let {length, breadth} = bound;
  return function(position){
    return   position[0] >= 0 && position[1] >= 0 && position[0] <breadth && position[1]  < length; 
  }
}

const updateGridPosition = function(gridArray){
  let updatedGrid = gridArray.map(x=> x.slice());
  let length = gridArray.length;
  let breadth = gridArray[0].length;
  for(let row=0; row< length; row++){
    for(let column = 0; column< breadth; column++){
      let neighbours = findNeighbours([row,column]);
      let isValid = isValidNeighbour(gridArray);
      let validNeighbours = neighbours.filter(isValid);
      let isAlive = isNeighbourAlive(gridArray);
      let aliveNeighbours = validNeighbours.filter(isAlive).length;
      if(aliveNeighbours == 3){  
        updatedGrid[row][column] =1;
      }
      if(aliveNeighbours <2 || aliveNeighbours >3){
        updatedGrid[row][column]=0;
      }
    }
  }


  return updatedGrid;
}




module.exports = { createGrid, initialGrid, findNeighbours, isValidNeighbour, isValidNeighbour,isCurrentGenValid ,startGame , updateGridPosition};

