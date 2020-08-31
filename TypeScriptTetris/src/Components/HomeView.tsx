import React, { Component } from 'react';
import { startGame } from '../Game/app';

interface IProps { }

interface IState { }

//Home view? Not sure what is needed yet
export class HomeView extends Component<IProps, IState> {
    componentDidMount() {
        console.log("Mounted");
    }
    render(): React.ReactNode {
        return (
            <>
                <h1 id="homeScreen">Multiplayer Tetris</h1>
            </>
        )
    }
} 