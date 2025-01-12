const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const { prisma } = require("./lib/prisma");

dotenv.config();

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Chat");
});

io.on("connection", (socket) => {
  // log when a user connects
  console.log(`user ${socket.id} connected`);

  // listen for incoming messages
  socket.on("message", (msg) => {
    // broadcast message to all connected clients
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Disconnects prisma client on graceful shutdown of server
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
