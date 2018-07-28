import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import createLogger from "redux-logger";
import createHistory from "history/createBrowserHistory";

import rootReducer from "./reducers/index";

const middlewares = [thunk];

if (process.env.enableReduxLogger) {
	const logger = createLogger();
	middlewares.push(logger);
}

const reduxDevTools = [];

if (process.env.enableTimeTravelDebugging) {
	reduxDevTools.push(window.devToolsExtension ? window.devToolsExtension() : (f) => f);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), ...reduxDevTools));

export const history = createHistory();

if (module.hot) {
	module.hot.accept("./reducers/", () => {
		const nextRootReducer = require("./reducers/index").default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
