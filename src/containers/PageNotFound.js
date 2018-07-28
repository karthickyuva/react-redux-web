import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<h3>Page not found</h3>
				<p>Navigate to <Link to="/">homepage</Link></p>
			</div>
		);
	}
}

export default PageNotFound;
