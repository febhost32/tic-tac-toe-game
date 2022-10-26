import React from "react";

const CurrentPlayer = ({ currentPlayer }) => {
  return (
    <div className="current-player">
      <div>{`${currentPlayer}P`}</div>
    </div>
  );
};

export default CurrentPlayer;
