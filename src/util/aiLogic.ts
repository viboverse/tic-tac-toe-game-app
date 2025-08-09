import type { BoardState } from "../types";
import { checkWinner } from "./checkWinner";

// Get all empty squares
function getAvailableMoves(board: BoardState): number[] {
  const emptySpotArray = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
  return emptySpotArray;
}

// Minimax algorithm - the brain of the AI
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
): number {
  const winner = checkWinner(board);

  // Base cases - game is over
  if (winner === "O") return 1; // AI wins
  if (winner === "X") return -1; // Human wins
  if (getAvailableMoves(board).length === 0) return 0; // Draw

  if (isMaximizing) {
    // AI's turn - try to maximize score
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(board)) {
      const testBoard = [...board];
      testBoard[move] = "O";
      const score = minimax(testBoard, depth + 1, false);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    // Human's turn - try to minimize score
    let bestScore = Infinity;
    for (const move of getAvailableMoves(board)) {
      const testBoard = [...board];
      testBoard[move] = "X";
      const score = minimax(testBoard, depth + 1, true);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

// Get the best move for AI
export function getAIMove(board: BoardState): number {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (const move of getAvailableMoves(board)) {
    const testBoard = [...board];
    testBoard[move] = "O";
    const score = minimax(testBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
