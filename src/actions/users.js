import * as actionTypes from "../constants/ActionTypes";
import { apiClient } from "../apiClient";
import Notifications from "react-notification-system-redux";

export function requestUsersList() {
	console.log("request");
	return {
		type: actionTypes.REQUEST_USERS_LIST
	}
}

export function receiveUsersList(data) {
	console.log("receive");
	return {
		type: actionTypes.RECEIVE_USERS_LIST,
		payload: data
	}
}

export function fetchUsersListFail(error) {
	return {
		type: actionTypes.FETCH_USERS_LIST_FAIL,
		error
	}
}

export function fetchUsers() {
	return(dispatch) => {
		dispatch(requestUsersList());

		return apiClient.get("/api/users")
			.then(response => response.data)
			.then((data) => dispatch(receiveUsersList(data)))
			.then((data) => data)
			.catch((error) => {
				dispatch(fetchUsersListFail(error));
				if (error.status >= 400) {
					dispatch(Notifications.error({
						title: "Users List",
						message: "error",
						autoDismiss: 3
					}));
					throw new Error("Bad response from server");
				}
			})
	}
}

export function changeUsersPage(pageNumber) {
	return {
		type: actionTypes.CHANGE_USERS_PAGE,
		payload: pageNumber
	}
}

export function requestMoreUsers() {
	return {
		type: actionTypes.REQUEST_MORE_USERS
	}
}

export function receiveMoreUsers(data) {
	return {
		type: actionTypes.RECEIVE_MORE_USERS,
		payload: data
	}
}

export function fetchMoreUsersFail(error) {
	return {
		type: actionTypes.FETCH_MORE_USERS_FAIL,
		error
	}
}

export function fetchMoreUsers(page, pageSize = 4) {
	return(dispatch) => {
		dispatch(requestMoreUsers());

		return apiClient.get(`/api/users?page=${page}&per_page=${pageSize}`)
			.then((response) => response.data)
			.then((data) => dispatch(receiveMoreUsers(data)))
			.then((data) => data)
			.catch((error) => {
			dispatch(fetchMoreUsersFail(error));
				if (error.status >= 400) {
					dispatch(Notifications.error({
						title: "Loading More Users",
						message: "error",
						autoDismiss: 3
					}));
					throw new Error("Bad response from server");
				}
			});
	}
}
