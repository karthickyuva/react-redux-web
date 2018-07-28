import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { Link } from "react-router-dom";

class Logout extends Component {
	componentWillMount() {
		this.props.logoutUser();
	}

	render() {
		return (
			<div>
				<div className="col-md-4 col-md-offset-4 vertical-center text-center col-sm-8 col-sm-offset-2">
					<div className="card" style={{ margin: "0 auto" }}>
						<p style={{ fontSize: "24px" }}>Sorry to see you go</p>
						<p><Link to="/login" className="btn btn-primary">Login</Link></p>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(Logout);
