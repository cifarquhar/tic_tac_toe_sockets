import React, {useState} from 'react'
import './index.css';
import Square from './Square';

const Board = () => {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNextTurn, setXNextTurn] = useState(true);


  const calculateWinner = (gameState) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a]
      }
    }

    return null;
  }

  const winner = calculateWinner(squares);

  const status = winner ? `Winner: ${winner}` : `Next player: ${xNextTurn ? "X" : "O"}`
  
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const updatedSquares = [...squares];
    updatedSquares[i] = xNextTurn ? "X" : "O";
    setSquares(updatedSquares);
    setXNextTurn(!xNextTurn);
  }
  
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onSquareClick={() => handleClick(i)}
      />
    );
  }


  return ( 
    <div>
      <div className = "status"> 
        {status} 
      </div> 
      <div className = "board-row"> 
        {renderSquare(0)} 
        {renderSquare(1)} 
        {renderSquare(2)} 
      </div> 
      <div className = "board-row"> 
        {renderSquare(3)} 
        {renderSquare(4)} 
        {renderSquare(5)} 
      </div> 
      <div className = "board-row"> 
        {renderSquare(6)} 
        {renderSquare(7)} 
        {renderSquare(8)} 
      </div> 
    </div>
  );
    
  }
  
  export default Board;