import { Box } from "@mui/material";
import type { Player } from "../types";

type WhoseTurnProps = {
  currentPlayer: Player;
};

export default function WhoseTurn({ currentPlayer }: WhoseTurnProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          bgcolor: currentPlayer === "X" ? "#0c36ff" : "transparent",
          transition: "background-color 0.3s ease",
          borderRadius: 2,
        }}
      >
        X
      </Box>
      <Box
        sx={{
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          borderRadius: 2,
          bgcolor: currentPlayer === "O" ? "#ff7f0a" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        O
      </Box>
    </Box>
  );
}
