import moment from "moment";
const queryString = require("query-string");

function formatDBDate(date) {
	if (!date) {
		return null;
	}

	return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
}

function isAdmin() {
	return parseInt(localStorage.getItem("role"), 10) === 1;
}

function getUrlParameter(name) {
	const url = queryString.parse(window.location.search);
	return url[name] || null;
}

export { isAdmin, formatDBDate, getUrlParameter };
