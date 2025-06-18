// src/pages/Home.jsx
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full rounded-2xl shadow-xl">
        <CardContent className="p-8 text-center">
          <Typography variant="h4" className="text-black font-bold mb-6">
            🎮 Welcome to SpeedBuzzer
          </Typography>
          <Typography variant="body1" className="text-black-200 mb-6">
            Host a game and let your friends join using a unique code.
            Buzz in fast to win!
          </Typography>

          <div className="flex flex-col gap-4 mt-2">
            <Link to="/host">
              <Button variant="contained" color="secondary" fullWidth>
                Host Game
              </Button>
            </Link>
            <Link to="/join">
              <Button variant="outlined" color="inherit" fullWidth>
                Join Game
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// This is the homepage of the Buzzer Game application.
// It provides options for users to either host a game or join an existing one.