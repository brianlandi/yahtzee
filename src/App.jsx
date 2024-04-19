import { useState } from "react";
import "./App.scss";
import Die from "./Die";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [gameState, setGameState] = useState({
    player1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer: 1,
    rollsRemaining: 3,
    turnsLeft: 13,
  });

  const [roll, setRoll] = useState([
    [null, true],
    [null, true],
    [null, true],
    [null, true],
    [null, true],
  ]);

  const handleRoll = () => {
    const updatedRoll = roll.map(([value, isRolling]) => {
      if (isRolling) {
        return [Math.floor(Math.random() * 6) + 1, isRolling];
      } else {
        return [value, isRolling];
      }
    });

    if (gameState.rollsRemaining > 0) {
      setRoll(updatedRoll);
      const updatedGameState = {
        ...gameState,
        rollsRemaining: gameState.rollsRemaining - 1,
      };

      setGameState(updatedGameState);
    } else {
      alert("you must score select a score");
    }
  };

  const toggleRollable = (rollable) => {
    const updatedRoll = roll.map((die, index) => {
      if (index === rollable) {
        return [die[0], !die[1]];
      } else {
        return die;
      }
    });

    setRoll(updatedRoll);
  };

  const updateScore = (index, score, currentPlayer) => {
    setGameState((prevState) => {
      const updatedGameState = { ...prevState };
      if (currentPlayer === 1) {
        updatedGameState.player1[index] = score;
        updatedGameState.currentPlayer = 2;
        updatedGameState.rollsRemaining = 3;
      } else if (currentPlayer === 2 && gameState.turnsLeft > 0) {
        updatedGameState.player2[index] = score;
        updatedGameState.currentPlayer = 1;
        updatedGameState.rollsRemaining = 3;
        if (gameState.turnsLeft === 1) {
          const playerOneTotal = gameState.player1.reduce(
            (acc, score) => acc + score,
            0
          );
          const playerTwoTotal = gameState.player2.reduce(
            (acc, score) => acc + score,
            0
          );

          playerOneTotal > playerTwoTotal
            ? alert("Player One Wins with a score of " + playerOneTotal)
            : alert("Player Two Wins with a score of " + playerTwoTotal);
        }
        updatedGameState.turnsLeft -= 1;
      }
      const rollStart = [
        [null, true],
        [null, true],
        [null, true],
        [null, true],
        [null, true],
      ];

      setRoll(rollStart);

      return updatedGameState;
    });
  };

  const resetGameState = () => {
    const startingGameState = {
      player1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      player2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1,
      rollsRemaining: 3,
      turnsLeft: 13,
    };
    setGameState(startingGameState);
  };

  return (
    <>
      {/* <h3>Player Turn: {gameState.currentPlayer}</h3>
      <h3>Rolls Remaining: {gameState.rollsRemaining}</h3>
    <h3>Rounds Left: {gameState.turnsLeft}</h3> */}
      <div className='dieContainer'>
        <button className='newGameButton' onClick={resetGameState}>
          New Game
        </button>
        <div className='dieContainerInner'>
          {roll.map((die, index) => {
            return (
              <Die
                key={index}
                index={index}
                roll={die[0]}
                toggleRollable={toggleRollable}
                updateScore={updateScore}
                playerTurn={gameState.currentPlayer}
                rollsRemaining={gameState.rollsRemaining}
              />
            );
          })}
        </div>
        <button onClick={handleRoll} disabled={gameState.rollsRemaining === 0}>
          Roll
        </button>
      </div>
      <ScoreBoard
        playerOneScore={gameState.player1}
        playerTwoScore={gameState.player2}
        roll={roll}
        currentPlayer={gameState.currentPlayer}
        updateScore={updateScore}
      />
    </>
  );
}

export default App;

/* 
TODO
- Scoreboard of recent games
- Upper section bonus
*/
