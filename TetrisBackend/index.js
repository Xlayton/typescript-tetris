const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require("cors");
const routes = require('./routes/routes');

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const app = express();
const server = http.createServer(app);
const io = new socketio(server, {
    path: "/gameio",
    pingInterval: 250,
    pingTimeout: 2000,
    cookie: false
});

app.get('/lobby', routes.getLobbies);
app.get('/lobby/open', routes.getOpenLobbies);

app.post('finish', urlencodedParser, routes.finishGame);
app.post('/join', urlencodedParser, routes.joinOpenLobby);
app.post('/makeRoom', urlencodedParser, routes.makeRoom);
app.post('/remove', routes.removeFinishedGames);
app.post('/start', urlencodedParser, routes.startGame);

io.on('connection', socket => socket.send("HELLO"));

server.listen(3001)