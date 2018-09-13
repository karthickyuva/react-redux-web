import React, { Component } from "react";
import User from "./UserInfo";

class UsersList extends Component{

	render() {
		const {users, userInfo} = this.props;

		if (!users) {
			return (
				<div className="article-preview">Loading...</div>
			);
		}

		if (users.length === 0) {
			return (
				<div className="article-preview">
					No users are here... yet.
				</div>
			);
		}

		console.log("userInfo", userInfo);
		if (!userInfo) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				{
					userInfo.map(userDetail => {
						return (
							<User detail={userDetail}/>
						);
					})
				}

			</div>
		);
		}

}

export default UsersList;
