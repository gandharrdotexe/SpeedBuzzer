// src/pages/HostPage.jsx
import { useState } from "react";
import {
  Button,
  Typography,
  MenuItem,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import socket from "../socket";

export default function HostPage() {
  const [gameCode, setGameCode] = useState("");
  const [timer, setTimer] = useState(5);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const generateGameCode = () => {
    const code = uuidv4().slice(0, 6).toUpperCase();
    setGameCode(code);
    socket.emit("createGame", code); 
  };

  const handleStartGame = () => {
    if (!gameCode) return;
    navigate(`/game/${gameCode}`, {
      state: { timer },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl rounded-2xl shadow-2xl">
        <CardContent className="p-8 space-y-6">
          <Typography variant="h4" className="text-black text-center font-bold">
            🎮 Host a Game
          </Typography>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              variant="contained"
              color="secondary"
              onClick={generateGameCode}
            >
              Generate Game Code
            </Button>
            {gameCode && (
              <Typography className="text-black text-xl font-mono" variant="h6">
                {gameCode}
              </Typography>
            )}
          </div>

          <div>
            <Typography variant="subtitle1" className="text-black-200 mb-2">
              Select Countdown Timer:
            </Typography>
            <TextField
              select
              fullWidth
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value))}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              {[5, 10, 15, 20].map((value) => (
                <MenuItem key={value} value={value}>
                  {value} seconds
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <Typography variant="subtitle1" className="text-black-200 mb-1">
              Joined Players:
            </Typography>
            <ul className="list-disc list-inside text-white pl-2">
              {players.length > 0 ? (
                players.map((p, index) => <li key={index}>{p}</li>)
              ) : (
                <li className="italic text-black">Waiting for players...</li>
              )}
            </ul>
          </div>

          <Button
            fullWidth
            variant="contained"
            color="success"
            disabled={!gameCode}
            onClick={handleStartGame}
          >
            Start Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
