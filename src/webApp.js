import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import { AUTH_USER } from "./constants/ActionTypes";

const token = localStorage.getItem("token");
if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route path="/" component={App}/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);
