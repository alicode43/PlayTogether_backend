import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { generateUniqueId } from "./utils.js"; // Import the generateUniqueId function
import cors from "cors"; // Import the cors package

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Use CORS middleware

const server = http.createServer(app);

const io = new SocketServer(server, { cors: { origin: "http://localhost:3000" } });

let sessions = {}; // Store sessions with video states

// API to generate unique session links (This is the endpoint you need)
app.use(express.json());
app.post("/generate-link", (req, res) => {
  console.log(req.body);
  const { videoUrl } = req.body;
  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  const sessionId = generateUniqueId(); 
  sessions[sessionId] = { videoUrl, state: "paused" };
  res.json({ sessionId }); 
});
// app.get("/",(req, res) => {
//   console.log("hi how are you");
//   res.send("hi how are you");
// });
// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-session", ({ sessionId }) => {
    socket.join(sessionId);
    const session = sessions[sessionId];
    if (session) {
      socket.emit("init", session); // Send initial video state
    }
  });

  socket.on("play", ({ sessionId }) => {
    sessions[sessionId].state = "playing";
    socket.to(sessionId).emit("play");
  });

  socket.on("pause", ({ sessionId }) => {
    sessions[sessionId].state = "paused";
    socket.to(sessionId).emit("pause");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Backend server running on http://localhost:4000");
});
