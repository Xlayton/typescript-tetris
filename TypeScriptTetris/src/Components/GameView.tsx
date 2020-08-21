import React, { Component } from 'react';
import { startGame } from '../Game/app';
import io from 'socket.io-client';

interface IProps { }

interface IState { }

export class GameView extends Component<IProps, IState> {
    componentDidMount() {
        const socket = io('http://localhost:3001', {
            path: "/gameio",
        });
        socket.on("connect", () => console.log("Client connected:", socket.id))
        socket.on("message", (data: any) => console.log("Recieved Message:", data))
        startGame();
    }
    render(): React.ReactNode {
        return (
            <>
                <h1>This is working from React</h1>
                <div id="container">
                    <canvas id="gameCanvas" width="240" height="360"></canvas>
                    <div id="floatingMessage"></div>
                </div>
                <div className="instructions">
                    <b>Keys:</b>
                    <ul>
                        <li>Left Arrow - Move shape left</li>
                        <li>Right Arrow - Move shape right</li>
                        <li>Up Arrow - Rotate shape</li>
                        <li>Down Arrow - Drop shape</li>
                        <li>P - pause / resume game</li>
                        <li>F - faster</li>
                        <li>F2 - start new game</li>
                    </ul>
                    <div>Score: <span id="scoreLabel"></span></div>
                    <div>Level: <span id="levelLabel"></span></div>
                    <div>Rows: <span id="rowsLabel"></span></div>
                </div>
            </>
        )
    }
} 