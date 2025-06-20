// // src/pages/GamePage.jsx
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import socket from "../socket";

// export default function GamePage() {
//   const { gameCode } = useParams();
//   const location = useLocation();
//   const timerFromHost = location.state?.timer || 10;
//   const nickname = location.state?.nickname || "Host";

//   const [timeLeft, setTimeLeft] = useState(timerFromHost);
//   const [hasBuzzed, setHasBuzzed] = useState(false);
//   const [firstBuzzer, setFirstBuzzer] = useState(null);
//   const [timerRunning, setTimerRunning] = useState(false);

//   // Countdown Timer
//   useEffect(() => {
//     if (!timerRunning) return;

//     if (timeLeft > 0) {
//       const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//       return () => clearInterval(interval);
//     } else {
//       setTimerRunning(false);
//     }
//   }, [timeLeft, timerRunning]);

//   // Socket Listeners (🔌 real-time updates)
//   useEffect(() => {
//     socket.on("timerStarted", (time) => {
//       setTimeLeft(time);
//       setHasBuzzed(false);
//       setFirstBuzzer(null);
//       setTimerRunning(true);
//     });

//     socket.on("playerBuzzed", (buzzingNickname) => {
//       setFirstBuzzer((prev) => prev || buzzingNickname);
//     });

//     return () => {
//       socket.off("timerStarted");
//       socket.off("playerBuzzed");
//     };
//   }, []);

//   // Player Buzz Action
//   const handleBuzz = () => {
//     if (!hasBuzzed && timerRunning) {
//       setHasBuzzed(true);
//       socket.emit("buzz", { nickname, code: gameCode });
//     }
//   };

//   // Host starts the game
//   const startTimer = () => {
//     setTimeLeft(timerFromHost);
//     setFirstBuzzer(null);
//     setHasBuzzed(false);
//     setTimerRunning(true);
//     socket.emit("startTimer", { code: gameCode, time: timerFromHost });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
//       <Card className="w-full max-w-lg rounded-2xl shadow-2xl text-center">
//         <CardContent className="p-8 space-y-6">
//           <Typography variant="h4" className="text-white font-bold">
//             Game Code: {gameCode}
//           </Typography>

//           <Typography variant="h5" className="text-yellow-300 font-semibold">
//             {nickname === "Host" ? "👑 Host View" : `👤 ${nickname}'s View`}
//           </Typography>

//           <Typography variant="h2" className="text-white font-mono">
//             {timerRunning ? `${timeLeft}s` : "⏳ Ready"}
//           </Typography>

//           {firstBuzzer ? (
//             <Chip
//               label={`🚨 ${firstBuzzer} buzzed first!`}
//               color="secondary"
//               className="text-lg font-bold"
//             />
//           ) : nickname === "Host" ? (
//             <Button
//               variant="contained"
//               color="success"
//               fullWidth
//               onClick={startTimer}
//               disabled={timerRunning}
//             >
//               Start Timer
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="error"
//               fullWidth
//               onClick={handleBuzz}
//               disabled={hasBuzzed || !timerRunning}
//               sx={{ fontSize: "1.5rem", py: 2 }}
//             >
//               BUZZ!
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// // src/pages/GamePage.jsx
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import socket from "../socket";

// export default function GamePage() {
//   const { gameCode } = useParams();
//   const location = useLocation();
//   const timerFromHost = location.state?.timer || 10;
//   const nickname = location.state?.nickname || "Host";

//   const [timeLeft, setTimeLeft] = useState(timerFromHost * 1000);
//   const [hasBuzzed, setHasBuzzed] = useState(false);
//   const [firstBuzzer, setFirstBuzzer] = useState(null);
//   const [timerRunning, setTimerRunning] = useState(false);

//   // Countdown Timer (in milliseconds)
//   useEffect(() => {
//     let interval;
//     if (timerRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((t) => Math.max(t - 100, 0));
//       }, 100);
//     } else if (timeLeft === 0) {
//       setTimerRunning(false);
//     }
//     return () => clearInterval(interval);
//   }, [timeLeft, timerRunning]);

//   // Socket Listeners (🔌 real-time updates)
//   useEffect(() => {
//     socket.on("timerStarted", (time) => {
//       setTimeLeft(time * 1000);
//       setHasBuzzed(false);
//       setFirstBuzzer(null);
//       setTimerRunning(true);
//     });

