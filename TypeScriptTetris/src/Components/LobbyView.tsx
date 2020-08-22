import React, { Component } from 'react';
import { startGame } from '../Game/app';

interface IProps { }

interface IState { }

//This should set up the lobby stuff. Views all lobbies. Lets join one and create a new lobby
export class LobbyView extends Component<IProps, IState> {
    componentDidMount() {
        console.log("Mounted");
    }
    render(): React.ReactNode {
        return (
            <>
                <button type="button">Create Lobby</button>
            </>
        )
    }
} 