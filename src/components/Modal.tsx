import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Portal,
} from "@mui/material";
import type { Player } from "../types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  winner: Player | null;
  isDraw: boolean;
  onRestart: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  winner,
  isDraw,
  onRestart,
}: ModalProps) {
  const modalRoot = document.getElementById("modal");
  return (
    <Portal container={modalRoot}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "#cfe0ee",
            border: "3px solid #1976d2",
          },
        }}
      >
        <DialogTitle className="text-center">
          {winner
            ? `Player ${winner} Wins!`
            : isDraw
              ? "It's a Draw!"
              : "Game Over"}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {winner && (
              <Avatar
                sx={{
                  bgcolor: "success.main",
                  width: 80,
                  height: 80,
                  fontSize: 32,
                }}
              >
                {winner}
              </Avatar>
            )}
          </Box>
          <Box sx={{ color: "text.secondary", textAlign: "center", mb: 2 }}>
            {winner ? "Congratulations!" : "Good game!"}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}
        >
          <Button onClick={onRestart} size="large" variant="contained">
            Play Again
          </Button>
          <Button onClick={onClose} size="large" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  );
}
