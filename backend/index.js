const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const { prisma } = require("./lib/prisma");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/v1/auth.route");

const app = express();

app.use(bodyParser.json());
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

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "resource not found",
  });
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
