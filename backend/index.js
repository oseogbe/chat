const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const { prisma } = require("./lib/prisma");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/v1/auth.route");
const userRoute = require("./routes/v1/user.route");
const chatRequestRoute = require("./routes/v1/chat-request.route");
const messageRoute = require("./routes/v1/message.route");

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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat-request", chatRequestRoute);
app.use("/api/v1/message", messageRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "resource not found",
  });
});

const users = new Map(); // Store active users and their socket IDs

io.on("connection", (socket) => {
  // log when a user connects
  console.log(`user ${socket.id} connected`);

  // Handle user joining with their userId
  socket.on("join", (userId) => {
    users.set(userId, socket.id); // Map userId to socketId
    console.log(`${userId} joined with socket ID ${socket.id}`);
  });

  // Handle sending a message to a specific user
  socket.on("private_message", async ({ senderId, receiverId, message }) => {
    const receiverSocketId = users.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", { senderId, message });

      // Save message to database
      const savedMessage = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content: message,
        },
      });

      console.log(
        `Message from ${senderId} to ${receiverId}: ${savedMessage.content}`
      );
    } else {
      console.log(`User ${receiverId} is not connected.`);
    }
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    for (const [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        users.delete(userId); // Remove user from active users
        console.log(`${userId} disconnected.`);
        break;
      }
    }
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
