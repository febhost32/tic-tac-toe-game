import React from "react";

const ScoreBoard = ({ playerOne, playerTwo, draw }) => {
  return (
    <div className="scoreboard">
      <div className="player-one">Player One(X)<br/>{playerOne}</div>
      <div className="draw">Draw<br/>{draw}</div>
      <div className="player-two">Player Two(O)<br/>{playerTwo}</div>
    </div>
  );
};

export default ScoreBoard;
