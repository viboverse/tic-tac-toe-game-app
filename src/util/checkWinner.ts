import type { BoardState, Player } from "../types";

export function checkWinner(board: BoardState): Player | null {
  //win conditions
  const lines: number[][] = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // main diagonal
    [2, 4, 6], // anti-diagonal
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player; // Type assertion needed here
    }
  }
  return null;
}

export function isBoardFull(board: BoardState): boolean {
  return board.every((square) => square !== null);
}
