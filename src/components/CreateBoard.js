import React from "react";
var directions= { 
    top: {
        x : 0 , 
        y : -1
    },
    bottom: {
        x: 0,
        y: 1
    },
    left:{
        x: -1,
        y: 0
    },
    right:{
        x: 1,
        y: 0
    },
    topLeft:{
        x: -1,
        y: -1
    },
    topRight:{
        x: 1,
        y: -1
    },
    bottomLeft:{
        x: -1,
        y: 1
    },
    bottomRight:{
        x:1 ,
        y:1
    }
};


function createBoard(row,col,numBombs){
        
    var mat = [];
    var mineLoc = [];


    for (let x = 0; x < row; x++) {
        const rowArray = [];
        
        for (let y = 0; y < col; y++) {
            rowArray.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false
              });
              
        }

        mat.push(rowArray);
      }

      let bombs = 0;
      while(bombs<numBombs){

        var x = Math.floor(Math.random() * row);
        var y = Math.floor(Math.random() * col);
        
        if(mat[x][y].value === 0){  // doesnt updated it yet
            mat[x][y].value = -1; // bomb
            mineLoc.push([x,y]); // add the mine to the list of mines
            bombs++;
        }
      }

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (mat[i][j].value === -1) {
            continue;
          }

          // update cell value
          let val = 0;
          Object.keys(directions).map(direction => {
            let tempIdx_x = directions[direction].x + i;
            let tempIdx_y = directions[direction].y + j;
      
            if (tempIdx_x < row && tempIdx_x >= 0 && tempIdx_y < col && tempIdx_y >= 0) {
              if (mat[tempIdx_x][tempIdx_y].value === -1) {
                val++;
              }
            }
          });
          mat[i][j].value = val;
        }
      }
      return {
        board: mat,
        mineLocation: mineLoc
      };
      
      }
      
export { directions };
export default createBoard;
