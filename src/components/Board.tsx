import { useEffect, useState } from "react";
import Square from "./Square";
import type { BoardState, Player } from "../types";
import { checkWinner, isBoardFull } from "../util/checkWinner";
import WhoseTurn from "./WhoseTurn";
import Modal from "./Modal";

export default function Board() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const winner = checkWinner(board);
  const draw = !winner && isBoardFull(board);

  console.log(winner);

  function handleClickSquare(index: number) {
    if (board[index] || winner) return;

    const newBoard: BoardState = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    //Swtich Player
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setIsModalOpen(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (winner || draw) {
      setIsModalOpen(true);
    }
  }, [winner, draw]);

  return (
    <section className="mb-8 flex flex-col justify-center md:mb-12">
      {isModalOpen && (
        <Modal
          winner={winner}
          isOpen={true}
          onClose={closeModal}
          onRestart={resetGame}
          isDraw={draw}
        />
      )}
      <div className="mb-8 flex justify-center gap-4 md:gap-6">
        <button
          onClick={() => resetGame()}
          className="text-primary h-10 w-28 cursor-pointer rounded-lg bg-yellow-500 p-4 px-4 py-2 text-sm hover:bg-yellow-800 active:bg-yellow-950 active:text-white"
        >
          New Game
        </button>
        <button className="h-10 w-28 cursor-pointer rounded-lg bg-red-500 p-4 px-4 py-2 text-sm hover:bg-red-800 active:bg-blue-950">
          Enable AI
        </button>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((square, index) => (
          <Square
            key={index}
            mark={square}
            onClick={() => handleClickSquare(index)}
          />
        ))}
      </div>
      <WhoseTurn currentPlayer={currentPlayer} />
    </section>
  );
}
