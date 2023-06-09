import React from 'react';
import Board from "./Board";
import '../Game.css';
function Game(){
    return(
        <div>
        <div className="heading">
        <h1>Dont Touch The Cat!</h1>
        </div>
        <div className="aligned">   
          <Board row = {10} col = {10} numBombs = {20}/>
        </div>
      </div>
    )
}
export default Game;