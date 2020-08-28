import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { GameView } from './GameView';
import { LobbyView } from './LobbyView';
import { HomeView } from './HomeView';

interface IProps { }

interface IState { }

export class App extends Component<IProps, IState> {

    static apiUrl: string = "localhost:3001";

    render(): React.ReactNode {
        return (
            <Router>
                <NavLink to="/play">Play the Game</NavLink>
                <div id="pageRoute">
                    <Route exact path="/play" component={GameView} />
                </div>
                <NavLink to="/lobby">Lobby Page</NavLink>
                <div id="pageRoute">
                    <Route exact path="/lobby" component={() => <LobbyView apiHost={App.apiUrl} username="Testing..." />} />
                </div>
                <NavLink to="/">Home</NavLink>
                <div id="pageRoute">
                    <Route exact path="/" component={HomeView} />
                </div>
            </Router>
        )
    }
}