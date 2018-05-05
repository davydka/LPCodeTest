import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import Question from './components/question';
import Home from './components/home';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<React.Fragment>
				<Switch>
					<Route path="/question" component={Question} />
					<Route path="/" component={Home} />
				</Switch>
			</React.Fragment>
		</BrowserRouter>
	</Provider>
	, document.querySelector('.container'));
