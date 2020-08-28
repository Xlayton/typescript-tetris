// lobby setup, get active lobbies, delete bad lobbies
let lobbies = [];
let counter = 0;

// this is for seeing the structure of the object
const roomSample = {
    id: 0,
    host: "host",
    opponent: "opponent",
    isPlaying: false,
    isFinished: false
};

// create a new room
const makeRoom = (req, res) => {
    let room = {
        id: counter,
        host: req.body.host,
        opponent: null,
        isPlaying: false,
        isFinished: false
    }
    lobbies.push(room);
    counter++;
    res.json(room);
};

// get all lobbies
const getLobbies = (req, res) => {
    res.json(lobbies);
};

// get all open lobbies
const getOpenLobbies = (req, res) => {
    let openLobbies = []
    for (lobby of lobbies) {
        if (!lobby.isPlaying && lobby.opponent === null) {
            openLobbies.push(lobby);
        }
    }
    res.json(openLobbies);
};

// remove all games that are finished
const removeFinishedGames = (req, res) => {
    for (let i = 0; i < lobbies.length; i++) {
        if (lobbies[i].isFinished) {
            delete lobbies[i];
        }
    }
    lobbies = lobbies.filter(lobby => lobby != null);
    res.json(lobbies);
};

// join open lobby based on host name & no opponent & isnt already playing
const joinOpenLobby = (req, res) => {
    for (lobby of lobbies) {
        if (!lobby.isPlaying && lobby.opponent === null && lobby.host === req.body.host) {
            lobby.opponent = req.body.user;
            break;
        }
    }
    // should this only return open lobbies or all lobbies?

    // getOpenLobbies(req,res);
    res.json(lobbies);
};

// starts all games that arent started and have an opponenet & host
const startGame = (req, res) => {
    for (lobby of lobbies) {
        if (lobby.host !== null && lobby.opponent !== null) {
            lobby.isPlaying = true;
        }
    }
    res.json(lobbies);
};

// sets game to finished based on ID
const finishGame = (req, res) => {
    for (lobby of lobbies) {
        if (req.body.id === lobby.id) {
            lobby.isFinished = true;
        }
    }
    res.json(lobbies);
};

module.exports = {
    makeRoom,
    getLobbies,
    getOpenLobbies,
    removeFinishedGames,
    joinOpenLobby,
    startGame,
    finishGame,
}