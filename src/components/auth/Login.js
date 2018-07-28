import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link } from "react-router-dom";

class Login extends Component {
	constructor() {
		super();
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit({ email, password }) {
		this.props.login({ email, password });
	}

	renderField(field) {
		const { input, label, type, meta: { touched, error } } = field;
		return (
			<div className={`form-group ${(error && touched ? "has-error" : "")}`} >
				<input
					{...input}
					type={type}
					placeholder={label}
					className="form-control input-lg"
				/>
			</div>
		);
	}
	render() {
		const { handleSubmit, auth: { isLoading }, errorMessage } = this.props;
		return (
			<div>
				<h3 className="title">Log in to React Redux Web</h3>
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="row">
						<div className="loginFormField">
							<div className="col-md-12">
								<Field name="email" type="text" label="Email Address" component={this.renderField} />
							</div>
							<div className="col-md-12">
								<Field name="password" type="password" label="Password" component={this.renderField} />
							</div>
						</div>
						{ errorMessage && <p className="text-danger text-center" style={ { margin: "-10px 0px" } }>{errorMessage}</p> }
						<div className="loginDivFooter" style={{ marginTop: "15px" }}>
							<div className="col-md-12">
								<button
									type="submit"
									className="loginBtn"><i className="fa fa-sign-in" aria-hidden="true"></i> {isLoading ? "Logging in..." : "Log in"}
								</button>
							</div>
							<div className="forgotPasswordLabel text-center">
								<Link to="/forgotPassword" style={{color: "#b58291", fontWeight: "bold"}}>Forgot Password?</Link>
							</div>
						</div>
					</div>
				</form>
			</div>

		);
	}
}

function validate({ email, password }) {
	const errors = {};
	if (!email) {
		errors.email = "Enter Email";
	}
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = "Invalid email address";
	}
	if (!password) {
		errors.password = "Enter Password";
	}
	return errors;
}

const ReduxForm = reduxForm({
	form: "signin",
	keepDirtyOnReinitialize: true,
	validate
})(Login);

export default connect(
	(state) => ({
		auth: state.auth,
		errorMessage: state.auth.loginError
	}),
	{ login }
)(ReduxForm);
