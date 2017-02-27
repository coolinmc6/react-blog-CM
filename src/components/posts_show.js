import React, { Component, PropTypes } from 'react';
import { connect} from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';


class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		// We are calling our deletePost action which is now available through props thanksk to our ES6 syntax
		// in the connect function.  And we are giving it the id that we are getting though the params object in props
		this.props.deletePost(this.props.params.id)
			.then(() => { this.context.router.push('/') });
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
				<button className="btn btn-danger pull-right"
						onClick={this.onDeleteClick.bind(this)}>
						Delete Post
				</button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);