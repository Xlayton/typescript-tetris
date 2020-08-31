import React, { Component } from 'react';
import { Lobby, User } from './model';
import { Redirect } from 'react-router-dom';

interface IProps {
    apiHost: string
    username: string
    setRoomId: (roomId: string | undefined) => void
    roomId: string | undefined
}

interface IState {
    lobbies: Array<Lobby>
}

//This should set up the lobby stuff. Views all lobbies. Lets join one and create a new lobby
export class LobbyView extends Component<IProps, IState> {
    state: IState = {
        lobbies: [],
    }

    componentDidMount() {
        if (!this.props.roomId) {
            fetch(`${this.props.apiHost}/lobby/open`, {
                method: "get"
            })
                .then(res => res.json())
                .then(rawLobbies => this.setState({ lobbies: rawLobbies.map((rawLobby: any) => new Lobby(1, 2, rawLobby.id, [rawLobby.host, rawLobby.opponent])) }, () => console.log("Loading")))
                .catch(err => console.log(err));
        }
    }

    createLobby = () => {
        fetch(`${this.props.apiHost}/makeRoom`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `host=${this.props.username}`
        })
            .then(res => res.json())
            .then(rawLobby => {
                this.props.setRoomId(rawLobby.id);
            });
    }

    joinGame = (roomId: string) => {
        console.log(roomId);
        this.props.setRoomId(roomId);
    }

    redirectToGame = () => this.props.roomId ? <Redirect to="/play" /> : null;

    render(): React.ReactNode {
        return (
            <>
                <h1 id="lobbyTitle">Current Lobbies</h1>
                <button className="lobbyButton createButton" type="button" onClick={this.createLobby}>Create Lobby</button>
                <div>
                    {this.state.lobbies.map(lobby => (
                        <>
                            <ul>
                                <li className="lobbyInfo">Id of Lobby: {lobby.id}</li>

                                <li className="lobbyInfo">Max number of players: {lobby.maxPlayers}</li>

                                <li className="lobbyInfo">Current amount of players: {lobby.playerCount}</li>

                            </ul>
                            <button className="lobbyButton joinButton" onClick={() => this.joinGame(lobby.id)}>Join Lobby</button>

                            {/* <p className="lobbyInfo">Id of Lobby: {lobby.id}</p>
                            <br />
                            <p className="lobbyInfo">Max number of players: {lobby.maxPlayers}</p>
                            <br />
                            <p className="lobbyInfo">Current amount of players: {lobby.playerCount}</p>
                            <br /> */}
                            {/* <ul>All users in lobby:
                            <li>{lobby.users}</li>  
                            </ul> */}
                        </>
                    ))}
                </div>
                {this.redirectToGame()}
            </>
        )
    }
} 