
export class Lobby {
    playerCount: number;
    maxPlayers: number;
    id: string;
    users: Array<User>;

    constructor(playerCount: number, maxPlayers: number, id: string, users: Array<User>) {
        this.playerCount = playerCount;
        this.maxPlayers = maxPlayers;
        this.id = id;
        this.users = users;
    }
}

export class User {
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}