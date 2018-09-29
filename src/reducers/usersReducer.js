import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST,
	FETCH_USERS_LIST_FAIL,
	REQUEST_MORE_USERS,
	RECEIVE_MORE_USERS,
	FETCH_MORE_USERS_FAIL,
	CHANGE_USERS_PAGE
} from "../constants/ActionTypes";

export function usersReducer(state = {
	isFetching: false, isLoadingMore: false
}, action) {
	switch (action.type) {
		case REQUEST_USERS_LIST:
			console.log("test 1");
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_USERS_LIST: {
			console.log("test 2");
			return Object.assign({}, state, {
				pages: Object.assign({}, state.pages, {
					[action.payload.page]: action.payload.data.map((n) => n.id)
				}),
				pagination: {
					page: action.payload.page,
					total: action.payload.total,
					total_pages: action.payload.total_pages
				},
				isFetching: false
			})
		}
		case FETCH_USERS_LIST_FAIL:
			return Object.assign({}, state, {
				isFetching: false
			});
		case REQUEST_MORE_USERS:
			return Object.assign({}, state, {
				isLoadingMore: true
			});
		case RECEIVE_MORE_USERS:  {
			return Object.assign({}, state, {
				pages: Object.assign({}, state, {
					[action.payload.page]: action.payload.data.map((n) => n.id)
				}),
				pagination: Object.assign({}, state, {
					page: action.payload.page,
					total: action.payload.total,
					total_pages: action.payload.total_pages
				}),
				isLoadingMore: false
			})
		}
		case FETCH_MORE_USERS_FAIL:
			return Object.assign({}, state, {
				isLoadingMore: false
			});
		case CHANGE_USERS_PAGE:
			return Object.assign({}, state, {
				pagination: Object.assign({}, state, {
					page: action.payload
				})
			});
		default:
			return state;
	}
}