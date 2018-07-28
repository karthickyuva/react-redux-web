import {
	REQUEST_POSTS_LIST,
	RECEIVE_POSTS_LIST,
	REQUEST_MORE_POSTS,
	RECEIVE_MORE_POSTS
} from "../constants/ActionTypes";

export function postReducer(state = {
	isFetching: false
}, action) {
	switch(action.type) {
		case REQUEST_POSTS_LIST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_POSTS_LIST: {
			return Object.assign({}, state, {
				articles: action.payload.articles,
				articlesCount: action.payload.articlesCount,
				currentPage: action.page,
				isFetching: false
			})
		}
		default:
			return state;
	}
}