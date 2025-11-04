import { useState } from "react";

function Square({ value, onSquarClick }) {
  return (
    <button
      className="bg-green-100 border border-orange-400  h-15 w-15 m-3 leading-1 text-lg rounded-4xl text-black"
      onClick={onSquarClick}
    >
      {value}
    </button>
  );
}

export function Board({ xIsNext, squars, onPlay }) {
  const winner = calculateWinner(squars);
  let status;

  if (winner === "draw") {
    status = "Mach is draw 😍";
  } else if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squars[i] || calculateWinner(squars)) {
      return;
    }

    const nextSquars = squars.slice();
    if (xIsNext) {
      nextSquars[i] = "X";
    } else {
      nextSquars[i] = "O";
    }
    onPlay(nextSquars);
  }

  return (
    <>
      <div className="text-black bg-purple-300 m-2 p-1 rounded-sm">
        {status}
      </div>
      <div className="flex">
        <Square value={squars[0]} onSquarClick={() => handleClick(0)} />
        <Square value={squars[1]} onSquarClick={() => handleClick(1)} />
        <Square value={squars[2]} onSquarClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squars[3]} onSquarClick={() => handleClick(3)} />
        <Square value={squars[4]} onSquarClick={() => handleClick(4)} />
        <Square value={squars[5]} onSquarClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squars[6]} onSquarClick={() => handleClick(6)} />
        <Square value={squars[7]} onSquarClick={() => handleClick(7)} />
        <Square value={squars[8]} onSquarClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handleRestart() {
    setHistory([Array(9).fill(null)]); 
    setXIsNext(true); 
    setCurrentMove(0);
  }

  function handlePlay(nextSquars) {
    setXIsNext(!xIsNext);
    const nexHistory = [...history.slice(0, currentMove + 1), nextSquars];
    setHistory(nexHistory);
    setCurrentMove(nexHistory.length - 1);
  }

  function jampTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squars, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to Start the Game ... `;
    }
    return (
      <li key={move} className="text-black bg-purple-300 mb-1 p-2 rounded-sm">
        <button onClick={() => jampTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex m-1 p-3 justify-center">
      <div className="bg-gray-300 border-1 center">
        <Board xIsNext={xIsNext} squars={currentSquares} onPlay={handlePlay} />
        <button
          className="mt-4 p-2 bg-purple-400 text-white rounded-lg hover:bg-red-600 m-2"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
      <div className="ml-5 p-3 bg-green-100 border-1 text-bold">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squars) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Winner check
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squars[a] && squars[a] === squars[b] && squars[a] === squars[c]) {
      return squars[a];
    }
  }
  if (!squars.includes(null)) {
    return "draw";
  }

  return null;
}
