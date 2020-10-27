import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());
	const userIds = _.uniq(_.map(getState().posts, "userId"));
	userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get("/posts");

		dispatch({
			type: "FETCH_POSTS",
			payload: response.data,
		});
	};
};

// ==>
export const fetchUser = (id) => async (dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: "FETCH_USER", payload: response.data });
};

//<==

// ==> this approach we are using for stopping multiple request for same userId, and this is the
// 	one of the solution to solve this issue, we are using lodash memoization for this.
// export const fetchUser = (id) => (dispatch) => {
// 	_fetchUser(id, dispatch);
// };

// // we write _ for making it clear to other developer that it is a private func.
// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({ type: "FETCH_USER", payload: response.data });
// });

// <==
