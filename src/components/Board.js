import React from "react";
import Pit from './Pit';
import Store from './Store';

const Board = ({ board, onMove }) => {
  return (
    <div className="board">
      {/* מחסן של שחקן 2 */}
      <Store stones={board[2][1]} />

      <div className="pits">
        {/* חורים של שחקן 2 */}
        <div className="player-row">
          {board[1].slice().reverse().map((stones, index) => (
            <Pit
              key={`player2-${index}`}
              stones={stones}
              onClick={() => onMove(2, 5 - index)}
            />
          ))}
        </div>

        {/* חורים של שחקן 1 */}
        <div className="player-row">
          {board[0].map((stones, index) => (
            <Pit
              key={`player1-${index}`}
              stones={stones}
              onClick={() => onMove(1, index)}
            />
          ))}
        </div>
      </div>

      {/* מחסן של שחקן 1 */}
      <Store stones={board[2][0]} />
    </div>
  );
};

export default Board;
