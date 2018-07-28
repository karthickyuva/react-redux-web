import * as actionTypes from "../constants/ActionTypes";
import { apiClient } from "../apiClient";
import Notifications from "react-notification-system-redux";

export function requestPostList() {
	return {
		type: actionTypes.REQUEST_POSTS_LIST
	}
}

export function receivePostList(data) {
	return {
		type: actionTypes.RECEIVE_POSTS_LIST,
		payload: data
	}
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;


export function fetchPostList(page) {
	return (dispatch) => {
		dispatch(requestPostList());

		apiClient.get(`articles?${limit(10, page)}`)
			.then((response) => response.data)
			.then((data) => dispatch(receivePostList(data)))
			.then((data) => data)
			.catch((error) => {
				if (error.status >= 400) {
					dispatch(Notifications.error({
						title: "Fetch Post List",
						message: "error",
						autoDismiss: 3
					}));
					throw new Error("Bad response from server");
				}
			});
	}
}