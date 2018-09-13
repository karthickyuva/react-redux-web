import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import requireAuth from "../components/auth/RequireAuth";
import requireGuest from "../components/auth/RequireGuest";
import Login from "../containers/Login";
import Logout from "../components/auth/Logout";
import { Switch, Route, Link } from "react-router-dom";
import Notifications from "react-notification-system-redux";
import Navigation from "../components/Navigation";
import Dashboard from "../containers/Dashboard";
import Game from "../containers/Game";
import Users from "../containers/Users";

export class Main extends React.Component {
	bodyClass(authenticated) {
		if (authenticated) {
			document.body.classList.remove("guestLayout");
		} else {
			document.body.classList.add("guestLayout1");
		}
	}

	componentDidMount() {
		this.bodyClass(this.props.authenticated);
	}

	componentWillReceiveProps(nextProps) {
		this.bodyClass(nextProps.authenticated);
	}

	componentWillUnmount() {
		this.bodyClass(this.props.authenticated);
	}

	render() {
		const { notifications } = this.props;
		return (
			<div>
				<Navigation location={this.props.location.pathname} />
				<Notifications notifications={notifications}/>
				<div className="container-fluid">
					<Switch>
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/game" component={Game} />
						<Route exact path="/users" component={Users} />
						{/*<Route exact path="/dashboard" component={requireAuth(Dashboard)} />*/}
						<Route exact path="/login" component={requireGuest(Login)} />
						<Route exact path="/logout" component={requireAuth(Logout)} />
						{/*<Route exact path="*" component={PageNotFound}/>*/}
					</Switch>
					<div className="footer containLogoer-fluid">
						<div className="container-fluid">
							<div className="row">
								<div className="copyRight col-md-12 col-sm-12 col-xs-12 text-center">Copyright © 2018 React Redux, LLC. All rights reserved.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(dispatch) };
}

function mapStateToProps(state) {
	return {
		notifications: state.notifications,
		authenticated: state.auth.authenticated,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
