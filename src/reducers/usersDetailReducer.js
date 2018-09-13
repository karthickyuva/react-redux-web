import {
	RECEIVE_USERS_LIST,
	FETCH_USERS_LIST_FAIL,
	RECEIVE_MORE_USERS,
	FETCH_MORE_USERS_FAIL,
} from "../constants/ActionTypes";

import _ from "lodash";
export function usersDetailReducer(state = { isFetching: false }, action) {
	switch (action.type) {
		case RECEIVE_USERS_LIST: {
			return Object.assign({}, state, {
				..._.keyBy(action.payload.data, (n) => n.id),
				isFetching: false
			}); 
		}
		case RECEIVE_MORE_USERS: {
			return Object.assign({}, state, {
				..._.keyBy(action.payload.data, (n) => n.id),
				isLoadingMore: false
			});
		}
		case FETCH_USERS_LIST_FAIL:
			return { ...state, isFetching: false };
		case FETCH_MORE_USERS_FAIL:
			return { ...state, isLoadingMore: false };
		default:
			return state;
	}
}