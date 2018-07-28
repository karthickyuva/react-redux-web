import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function (ComposedComponent) {
	class Authentication extends Component {
		getRedirect() {
			const path = window.location.pathname;
			if (path && path.indexOf("/logout") < 0 && path !== "/") {
				return `?redirect=${path}`;
			}

			return "";
		}
		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.history.push(`/login${this.getRedirect()}`);
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.context.router.history.push(`/login${this.getRedirect()}`);
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	Authentication.contextTypes = {
		router: PropTypes.object
	};

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}
