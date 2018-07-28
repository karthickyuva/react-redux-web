import { AUTH_USER, UNAUTH_USER, LOGIN_AUTH_ERROR, REGISTRATION_AUTH_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR } from "../constants/ActionTypes";
export function auth(state = {}, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, error: "", authenticated: true, role: action.role };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case LOGIN_AUTH_ERROR:
			return { ...state, loginError: action.payload };
		case REGISTRATION_AUTH_ERROR:
			return { ...state, registrationError: action.payload };
		case RESET_PASSWORD:
			return { ...state, data: action.payload, error: "", tokenVerify: true };
		case RESET_PASSWORD_ERROR:
			return { ...state, loginError: action.payload };
		default:
			return state;
	}
}
