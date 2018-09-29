import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { auth } from "./auth";
import { reducer as notifications } from "react-notification-system-redux";
import { reducer as form } from "redux-form";
import { postReducer } from "./postsReducer";
import { usersReducer } from "./usersReducer";
import { usersDetailReducer } from "./usersDetailReducer";

const appReducer = combineReducers({
	routing: routerReducer,
	auth,
	form,
	notifications,
	articles: postReducer,
	users: usersReducer,
	usersDetails: usersDetailReducer
});

const rootReducer = (state, action) => {
	if (action.type === "UNAUTH_USER") {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer;
