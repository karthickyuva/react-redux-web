import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registration } from "../../actions/auth";
import { Link } from "react-router-dom";

class Registration extends Component {
	constructor() {
		super();
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit({ firstName, lastName, mobile, email, password, company }) {
		this.props.registration({ firstName, lastName, mobile, email, password, company });
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
				<h3 className="title">New User?</h3>
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="row">
						<div className="col-md-12">
							<Field name="firstName" type="text" label="First Name" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="lastName" type="text" label="Last Name" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="mobile" type="text" label="Phone Number" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="email" type="text" label="Email Address" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="company" type="text" label="Company" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="password" type="password" label="Password" component={this.renderField} />
						</div>
						<div className="col-md-12">
							<Field name="confirmPassword" type="password" label="Confirm Password" component={this.renderField} />
						</div>
					</div>
					{ errorMessage && <p className="text-danger" style={ { position: "absolute", marginTop: "-15px", marginBottom: "5px" } }>{errorMessage}</p> }
					<div>
						<div style={{ "float": "left" }}>
							<span>Already have an account? <Link style={{ color: "#4aa951" }} to="/login">Login</Link>.</span>
						</div>
						<div className="text-right">
							<button
								type="submit"
								className="btn btn-theme"
							>{"Sign Up"}</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function validate({ firstName, lastName, mobile, email, company, password, confirmPassword }) {
	const errors = {};
	if (!firstName) {
		errors.firstName = "Enter First Name";
	}
	if (!lastName) {
		errors.lastName = "Enter Last Name";
	}
	if (!mobile) {
		errors.mobile = "Enter Mobile Number";
	}
	if (!email) {
		errors.email = "Enter Email";
	}
	if (!company) {
		errors.company = "Enter Company";
	}
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = "Invalid email address";
	}
	if (!password) {
		errors.password = "Enter Password";
	}
	if (!confirmPassword) {
		errors.confirmPassword = "Enter Confirm Password";
	}

	if (password && confirmPassword && password !== confirmPassword) {
		errors.password = "Password should be same";
		errors.confirmPassword = "Password should be same";
	}
	return errors;
}

const ReduxForm = reduxForm({
	form: "signup",
	keepDirtyOnReinitialize: true,
	validate
})(Registration);

export default connect(
	(state) => ({
		errorMessage: state.auth.registrationError
	}),
	{ registration }
)(ReduxForm);
