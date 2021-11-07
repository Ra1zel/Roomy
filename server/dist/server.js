"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socketio = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const port = process.env.PORT || 4000;
const app = express_1.default();
app.use(cors_1.default());
const server = http_1.default.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});
app.post("/newGuestRoom", (req, res) => {
    console.log("request recieved from client.");
    const roomId = uuid_1.v4();
    console.log(roomId);
    res.send(roomId);
});
io.on("connection", (Socket) => {
    console.log("connected");
    Socket.on("playerTime", (value) => {
        console.log(value);
        Socket.broadcast.emit("jumpVal", value);
    });
});
server.listen(port, () => {
    console.log("listening on port 4000");
});
