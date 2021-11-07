import express from "express";
import http from "http";
const socketio = require("socket.io");
import cors from "cors";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
app.post("/newGuestRoom", (req, res) => {
  console.log("request recieved from client.");
  const roomId = uuidv4();
  console.log(roomId);
  res.send(roomId);
});
io.on("connection", (Socket: Socket) => {
  console.log("connected");
  Socket.on("playerTime", (value) => {
    console.log(value);
    Socket.broadcast.emit("jumpVal", value);
  });
});
server.listen(port, () => {
  console.log("listening on port 4000");
});
