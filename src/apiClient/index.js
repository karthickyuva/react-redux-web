import axios from "axios";
import { API_URL } from "../constants/Config";

export const apiClient = axios.create({
	baseURL: API_URL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json"
	}
});
