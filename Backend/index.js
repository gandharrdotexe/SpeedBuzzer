const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend Vite app
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const games = {}; // Store game state

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("createGame", (code) => {
    games[code] = { host: socket.id, players: [] };
    socket.join(code);
    console.log(`🎮 Game created: ${code}`);
  });

  socket.on("joinGame", ({ nickname, code }) => {
    if (games[code]) {
      games[code].players.push({ id: socket.id, nickname });
      socket.join(code);
      io.to(code).emit("playerListUpdate", games[code].players);
      console.log(`🙋 ${nickname} joined game ${code}`);
    } else {
      socket.emit("errorMessage", "Game code not found.");
    }
  });

  socket.on("startTimer", ({ code, time }) => {
    io.to(code).emit("timerStarted", time);
  });

  socket.on("buzz", ({ nickname, code }) => {
    io.to(code).emit("playerBuzzed", nickname);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    // TODO: remove player from game (optional enhancement)
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});
