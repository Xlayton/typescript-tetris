const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new socketio(server, {
    path: "/gameio",
    pingInterval: 250,
    pingTimeout: 2000,
    cookie: false
});

io.on('connection', socket => socket.send("HELLO"));

server.listen(3001)