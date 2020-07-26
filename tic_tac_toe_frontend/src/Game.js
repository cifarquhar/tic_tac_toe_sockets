import React, {useState, useRef} from 'react';
import './index.css';
import Board from './Board';
import SockJsClient from 'react-stomp';

const Game = () => {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerLetter, setPlayerLetter] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(false);
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

  const status = winner ? `Winner: ${winner}` : `${currentTurn ? "It's your turn!" : "Waiting for opponent..."}`

  const sendMessage = (clickedSquareIndex) => {
    const message = {
      player: `${playerLetter}`,
      indexToUpdate: `${clickedSquareIndex}`
    }
    socketClient.current.sendMessage('/app/user-all', JSON.stringify(message));
  }

  const registerPlayer = () => {
    socketClient.current.sendMessage('/app/register-player');
  }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || !currentTurn) {
      return;
    }
    const updatedSquares = [...squares];
    updatedSquares[i] = playerLetter;
    setSquares(updatedSquares);
    sendMessage(i);
  }

  const handleServerResponse = (message) => {
    switch (message.type) {
      case "registration":
        if (message.playerNumber === 1) {
          setPlayerLetter("X");
          setCurrentTurn(true);
        }
        else if (message.playerNumber === 2 && !playerLetter) {
          setPlayerLetter("O");
        }
        break;
      case "turn":
        const updatedSquares = [...squares];
        updatedSquares[message.indexToUpdate] = message.player === "X" ? "O" : "X";
        setSquares(updatedSquares);
        setCurrentTurn(playerLetter === message.player);
        break;
      default:
        break;
    }
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
        onConnect={() => {
          registerPlayer();
        }}
        onDisconnect={(response) => {
          console.log(response);
        }}
        onMessage={(msg) => {
          console.log("response:", msg);
          // setXNextTurn(msg.player === "X");
          handleServerResponse(msg);
        }}
        ref={socketClient}
      />
    </>
  );
  }
  
  export default Game;