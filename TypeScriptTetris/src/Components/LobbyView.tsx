import React, { Component } from 'react';
import { startGame } from '../Game/app';
import { Lobby, User } from './model';

interface IProps { }

interface IState { 
    lobbies: Array<Lobby>
}

//This should set up the lobby stuff. Views all lobbies. Lets join one and create a new lobby
export class LobbyView extends Component<IProps, IState> {
    state: IState = {
        lobbies: [new Lobby(1, 10, "#fff", [new User("Jeff")]), new Lobby(2, 5, "jjjjjjjj", [new User("Kathrine")]), new Lobby(4, 4, "ggggg", [new User("Fred")])]
    }
    componentDidMount() {
        console.log("Mounted");
    }
    render(): React.ReactNode {
        return (
            <>
                <button type="button">Create Lobby</button>
                <button type="button">Join Lobby</button>

                <div>
                    {this.state.lobbies.map(lobby => (
                        <>
                        <p>Id of Lobby: {lobby.id}</p>
                        <br/>
                        <p>Max number of players: {lobby.maxPlayers}</p>
                        <br/>
                        <p>Current amount of players: {lobby.playerCount}</p>
                        <br/>
                        <ul>All users in lobby: 
                            <li>{lobby.users}</li>
                        </ul>
                        </>
                    ))}
                </div>
            </>
        )
    }
} 