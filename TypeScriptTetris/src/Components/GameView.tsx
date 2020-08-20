import React, { Component } from 'react';
import { startGame } from '../Game/app';

interface IProps { }

interface IState { }

export class GameView extends Component<IProps, IState> {
    componentDidMount() {
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