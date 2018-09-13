import React from "react";
import { Link } from "react-router-dom";

class UserInfo extends React.Component {
	render() {
		const { detail } = this.props;

		return (
			<div className="article-preview">
				<div className="article-meta">
					<div className="info">
						<Link className="author" to={`/users/${detail.id}`}>
							{detail.first_name} {detail.last_name}
						</Link>
						<image src={detail.avatar} alt={detail.first_name} />
					</div>
				</div>
			</div>
		);
	}
}

export default UserInfo;