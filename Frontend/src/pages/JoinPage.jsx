// src/pages/JoinPage.jsx
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import socket from "../socket"; // Assuming you have a socket instance set up

export default function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();

const handleJoin = () => {
  socket.emit("joinGame", { nickname, code: gameCode });
  navigate(`/game/${gameCode}`, { state: { nickname } });
};

useEffect(() => {
  socket.on("errorMessage", (msg) => {
    alert(msg);
  });

  return () => {
    socket.off("errorMessage");
  };
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl">
        <CardContent className="p-8 space-y-6 text-center">
          <Typography variant="h4" className="text-black font-bold">
            🙋‍♂️ Join Game
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Game Code"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={!nickname || !gameCode}
            onClick={handleJoin}
          >
            Join Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
