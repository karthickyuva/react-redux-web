import validator from "validator";

function userInputValidation(key, detail) {
	switch (key) {
		case "email": {
			return validator.isEmail(detail);
		}
		case "phone":
		case "phoneNumber": {
			return validator.isMobilePhone(detail.toString(), "en-US");
		}
		case "gender": {
			return detail === "Male" || detail === "Female";
		}
		case "address": {
			return !detail || detail.trim().length >= 3; // is address greater than 3 characters
		}
		case "imageUrl": {
			return true; // pass the imageUrl validation for now
		}
		case "note": {
			return detail.trim().length === 0 || detail.trim().length <= 250 && detail.trim().length >= 5;
		}
		case "website":	{
			return validator.isURL(detail);
		}
		case "zipCode": {
			const zipCodeRegEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			if (!zipCodeRegEx.test(detail.toString())) {
				return false;
			}

			return true;
		}
		case "facebook":
		case "twitter":
		case "youtube":
		case "pinterest":
		case "googleplus": {
			return validator.isURL(detail, { protocols: ["http", "https"], require_protocol: true });
		}
		case "firstName":
		case "lastName":
		case "instagram":
		case "license":
		case "about": {
			return detail.trim().length >= 2;
		}
		case "domains": {
			const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/gm;
			if (!regex.test(detail.toString())) {
				return false;
			}
			return true;
		}
		default:
			return true;
	}
}

export { userInputValidation };