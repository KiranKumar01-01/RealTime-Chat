// ================= SOCKET.IO =================
/*
1. Socket.IO is a powerful real-time communication library for web applications.
2. It enables instant, bi-directional communication between web clients and servers.
3. It allows data to be pushed to clients in real time without the need for the client to request it.
*/


// ================= WHY SOCKET.IO =================
/*
1. Simplifies building real-time applications.
2. Handles complex networking issues behind the scenes.
3. Allows developers to focus on features rather than low-level communication protocols.
*/


// ================= USE CASES =================
/*
- Chat applications
- Real-time dashboards
- Collaborative tools (e.g., Google Docs)
- Online games
*/

import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://real-time-chat-psi-mauve.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };