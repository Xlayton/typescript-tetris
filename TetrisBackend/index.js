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

app.use(cors());

app.get('/lobby', routes.getLobbies);
app.get('/lobby/open', routes.getOpenLobbies);

app.post('finish', urlencodedParser, routes.finishGame);
app.post('/join', urlencodedParser, routes.joinOpenLobby);
app.post('/makeRoom', urlencodedParser, routes.makeRoom);
app.post('/remove', routes.removeFinishedGames);
app.post('/start', urlencodedParser, routes.startGame);
app.post('/addsocket', urlencodedParser, routes.addSocketToRoom)

let sockets = [];
const server = http.createServer(app);
const io = new socketio(server, {
    path: "/gameio",
    pingInterval: 250,
    pingTimeout: 2000,
    cookie: false
});

io.on('connection', socket => {
    sockets.push(socket);
    socket.on("gamedata", (data) => {
        let socketLobby = routes.getLobbyArray().filter(lobby => lobby.sockets.includes(socket.id))[0];
        socketLobby.sockets.forEach(sock => {
            if (sock !== socket.id) {
                let s = sockets.filter(s => s.id !== socket.id);
                s.forEach(f => f.emit("loaddata", [data]));
            }
        })
    });
    socket.on("disconnect", () => {
        let connLobby = routes.getLobbyArray().filter(lobby => lobby.sockets.includes(socket.id));
        if (connLobby.length > 0) {
            connLobby.forEach(lobby => {
                lobby.sockets.filter(so => so !== socket.id).forEach(other => {
                    sockets.filter(s => s.id === other)[0].emit("winner");
                    routes.setLobbyPlayState(lobby.id, false);
                })
            })
        }
    })
    socket.on("loser", () => {
        let connLobby = routes.getLobbyArray().filter(lobby => lobby.sockets.includes(socket.id));
        if (connLobby.length > 0) {
            connLobby.forEach(lobby => {
                lobby.sockets.filter(so => so !== socket.id).forEach(other => {
                    sockets.filter(s => s.id === other)[0].emit("winner");
                    routes.setLobbyPlayState(lobby.id, false);
                })
            })
        }
    })
    socket.on("connectedsocket", () => {
        routes.getLobbyArray().forEach(lobby => {
            if (lobby.sockets.length >= 2) {
                sockets.filter(s => lobby.sockets.includes(s.id)).forEach(s => {
                    s.emit("startgame");
                    routes.setLobbyPlayState(lobby.id, true);
                })
            }
        })
    })
});

server.listen(3001)