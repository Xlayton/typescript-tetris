import React, { Component } from 'react';
import { startGame, dummyGame, game } from '../Game/app';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { Game } from '../Game/Game';

interface IProps {
    roomId: string | undefined
    apiUrl: string
    setRoomId: (roomId: string | undefined) => void
}

interface IState {
    isStarted: boolean
}

export class GameView extends Component<IProps, IState> {

    socket: SocketIOClient.Socket

    state: IState = {
        isStarted: false,
    }

    componentDidMount() {
        if (this.props.roomId) {
            this.socket = io(`${this.props.apiUrl}`, {
                path: "/gameio",
            });
            this.socket.on("connect", () => {
                fetch(`${this.props.apiUrl}/addsocket`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `lobbyId=${this.props.roomId}&socketId=${this.socket.id}`
                })
                    .then(() => this.socket.emit("connectedsocket"))
            });
            this.socket.on("startgame", () => {
                this.setState({ isStarted: true }, () => {
                    game.togglePause();
                    dummyGame.togglePause();
                    game.on("update", () => this.socket.emit("gamedata", [game.serialize()]));
                    game.on("gameover", () => this.socket.emit("loser"))
                    game.newGame();
                });
            });
            startGame();
            game.togglePause();
            dummyGame.togglePause();
            this.socket.on("loaddata", (data: any) => dummyGame.deserialize(data[0]));
            this.socket.on("winner", () => {
                game.youWin();
                dummyGame.togglePause();
            });
        }
    }

    componentWillUnmount() {
        if (this.props.roomId) {
            this.socket.disconnect();
            this.props.setRoomId(undefined);
        }
    }

    redirectIfNoRoomId = () => {
        !this.props.roomId ? <Redirect to="/" /> : null
    }

    render(): React.ReactNode {
        return (
            <>
                {this.redirectIfNoRoomId()}
                <div id="matchCanvas">
                    <div id="controlledGame">
                        <div id="container">
                            <canvas id="gameCanvas" width="240" height="360"></canvas>
                            <div id="floatingMessage"></div>
                        </div>
                        <div className="instructions">
                            <b>Controls:</b>
                            <ul>
                                <li>Left Arrow - Move shape left</li>
                                <li>Right Arrow - Move shape right</li>
                                <li>Up Arrow - Rotate shape</li>
                                <li>Down Arrow - Drop shape</li>
                            </ul>
                        </div>
                    </div>
                    <div id="dummyGame">
                        <canvas id="dummyCanvas" width="240" height="360"></canvas>
                    </div>
                </div>
            </>
        )
    }
} 