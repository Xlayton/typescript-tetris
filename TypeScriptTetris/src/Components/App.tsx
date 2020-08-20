import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { GameView } from './GameView';

interface IProps { }

interface IState { }

export class App extends Component<IProps, IState> {
    render(): React.ReactNode {
        return (
            <Router>
                <NavLink to="/play">LINK</NavLink>
                <div id="pageRoute">
                    <Route exact path="/play" component={GameView} />
                </div>
            </Router>
        )
    }
}