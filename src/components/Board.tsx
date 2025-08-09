import { useEffect, useState } from "react";
import Square from "./Square";
import type { BoardState, Player } from "../types";
import { checkWinner, isBoardFull } from "../util/checkWinner";
import { getAIMove } from "../util/aiLogic";
import WhoseTurn from "./WhoseTurn";
import Modal from "./Modal";

export default function Board() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const winner = checkWinner(board);
  const draw = !winner && isBoardFull(board);

  // AI Move Logic
  useEffect(() => {
    if (isAIEnabled && currentPlayer === "O" && !winner && !draw) {
      const aiMove = getAIMove(board);
      // If the board is not full...
      if (aiMove !== -1) {
        makeMove(aiMove, "O");
      }
    }
  }, [currentPlayer, board, isAIEnabled, winner, draw]);

  // Auto-open modal when game ends
  useEffect(() => {
    if (winner || draw) {
      setIsModalOpen(true);
    }
  }, [winner, draw]);

  function makeMove(index: number, player: Player) {
    if (board[index] || winner) return;

    const newBoard: BoardState = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setCurrentPlayer(player === "X" ? "O" : "X");
  }

  function handleClickSquare(index: number) {
    // In AI mode, only allow human moves when it's X's turn
    if (isAIEnabled && currentPlayer === "O") return;

    makeMove(index, currentPlayer);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setIsModalOpen(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleAI() {
    setIsAIEnabled(!isAIEnabled);
    resetGame(); // Reset game when switching modes
  }

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
          className="h-10 w-28 cursor-pointer rounded-lg bg-yellow-500 p-4 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-yellow-700 hover:text-white active:bg-yellow-950 active:text-white md:h-14 md:w-36 md:text-lg"
        >
          New Game
        </button>
        <button
          onClick={toggleAI}
          className={`h-10 w-28 cursor-pointer rounded-xl px-6 py-3 text-sm font-semibold shadow-md md:h-14 md:w-36 md:text-lg ${
            isAIEnabled
              ? "bg-red-500 hover:bg-red-700"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {isAIEnabled ? "Disable AI" : "Enable AI"}
        </button>
      </div>

      {isAIEnabled && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">You are X, Computer is O</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-x-0.5 gap-y-1 md:gap-x-2 md:gap-y-2">
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
