import React, { Component } from "react";
import ListPagination from './ListPagination';
import ArticlePreview from "../components/ArticlePreview";

class ArticleList extends Component{

	render() {
		const { articles, articlesCount, currentPage } = this.props;

		if (!articles) {
			return (
                <div className="article-preview">Loading...</div>
			);
		}

		if (articles.length === 0) {
			return (
                <div className="article-preview">
                  No articles are here... yet.
                </div>
			);
		}

		return (
            <div>
				{
					articles.map(article => {
						return (
                            <ArticlePreview article={article} key={article.slug}/>
						);
					})
				}

              <ListPagination
                  pager={1}
                  articlesCount={articlesCount}
                  currentPage={currentPage}/>
            </div>
		);
	};
}

export default ArticleList;
