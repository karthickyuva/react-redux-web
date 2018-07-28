import React from "react";
import PageHeader from "../components/PageHeader";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as postActionCreators from "../actions/posts";
import { connect } from "react-redux";
import ArticleList from "../components/ArticleList";
import _ from "lodash";
class Dashboard extends React.Component {

	constructor(props) {
		super();
		let currentPage;
		if (props.articles) {
			currentPage = props.articles.currentPage;
		}

		this.state = {
			page: currentPage || 1,
			pageSize: 20
		};
	}

	componentWillMount() {
		const { actions, articles } = this.props;

		let doesExist = false;
		// if (_.keys(_.pick( && articles.isFetching !== true))) {
		// 	doesExist = true;
		// }

		if (!doesExist) {
			actions.fetchPostList();
		}
	}

	render() {
		const { articles, pager } = this.props;

		if (articles.isFetching) {
			return <div>Loading...</div>;
		}
		const articlesData = articles && articles.articles;

		return (
			<div>
				<PageHeader title={"Posts"} hideButton />
				<div className="container-fluid noPadding">
					<div className="dashboardDiv home-page">
						<ArticleList
							pager={1}
							articles={articlesData}
							articlesCount={articles.articlesCount}
							currentPage={articles.currentPage} />
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	action: PropTypes.Object,
	articles: PropTypes.Object
};

function mapStateToProps(state) {
	return {
		articles: state.articles
	}
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators(postActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
