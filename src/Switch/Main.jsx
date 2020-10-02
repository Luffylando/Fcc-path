import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/game" component={Game} />
				<Redirect to="/" />
			</Switch>
		);
	}
}

export default Main;