//     socket.on("playerBuzzed", (buzzingNickname) => {
//       setFirstBuzzer((prev) => prev || buzzingNickname);
//     });

//     return () => {
//       socket.off("timerStarted");
//       socket.off("playerBuzzed");
//     };
//   }, []);

//   // Player Buzz Action
//   const handleBuzz = () => {
//     if (!hasBuzzed && timerRunning && timeLeft === 0) {
//       setHasBuzzed(true);
//       socket.emit("buzz", { nickname, code: gameCode });
//     }
//   };

//   // Host starts the game
//   const startTimer = () => {
//     setTimeLeft(timerFromHost * 1000);
//     setFirstBuzzer(null);
//     setHasBuzzed(false);
//     setTimerRunning(true);
//     socket.emit("startTimer", { code: gameCode, time: timerFromHost });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
//       <Card className="w-full max-w-lg rounded-2xl shadow-2xl text-center">
//         <CardContent className="p-8 space-y-6">
//           <Typography variant="h4" className="text-black font-bold">
//             Game Code: {gameCode}
//           </Typography>

//           <Typography variant="h5" className="text-yellow-300 font-semibold">
//             {nickname === "Host" ? "👑 Host View" : `👤 ${nickname}'s View`}
//           </Typography>

//           <Typography variant="h2" className="text-black font-mono">
//             {timerRunning ? `${(timeLeft / 1000).toFixed(1)}s` : "⏳ Ready"}
//           </Typography>

//           {firstBuzzer ? (
//             <Chip
//               label={`🚨 ${firstBuzzer} buzzed first!`}
//               color="secondary"
//               className="text-lg font-bold"
//             />
//           ) : nickname === "Host" ? (
//             <Button
//               variant="contained"
//               color="success"
//               fullWidth
//               onClick={startTimer}
//               disabled={timerRunning}
//             >
//               Start Timer
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="error"
//               fullWidth
//               onClick={handleBuzz}
//               disabled={hasBuzzed || !timerRunning || timeLeft > 0}
//               sx={{ fontSize: "1.5rem", py: 2 }}
//             >
//               BUZZ!
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// src/pages/GamePage.jsx
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import socket from "../socket";

// export default function GamePage() {
//   const { gameCode } = useParams();
//   const location = useLocation();
//   const timerFromHost = location.state?.timer || 10;
//   const nickname = location.state?.nickname || "Host";

//   const [timeLeft, setTimeLeft] = useState(timerFromHost * 1000);
//   const [hasBuzzed, setHasBuzzed] = useState(false);
//   const [firstBuzzer, setFirstBuzzer] = useState(null);
//   const [timerRunning, setTimerRunning] = useState(false);

//   // Countdown Timer (in milliseconds)
//   useEffect(() => {
//     let interval;
//     if (timerRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((t) => Math.max(t - 100, 0));
//       }, 100);
//     } else if (timeLeft === 0) {
//       setTimerRunning(false);
//     }
//     return () => clearInterval(interval);
//   }, [timeLeft, timerRunning]);

//   // Socket Listeners (🔌 real-time updates)
//   useEffect(() => {
//     socket.on("timerStarted", (time) => {
//       setTimeLeft(time * 1000);
//       setHasBuzzed(false);
//       setFirstBuzzer(null);
//       setTimerRunning(true);
//     });

//     socket.on("playerBuzzed", (buzzingNickname) => {
//       setFirstBuzzer((prev) => prev || buzzingNickname);
//     });

//     return () => {
//       socket.off("timerStarted");
//       socket.off("playerBuzzed");
//     };
//   }, [gameCode, nickname]);

//   // Player Buzz Action
// const handleBuzz = () => {
//   if (!hasBuzzed && timerRunning && timeLeft > 0) {
//     setHasBuzzed(true);
//     socket.emit("buzz", { nickname, code: gameCode });
//   }
// };

//   // Host starts the game
//   const startTimer = () => {
//     setTimeLeft(timerFromHost * 1000);
//     setFirstBuzzer(null);
//     setHasBuzzed(false);
//     setTimerRunning(true);
//     socket.emit("startTimer", { code: gameCode, time: timerFromHost });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
//       <Card className="w-full max-w-lg rounded-2xl shadow-2xl text-center">
//         <CardContent className="p-8 space-y-6">
//           <Typography variant="h4" className="text-black font-bold">
//             Game Code: {gameCode}
//           </Typography>

