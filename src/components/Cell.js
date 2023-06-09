import React from 'react';

function Cell({ details, updateFlag, revealCell }){
    const style = {
        cellStyle:{
            width:50,
            height:50,
            backgrounColor:"grey",
            border:"1.5px solid white",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"25px"
        }
    }



    const click=()=>{
        revealCell(details.x,details.y);  
    }
    
    // Right Click Function
    
    const rightclick=(e)=>{
        updateFlag(e,details.x,details.y)

    }

    return (
        <div style={style.cellStyle} onClick={click} onContextMenu={rightclick}>
            {!details.revealed && details.flagged ? ("🚩") : details.revealed && details.value !== 0 ? (
        details.value === -1 ? ("😿" ) : (
          details.value)
      ) : (
        ""
      )}
        </div>
    )

}

export default Cell;