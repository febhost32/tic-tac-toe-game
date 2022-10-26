import React from "react";
import "./styles.css";
import ScoreBoard from "./scoreBoard";
import CurrentPlayer from "./currentPlayer";

let initialGame = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function App() {
  const [player, setPlayer] = React.useState(1);
  const [game, setGame] = React.useState(initialGame);
  const [draw, setDraw] = React.useState(false);
  const [counts, setCounts] = React.useState({
    playerOne: 0,
    playerTwo: 0,
    draw: 0
  });

  let playerOneCount = window.sessionStorage.getItem("playerOne");
  let playerTwoCount = window.sessionStorage.getItem("playerTwo");
  let drawCount = window.sessionStorage.getItem("draw");
  
  React.useEffect(() => {
    if (playerOneCount || playerTwoCount || drawCount) {
      setCounts({
        playerOne: playerOneCount ? playerOneCount : 0,
        playerTwo: playerTwoCount ? playerTwoCount : 0,
        draw: drawCount ? drawCount : 0
      });
    } else {
      resetCounts();
    }
  }, [])

  const resetCounts = () => {
    window.sessionStorage.setItem("playerOne", 0);
    window.sessionStorage.setItem("playerTwo", 0);
    window.sessionStorage.setItem("draw", 0);
    setCounts(
      {
        playerOne: 0,
        playerTwo: 0,
        draw: 0
      }
    );
  }

  const addCounts = (winner, counts) => {
    const newCount = counts;
    
    if (winner === 1){
      newCount.playerOne ++;
      window.sessionStorage.setItem("playerOne", newCount.playerOne);
    }

    if (winner === 2){
      newCount.playerTwo ++;
      window.sessionStorage.setItem("playerTwo", newCount.playerTwo);
    }

    if (winner === 0){
      newCount.draw ++;window.sessionStorage.setItem("draw", newCount.draw);
    }

    setCounts(newCount);
  }

  const clearGame = () => {
    setTimeout(() => {
      setGame(initialGame);
      setPlayer(1);
      setDraw(false);
    }, 500);
  };

  const isGameEnd = (game) => {
    let end = false;
    let player = 0;
    let arrayChecks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    arrayChecks.forEach((array) => {
      if (
        game[array[0]] === game[array[1]] &&
        game[array[1]] === game[array[2]] &&
        game[array[0]] !== 0
      ) {
        end = true;
        player = game[array[0]];
      }
    });

    return {
      isEnd: end,
      winner: player
    };
  };

  const processGame = (e) => {
    const boxPosition = e.target.dataset.positionindex;
    const nextGame = [...game];

    // check if already filled or ended or draw
    if (nextGame[boxPosition] !== 0 || isGameEnd(nextGame).isEnd || draw) {
      return;
    }

    nextGame[boxPosition] = player;

    setPlayer((state) => (state === 1 ? 2 : 1));
    setGame(nextGame);

    if (isGameEnd(nextGame).isEnd === true) {
      const winner = isGameEnd(nextGame).winner;
      addCounts(winner, counts);
      clearGame();
    }

    if (nextGame.indexOf(0) === -1 && !isGameEnd(nextGame).isEnd) {
      setDraw(true);
      addCounts(0, counts);
      clearGame();
    }
  };

  const fieldHtml = game.map((item, index) => {
    return (
      <div
        className="box-child"
        key={index}
        data-positionindex={index}
        onClick={(e) => processGame(e)}
      >
        {item > 0 ? `${item === 1 ? "X" : "O"}` : ""}
      </div>
    );
  });

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="box-container">{fieldHtml}</div>
      <section className="score-and-player">
        <ScoreBoard playerOne={counts.playerOne} playerTwo={counts.playerTwo} draw={counts.draw} />
        <CurrentPlayer currentPlayer={player} />
      </section>
      <button onClick={() => resetCounts()}>Reset Counters</button>
    </div>
  );
}
