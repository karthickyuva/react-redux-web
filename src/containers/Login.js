import React from "react";
import Login from "../components/auth/Login";

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ height: window.innerHeight - 120 });
	}

	render() {
		return (
			<div>
				<div className="loginContainer" style={{ height: this.state.height }}>
					<div className="loginBlock">
						<div className="container">
							<div className="col-md-6 col-md-offset-3">
								<div className="cardView">
									<div className="loginSection">
										<Login />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginView;
