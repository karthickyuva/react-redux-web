import history from "../history";
import { AUTH_USER, UNAUTH_USER, LOGIN_AUTH_ERROR, REGISTRATION_AUTH_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR } from "../constants/ActionTypes";
import { apiClient } from "../apiClient";
import { DEFAULT_API_KEY } from "../constants/Config";
import { getUrlParameter } from "../utils/helper";
import Notifications from "react-notification-system-redux";

export function login({ email, password }) {
	return (dispatch) => {
		apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
		apiClient.post("/adminUser/v1/login", { email, password })
			.then((response) => {
				const { token } = response.data;
				apiClient.defaults.headers.common.Authorization = token;
				localStorage.setItem("token", token);
				localStorage.setItem("email", email);
				dispatch({ type: AUTH_USER });
				const redirect = getUrlParameter("redirect");
				history.push(redirect || "/");
			})
			.catch((error) => {
				dispatch({
					type: LOGIN_AUTH_ERROR,
					payload: error.response.data.message
				});
			});
	};
}

export function registration({ firstName, lastName, mobile, email, password, company }) {
	return (dispatch) => {
		apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
		apiClient.post("/user/v1/add", { firstName, lastName, mobile, email, password, company })
			.then((response) => {
				const { token, role } = response.data;
				apiClient.defaults.headers.common.Authorization = token;
				localStorage.setItem("token", token);
				localStorage.setItem("role", role);
				dispatch({ type: AUTH_USER });
				const redirect = getUrlParameter("redirect");
				history.push(redirect || "/");
			})
			.catch((error) => {
				dispatch({
					type: REGISTRATION_AUTH_ERROR,
					payload: error.response.data.message
				});
			});
	};
}

export function forgotPassword(email) {
	return (dispatch) => {
		apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
		apiClient.post("/adminUser/v1/forgotPassword", { email })
			.then((response) => {
				dispatch({ type: RESET_PASSWORD, payload: response.data });
				let successMessage;
				if (response && response.data) {
					successMessage = response.data.message;
				}
				dispatch(Notifications.success({
					message: successMessage || "success",
					autoDismiss: 3
				}));
				setTimeout(() => {
					const redirect = getUrlParameter("redirect");
					history.push(redirect || "/login");
				}, 3000);
			})
			.catch((error) => {
				dispatch({
					type: RESET_PASSWORD_ERROR,
					payload: error.response.data.message
				});
			});
	};
}

export function logoutUser() {
	apiClient.defaults.headers.common.Authorization = null;
	localStorage.removeItem("token");
	return {
		type: UNAUTH_USER
	};
}
