import React, { Component } from "react";
import User from "./UserInfo";

class UsersList extends Component {

	render() {
		const { users, userInfo } = this.props;

		if (!users) {
			return (
				<div className="article-preview">Loading...2</div>
			);
		}

		if (users.length === 0) {
			return (
				<div className="article-preview">
					No users are here... yet.
				</div>
			);
		}

		if (!userInfo) {
			return <div>Loading...3</div>;
		}

		const renderUsers = [];

		Object.keys(users).map((key) => {
			const userDetail = userInfo[users[key]];

			if (renderUsers) {
				renderUsers.push(
					<User key={key} detail={userDetail}/>
				);
			}
		});

		return (
			<div>
				{renderUsers}
			</div>
		);
	}

}

export default UsersList;
