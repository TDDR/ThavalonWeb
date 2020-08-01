import React from 'react';
import Navbar from './Navbar';
import Home from './Home'
import LobbyManager from './LobbyManager'
import Rules from './Rules'
import {
    Switch,
    Route,
} from "react-router-dom";
import './App.scss';

function App() {
	return (
		<div id="test">
			<Navbar />

			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/play">
					<LobbyManager />
				</Route>
				<Route path="/rules">
					<Rules />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
