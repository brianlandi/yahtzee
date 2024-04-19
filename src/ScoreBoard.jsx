import React, { useEffect, useState } from "react";

const ScoreBoard = ({
  playerOneScore,
  playerTwoScore,
  currentPlayer,
  roll,
  updateScore,
}) => {
  const [currentScore, setCurrentScore] = useState(
    Array.from({ length: 13 }, () => 0)
  );

  const scoreTitles = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "Three of a Kind",
    "Four of a Kind",
    "Full House",
    "Small Straight",
    "Large Straight",
    "Yahtzee",
    "Chance",
  ];

  const [playerOneScored, setPlayerOneScored] = useState(
    Array.from({ length: 13 }, () => false)
  );

  const [playerTwoScored, setPlayerTwoScored] = useState(
    Array.from({ length: 13 }, () => false)
  );

  const handleUpdateScore = (index, score, currentPlayer) => {
    if (currentPlayer === 1 && playerOneScored[index] === false) {
      updateScore(index, score, currentPlayer);
      const playerOneScoredCopy = [...playerOneScored];
      playerOneScoredCopy[index] = true;
      setPlayerOneScored(playerOneScoredCopy);
    } else if (currentPlayer === 2 && playerTwoScored[index] === false) {
      updateScore(index, score, currentPlayer);
      const playerTwoScoredCopy = [...playerTwoScored];
      playerTwoScoredCopy[index] = true;
      setPlayerTwoScored(playerTwoScoredCopy);
    }
  };

  useEffect(() => {
    scoreHand(roll);
  }, [roll]);

  const scoreHand = (roll) => {
    roll = roll.map((element) => element[0]);

    // Counts of each number
    const counts = [0, 0, 0, 0, 0, 0];
    roll.forEach((element) => {
      const value = element;
      counts[value - 1]++;
    });

    // Sum of each number
    const sums = [0, 0, 0, 0, 0, 0];
    roll.forEach((element) => {
      const value = element;
      sums[value - 1] += value;
    });

    // Sum of all dice
    const sumAll = roll.reduce((acc, element) => acc + element, 0);

    const updatedCurrentScore = [...currentScore];

    // Sum scores
    sums.forEach((sum, index) => {
      updatedCurrentScore[index] = sum;
    });

    // Three Kind / Four Kind
    const threeKind = counts.filter((count) => count === 3).length;
    const fourKind = counts.filter((count) => count === 4).length;

    updatedCurrentScore[6] = threeKind === 1 ? sumAll : 0;
    updatedCurrentScore[7] = fourKind === 1 ? sumAll : 0;

    // Full House
    const fullHouseArray = counts.filter((num) => num !== 0);
    fullHouseArray.sort();

    updatedCurrentScore[8] =
      fullHouseArray[0] === 2 && fullHouseArray[1] === 3 ? 25 : 0;

    // Small and Large Straight
    const uniqueArray = [...new Set(roll)];
    const sortedUniqueArray = uniqueArray.sort();

    updatedCurrentScore[9] =
      (sortedUniqueArray.length >= 4 &&
        sortedUniqueArray.includes(1) &&
        sortedUniqueArray.includes(2) &&
        sortedUniqueArray.includes(3) &&
        sortedUniqueArray.includes(4)) ||
      (sortedUniqueArray.includes(2) &&
        sortedUniqueArray.includes(3) &&
        sortedUniqueArray.includes(4) &&
        sortedUniqueArray.includes(5)) ||
      (sortedUniqueArray.includes(3) &&
        sortedUniqueArray.includes(4) &&
        sortedUniqueArray.includes(5) &&
        sortedUniqueArray.includes(6))
        ? 30
        : 0;

    updatedCurrentScore[10] =
      sortedUniqueArray.length === 5 &&
      sortedUniqueArray[4] - sortedUniqueArray[0] === 4
        ? 40
        : 0;

    // Yahtzee
    updatedCurrentScore[11] =
      uniqueArray.length === 1 && uniqueArray[0] !== null ? 50 : 0;

    // Chance
    updatedCurrentScore[12] = sumAll;

    setCurrentScore(updatedCurrentScore);
  };

  return (
    <div className='scoreboard'>
      <table className='playerTotals'>
        <thead>
          <tr>
            <td>Player 1 Total</td>
            <td>Player 2 Total</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{playerOneScore.reduce((acc, score) => acc + score, 0)}</td>
            <td>{playerTwoScore.reduce((acc, score) => acc + score, 0)}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className={currentPlayer === 1 ? "highlight" : ""}>
              Player One
            </th>
            <th className={currentPlayer === 2 ? "highlight" : ""}>
              Player Two
            </th>
          </tr>
        </thead>
        <tbody>
          {scoreTitles.map((title, index) => {
            return (
              <tr key={title}>
                <td>{title}</td>
                <td
                  onClick={() => {
                    if (currentPlayer === 1) {
                      handleUpdateScore(
                        index,
                        currentScore[index],
                        currentPlayer
                      );
                    }
                  }}
                  className={
                    playerOneScored[index] === false && currentPlayer === 1
                      ? "scoreable"
                      : ""
                  }>
                  {currentPlayer === 1
                    ? playerOneScore[index] === 0
                      ? currentScore[index]
                      : playerOneScore[index]
                    : playerOneScore[index]}
                </td>
                <td
                  onClick={() => {
                    if (currentPlayer === 2) {
                      handleUpdateScore(
                        index,
                        currentScore[index],
                        currentPlayer
                      );
                    }
                  }}
                  className={
                    playerTwoScored[index] === false && currentPlayer === 2
                      ? "scoreable"
                      : ""
                  }>
                  {currentPlayer === 2
                    ? playerTwoScore[index] === 0
                      ? currentScore[index]
                      : playerTwoScore[index]
                    : playerTwoScore[index]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
