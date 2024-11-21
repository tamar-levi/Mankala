import React, { useState } from "react";
import "./App.css";
import Confetti from 'react-confetti'; // הוספת ייבוא של Confetti


const App = () => {
  const initialBoard = [
    [4, 4, 4, 4, 4, 4], // שחקן 1
    [4, 4, 4, 4, 4, 4], // שחקן 2
    [0, 0], // מחסניות
  ];

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const handlePitClick = (row, col) => {
    if (winner) return; // אם יש מנצח, אי אפשר להמשיך לשחק
    if (row + 1 !== currentPlayer) return; // למנוע משחק בשורה של השחקן השני

    const newBoard = [...board.map(row => [...row])];
    let stones = newBoard[row][col];
    if (stones === 0) return; // אם אין אבנים, אי אפשר לשחק

    newBoard[row][col] = 0; // לרוקן את הבור הנבחר
    let currentRow = row;
    let currentCol = col;

    while (stones > 0) {
      currentCol++;
      if (currentCol > 5) {
        if (currentRow === 0 && currentPlayer === 1) {
          // שחקן 1 יכול להוסיף למחסנית שלו
          newBoard[2][0]++;
          stones--;
        } else if (currentRow === 1 && currentPlayer === 2) {
          // שחקן 2 יכול להוסיף למחסנית שלו
          newBoard[2][1]++;
          stones--;
        }
        if (stones === 0) break; // אם אין יותר אבנים, סיים
        currentRow = 1 - currentRow; // לעבור לשורה של השחקן הנוכחי
        currentCol = -1; // אתחול של העמודה
      } else if (currentRow === currentPlayer - 1) {
        // להפיץ רק בשורה של השחקן הנוכחי
        newBoard[currentRow][currentCol]++;
        stones--;
      }
    }

    setBoard(newBoard);

    // בדיקת סיום המשחק
    if (newBoard[0].every(pit => pit === 0) || newBoard[1].every(pit => pit === 0)) {
      const player1Score = newBoard[2][0] + newBoard[0].reduce((acc, stones) => acc + stones, 0);
      const player2Score = newBoard[2][1] + newBoard[1].reduce((acc, stones) => acc + stones, 0);

      setWinner(player1Score > player2Score ? "Player 1" : "Player 2");
    } else {
      // מעבר לשחקן הבא
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const renderPits = row => {
    return board[row].map((stones, index) => (
      <div key={index} className="pit" onClick={() => handlePitClick(row, index)}>
        {Array.from({ length: stones }).map((_, idx) => (
          <div key={idx} className="stone"></div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Mankala Game</h1>
      {winner ? (
        <div className="winner">
          🎉 {winner} Wins! 🎉
        </div>
      ) : (
        <div className="current-player">Current Player: {currentPlayer}</div>
      )}
       {winner && <Confetti />}
      <div className="board">
        <div className="store">{board[2][0]}</div>
        <div className="pits-container">
          <div className="pits">{renderPits(0)}</div>
          <div className="pits">{renderPits(1)}</div>
        </div>
        <div className="store">{board[2][1]}</div>
      </div>
    </div>
  );
};

export default App;