//           <Typography variant="h5" className="text-yellow-300 font-semibold">
//             {nickname === "Host" ? "👑 Host View" : `👤 ${nickname}'s View`}
//           </Typography>

//           <Typography variant="h2" className="text-black font-mono">
//             {timerRunning ? `${(timeLeft / 1000).toFixed(1)}s` : "⏳ Ready"}
//           </Typography>

//           {firstBuzzer ? (
//             <Chip
//               label={`🚨 ${firstBuzzer} buzzed first!`}
//               color="secondary"
//               className="text-lg font-bold"
//             />
//           ) : nickname === "Host" ? (
//             <Button
//               variant="contained"
//               color="success"
//               fullWidth
//               onClick={startTimer}
//               disabled={timerRunning}
//             >
//               Start Timer
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="error"
//               fullWidth
//               onClick={handleBuzz}
//               disabled={hasBuzzed || !timerRunning || timeLeft > 100}
//               sx={{ fontSize: "1.5rem", py: 2 }}
//             >
//               BUZZ!
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// src/pages/GamePage.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import socket from "../socket";

export default function GamePage() {
  const { gameCode } = useParams();
  const location = useLocation();
  const timerFromHost = location.state?.timer || 10;
  const nickname = location.state?.nickname || "Host";

  const [timeLeft, setTimeLeft] = useState(timerFromHost * 1000);
  const [hasBuzzed, setHasBuzzed] = useState(false);
  const [firstBuzzer, setFirstBuzzer] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);

  // Countdown Timer (in milliseconds)
  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => Math.max(t - 100, 0));
      }, 100);
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
      setCountdownEnded(true);
    }
    return () => clearInterval(interval);
  }, [timeLeft, timerRunning]);

  // Socket Listeners (🔌 real-time updates)
  useEffect(() => {
    socket.on("timerStarted", (time) => {
      setTimeLeft(time * 1000);
      setHasBuzzed(false);
      setFirstBuzzer(null);
      setTimerRunning(true);
      setCountdownEnded(false);
    });

    socket.on("playerBuzzed", (buzzingNickname) => {
      setFirstBuzzer((prev) => prev || buzzingNickname);
    });

    return () => {
      socket.off("timerStarted");
      socket.off("playerBuzzed");
    };
  }, []);

  // Player Buzz Action
  const handleBuzz = () => {
    if (!hasBuzzed && countdownEnded && !firstBuzzer) {
      setHasBuzzed(true);
      socket.emit("buzz", { nickname, code: gameCode });
    }
  };

  // Host starts the game
  const startTimer = () => {
    setTimeLeft(timerFromHost * 1000);
    setFirstBuzzer(null);
    setHasBuzzed(false);
    setTimerRunning(true);
    setCountdownEnded(false);
    socket.emit("startTimer", { code: gameCode, time: timerFromHost });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-2xl text-center">
        <CardContent className="p-8 space-y-6">
          <Typography variant="h4" className="text-black font-bold">
            Game Code: {gameCode}
          </Typography>

          <Typography variant="h5" className="text-yellow-300 font-semibold">
            {nickname === "Host" ? "👑 Host View" : `👤 ${nickname}'s View`}
          </Typography>

          <Typography variant="h2" className="text-black font-mono">
            {timerRunning ? `${(timeLeft / 1000).toFixed(1)}s` : "⏳ Ready"}
          </Typography>

          {firstBuzzer ? (
            <>
              <Chip
                label={`🚨 ${firstBuzzer} buzzed first!`}
                color="secondary"
                className="text-lg font-bold"
              />
              {nickname === "Host" && (
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  onClick={startTimer}
                >
                  Restart Game
                </Button>
              )}
            </>
          ) : nickname === "Host" ? (
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={startTimer}
              disabled={timerRunning}
            >
              Start Timer
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleBuzz}
              disabled={hasBuzzed || !countdownEnded || !!firstBuzzer}
              sx={{ fontSize: "1.5rem", py: 2 }}
            >
              BUZZ!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
