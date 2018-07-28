import React from "react";
import { getInitials } from "../utils/format";

class UserThumbnail extends React.Component {

	renderProfileInitials() {

		const profileInitial = {
			width: "38px",
			height: "38px",
			borderRadius: "45px",
			textAlign: "center",
			letterSpacing: "1px",
			color: "#000",
			padding: "0 7px",
			fontSize: "16px",
			lineHeight: "38px",
			"float": "left",
			border: "0.5px solid #ffffff",
			background: "#fff"
		};

		return (
			<span style={profileInitial}>
				{getInitials(localStorage.getItem("email"))}
			</span>
		);
	}

	render() {
		return (
			<div className="sidebarProfileInfo"
				style={{
					background: "#242424",
					lineHeight: "60px",
					textAlign: "left",
					color: "#fff"
				}}
			>
				{this.renderProfileInitials()}
			</div>
		);
	}

}

export default UserThumbnail;
