import React, { useState, useEffect } from "react";

const Test = () => {
  const [turnPlay, setTurnPlay] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [timer, setTimer] = useState(40); // 2 minutes
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkForWinner = (squares) => {
    let combos = {
      accross: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        )
          return false;
        else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          return true;
        }
      });
    }

    return false;
  };

  const handleClick = (num) => {
    if (gameOver || winner) {
      return;
    }

    if (cells[num] !== "") {
      alert("Already played");
      return;
    }

    const newCells = cells.map((cell, index) => (index === num ? turnPlay : cell));
    setCells(newCells);
    setTurnPlay(turnPlay === "x" ? "o" : "x");
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setTurnPlay("x");
    setIsDraw(false);
    // Reset timer to 2 minutes
    
    if(gameOver)
    {
        setTimer(40);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        // Timer has reached 0, game is over
        setGameOver(true);
        announceResult();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const announceResult = () => {
    const winnerX = winner === "x";
    const winnerO = winner === "o";

    if (winnerX) {
      setScoreX(scoreX + 1);
    } else if (winnerO) {
      setScoreO(scoreO + 1);
    }

    if (scoreX > scoreO) {
      alert("Player X wins!");
    } else if (scoreO > scoreX) {
      alert("Player O wins!");
    } else {
      alert("It's a tie!");
    }
  };

  const Cell = ({ num }) => {
    return (
      <td
        className="w-28 h-28 text-center font-bold text-6xl border-sky-100 border-2 shadow-md rounded-md"
        onClick={() => handleClick(num)}
      >
        {cells[num]}
      </td>
    );
  };

  useEffect(() => {
    checkForWinner(cells);
  }, [cells]);

  useEffect(() => {
    if (winner) {
      setIsDraw(false);
    } else if (cells.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  }, [cells, winner]);

  return (
    <div className=" w-full h-full p-4">
      <div className="flex justify-center items-center">
        <span className="bg-blue-300 p-4 rounded-md font-bold text-xl">
          Timer: {timer} sec
        </span>
      </div>
      <div className=" flex justify-around">
        <div className="p-2">
          {turnPlay === "o" ? (
            <p className="bg-orange-300 p-4 duration-500 rounded-md font-bold text-lg">
              Player: X
            </p>
          ) : (
            <p className="bg-orange-500 p-4 scale-150 rounded-md font-bold text-lg">
              Player: X
            </p>
          )}
          <p className="text-lg font-bold mt-6">Score: {scoreX}</p>
        </div>
        <div className="p-2 h-auto">
          {turnPlay === "x" ? (
            <p className="bg-green-300 p-4 duration-500 rounded-md font-bold text-lg">
              Player: O
            </p>
          ) : (
            <p className="bg-green-500 scale-150 p-4 rounded-md font-bold text-lg">
              Player: O
            </p>
          )}
          <p className="text-lg font-bold mt-6">Score: {scoreO}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <table className="text-0 border-inherit border-collapse bg-sky-200">
          <caption className="mb-2 font-bold text-xl">
            Turn: {turnPlay.toUpperCase()}
          </caption>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        {isDraw ? (
          <>
            <h1>Draw!</h1> <button onClick={handleRestart}>Restart Game</button>
          </>
        ) : winner ? (
          <>
            <h1 className="text-2xl mt-2 font-bold text-pink-400">
              {winner.toUpperCase()} is the winner
            </h1>{" "}
            <button
              className="mt-2 shadow-md bg-black text-white p-3 hover:bg-red-200  hover:text-black hover:border-2 font-semibold text-lg rounded-md"
              onClick={handleRestart}
            >
              Restart Game
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Test;
