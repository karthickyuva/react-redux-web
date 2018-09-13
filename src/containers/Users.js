import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../actions/users";
import { connect } from "react-redux";
import UsersList from "../components/UsersList";
import _ from "lodash";
class Users extends React.Component {

	constructor(props) {
		super();
		let page;
		if (props.users) {
			page = props.users.page;
		}

		this.state = {
			page: page || 1,
			pageSize: 20
		};
	}

	componentWillMount() {
		const { actions, users } = this.props;

		let doesExist = false;
		// if (_.keys(_.pick( users && users.isFetching !== true))) {
		// 	doesExist = true;
		// }

		if (!doesExist) {
			actions.fetchUsers();
		}
	}

	render() {
		const { users, usersDetails } = this.props;

		console.log("is fetching", users.isFetching);
		console.log("userData", users);
		console.log("usersDetail", usersDetails);

		return (<div>
			{ users.isFetching ?
				<div>Loading...</div> :
				<div>
					<div className="container-fluid noPadding">
						<div className="dashboardDiv home-page">A
							<UsersList users={users} userInfo={usersDetails} />
						</div>
					</div>
				</div>
			}
		</div>);
	}
}

Users.propTypes = {
	actions: PropTypes.object,
	users: PropTypes.object,
	usersDetails: PropTypes.object
};

function mapStateToProps(state) {
	return {
		users: state.users,
		usersDetails: state.usersDetails
	}
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators(userActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
