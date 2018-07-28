import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = { height: 0 };
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit({ email }) {
		this.props.forgotPassword(email);
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
		const { handleSubmit, errorMessage } = this.props;

		return (
			<div>
				<h3 className="title">Let’s find your account</h3>
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="row">
						<div className="loginFormField">
							<div className="col-md-12">
								<p>Please enter your registered email address</p>
								<Field type="text" label="Email" name="email" component={this.renderField} />
							</div>
						</div>
						{ errorMessage && <p className="text-danger text-center" style={ { margin: "-10px 0px" } }>{errorMessage}</p> }
						<div className="loginDivFooter" style={{ marginTop: "15px" }}>
							<div className="col-md-12">
								<button type="submit" className="loginBtn"><i className="fa fa-key" aria-hidden="true"></i> Reset Password</button>
							</div>
							<div className="forgotPasswordLabel text-center">
								<Link to="/login" style={{color: "#b58291", fontWeight: "bold"}}>Didn't actually forget it?</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function validate({ email }) {
	const errors = {};
	if (!email) {
		errors.email = "Enter Email";
	}
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = "Invalid email address";
	}
	return errors;
}

const ReduxForm = reduxForm({
	form: "forgotPassword",
	keepDirtyOnReinitialize: true,
	validate
})(ForgotPassword);

export default connect(
	(state) => ({
		auth: state.auth,
		errorMessage: state.auth.loginError
	}),
	{ forgotPassword }
)(ReduxForm);