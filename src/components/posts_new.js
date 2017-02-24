import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => { 
				// blog post has been created, navigate the user to the index
				// We navigate by calling this.context.router.push with the new path
				// to navigate to
				this.context.router.push('/');
			 });
	}

	render() {
		// onSubmit={handleSubmit(this.onSubmit.bind(this))}
		const { fields: { title, categories, content }, handleSubmit } = this.props;

		// const handleSubmit = this.props.handleSubmit
		// const title = this.props.fields.title
		// const categories = this.props.fields.categories
		// const content = this.props.fields.content

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
				<h3>Create A New Post</h3>


				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>

					<input type="text" className="form-control" {...title}/>
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
					
				</div>
				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
					
				</div>
				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea type="text" className="form-control" {...content}/>
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
				
			</form>
		)
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title for the blog post';
	}

	if (!values.categories) {
		errors.categories = 'Enter a category for the blog post';
	}

	if (!values.content) {
		errors.content = 'Enter some content for the blog post';
	}

	return errors;
}

// connect: 1st: mapStatetoProps, 2nd: mapDispatchToProps
// reduxForm: 1st: form config, 2nd: mapStatetoProps, 3rd: mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew);

// exporting our component in ReduxForm is similar to the connect function hookup
// first key is 'form' which is the name of our form; it does not need to match the name of our
// component
// Next we pass an array in our 'fields' key with the fields that we want

// the form name is so critical and must be unique
// So whenever someone changes one of the fields, they are changing the global state of our app
// This is what it looks like:
/*
state === {
	form: {
		PostsNewForm: {
			title: '...',
			categories: '...',
			content:'...'
		}
	}
}
... => so in state, there is a form key which has a unique key for the particular form that we
are working on (as our app could have MULTIPLE forms).  That key, or form name, then has an object
with the fields that we want
*/