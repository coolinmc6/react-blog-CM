import { FETCH_POSTS, FETCH_POST } from '../actions/index'

// all is our list of blogposts; post is a single post
// we set all to [] to set expectations of what it is going to be
const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_POST:
			return { ...state, post: action.payload.data }
		case FETCH_POSTS:
			return { ...state, all: action.payload.data }
		default:
			return state;
	}
}