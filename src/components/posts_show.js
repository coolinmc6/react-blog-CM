import React, { Component } from 'react';
import { connect} from 'react-redux';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}
	
	render() {
		// ES5 version of code below: const post = this.props.post
		const { post } = this.props;

		// this is where the 'loading' spinner would be
		if (!this.props.post){
			return <div>Loading...</div>
		}
		return (
			<div> 
				<Link to="/">Back</Link>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost})(PostsShow);