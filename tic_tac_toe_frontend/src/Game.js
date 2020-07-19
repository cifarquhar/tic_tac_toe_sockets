import React, {useState, useRef} from 'react';
import './index.css';
import Board from './Board';
import SockJsClient from 'react-stomp';

const Game = () => {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNextTurn, setXNextTurn] = useState(true);
  const socketClient = useRef(null);

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

  const sendMessage = () => {
    const message = {
      player: `${xNextTurn ? "X" : "O"}`
    }
    socketClient.current.sendMessage('/app/user-all', JSON.stringify(message));
  }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const updatedSquares = [...squares];
    updatedSquares[i] = xNextTurn ? "X" : "O";
    setSquares(updatedSquares);
    sendMessage();
  }


  return ( 
    <>
      <div className = "game">
        <div className = "game-board">
          <Board 
            squares={squares}
            status={status}
            onSquareClick={handleClick}
          />
        </div> 
      </div>
      <SockJsClient 
        url="http://localhost:8080/websocket-game/"
        topics={["/topic/user"]}
        onConnect={(response) => {
          console.log(response);
        }}
        onDisconnect={(response) => {
          console.log(response);
        }}
        onMessage={(msg) => {
          console.log("response:", msg);
          setXNextTurn(msg.player === "X");
        }}
        ref={socketClient}
      />
    </>
  );
  }
  
  export default Game;