import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { GameView } from './GameView';
import { LobbyView } from './LobbyView';
import { HomeView } from './HomeView';

interface IProps { }

interface IState {
    roomId: string | undefined;
}

export class App extends Component<IProps, IState> {

    state: IState = {
        roomId: undefined
    }

    setRoomId = (roomId: string | undefined) => {
        this.setState({ roomId: roomId });
    }

    static apiUrl: string = "http://localhost:3001";

    render(): React.ReactNode {
        return (
            <Router>
                <NavLink to="/lobby">Lobby Page</NavLink>
                <NavLink to="/">Home</NavLink>
                <div id="pageRoute">
                    <Route exact path="/play" component={() => <GameView roomId={this.state.roomId} apiUrl={App.apiUrl} setRoomId={this.setRoomId} />} />
                </div>
                <div id="pageRoute">
                    <Route exact path="/lobby" component={() => <LobbyView apiHost={App.apiUrl} username="Testing..." setRoomId={this.setRoomId} roomId={this.state.roomId} />} />
                </div>
                <div id="pageRoute">
                    <Route exact path="/" component={HomeView} />
                </div>
            </Router>
        )
    }
}