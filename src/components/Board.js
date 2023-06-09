import React,{useState,useEffect} from 'react';
import CreateBoard from './CreateBoard';
import  {revealed}  from "./Reveal";
import Cell from './Cell';



function Board(props) {
    const {row,col,numBombs} = props;
    const [board,setBoard]=useState([]); // [[]]
    const [nonMinecount,setNonMinecount]=useState(0);
    const [mineLocation,setmineLocation]=useState([]);
    const style={
        display : 'flex',
        flexDirection : 'row',
        width:'fit-content',
        color:'red',
        fontSize : "15px",
    }

    useEffect(()=>{
        
        freshBoard();
    },[]);

    const freshBoard = () => {
        const newBoard=CreateBoard(row,col,numBombs);
        setNonMinecount(row*col-numBombs);
        setmineLocation(newBoard.mineLocation);
        setBoard(newBoard.board);
    }

    const updateFlag=(e,x,y)=>{
        e.preventDefault();
        // deep copy of the object
        let newGrid=JSON.parse(JSON.stringify(board));
        newGrid[x][y].flagged=true;
   
        setBoard(newGrid);
    }
    
    const newfresh=()=>{
        freshBoard();
    }

    const revealCell=(x,y)=>{
        //deep copy
        let newGrid=JSON.parse(JSON.stringify(board));
        if(newGrid[x][y].value===-1){
            for(let i=0;i<mineLocation.length;i++){
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
            }
            setBoard(newGrid);
            setTimeout(newfresh,500);
        }
        if(nonMinecount===0){
         
            setTimeout(newfresh,500);
        }
        else{
            let revealedboard=revealed(newGrid,x,y,nonMinecount);
            setBoard(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        }
        
    }
    
    return (
        <div className="parent">
            <div>
                <h3 style={{color:'white',textAlign:'center',fontSize:'35px',margin:'0px'}}>Valid Cells :  {nonMinecount}</h3>
            
                {board.map((singlerow,index1)=>{

                    return (

                        <div style={style} key={index1}>

                            {singlerow.map((singlecol,index2)=>{
                            return<Cell details={singlecol} key={index2} updateFlag={updateFlag} revealCell={revealCell} />
                            })}
                            
                        </div>
                    )
                })}

            </div>
          
        </div>
    ) 
}
export default Board;