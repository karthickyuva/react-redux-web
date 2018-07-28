import moment from "moment";

/**
 * formatPhoneNumber takes a phone number and returns a formatted phone number
 * @param  string phoneNumber
 * @return string formatted phone number
 * Example output: (123) 456-789
 */
function formatPhoneNumber(phoneNumber) {
	const num = phoneNumber.replace(/\D/g, "");
	const areacode = num.slice(0, 3);
	const first = num.slice(3, 6);
	const second = num.slice(6, 10);
	return `(${areacode}) ${first}-${second}`;
}

/**
 * Format to Two Decimals
 *
 * @param number
 * @returns {string}
 */
function formatToTwoDecimals(number) {
	number = parseFloat(number) || 0;

	return Number(number).toFixed(2);
}

/**
 * Redux Normalize Float
 *
 * @param value
 * @returns {*}
 */
function normalizeFloat(value) {
	if (value === null || value === "" || value === undefined) {
		return "";
	}
	let v = value.toString().replace(/[^\d.]/g, "");
	v = v.slice(0, v.indexOf(".") >= 0 ? v.indexOf(".") + 3 : undefined);
	return v;
}

/**
 * Decimal
 *
 * @param e
 */
function isDecimal(e) {
	const charCode = e.which || e.keyCode;
	if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		e.preventDefault();
	}
}

/**
 *  Strip HTML Tags
 *
 * @param value
 * @returns {string}
 */
function stripHTML(value) {
	if (value === null || value === "" || value === undefined) {
		return "";
	}
	return value.toString().replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Format Price
 *
 * @param price
 * @returns {*}
 */
function formatPrice(price) {
	if (!price) {
		return null;
	}

	return `$${formatToTwoDecimals(price)}`;
}

/**
 * Capitalize first letter of the word
 *
 * @param str
 * @returns {string}
 */
function capitalize(str) {
	if (!str) {
		return;
	}

	const splitStr = str.toLowerCase().split(" ");
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}

	return splitStr.join(" ");
}

/**
 * Formatted Date
 *
 * @param date
 * @returns {string}
 */
function formattedDate(date) {
	return date ? moment(date).format("MMM D, YYYY") : null;
}

/**
 * Formatted Number
 *
 * @param number
 * @returns {string}
 */
function formattedNumber(number) {
	if (number) {
		number = parseInt(number, 10);
		if (!isNaN(number)) {
			return number;
		}
	}

	return null;
}

/**
 * Get Initials
 *
 * @param firstName
 * @param lastName
 * @returns {string}
 */
function getInitials(firstName, lastName = "") {
	let string = "";

	if (firstName) {
		string += firstName.charAt(0);

		if (!lastName && firstName.length > 1) {
			string += firstName.charAt(1);
		}
	}

	if (lastName) {
		string += lastName.charAt(0);

		if (!firstName && lastName.length > 1) {
			string += lastName.charAt(1);
		}
	}

	return string.toUpperCase();
}

/**
 * Formatted Date Time
 *
 * @param date
 * @returns {string}
 */
function formattedDateTime(date) {
	return date ? moment(date).format("MMM D, YYYY h:mm:ss A") : null;
}

export { formatPhoneNumber, formatToTwoDecimals, formatPrice, formattedNumber, capitalize, formattedDate, formattedDateTime, normalizeFloat, stripHTML, isDecimal, getInitials };
