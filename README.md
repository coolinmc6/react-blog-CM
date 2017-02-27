# README

This app is a blog using React and built with the create-react-app CLI.  The goal is to use React, 
Redux, and React Router.

## Initial Commit
```sh
create-react-app react-blog-CM
```
- Next steps are to bring in Redux.  Record the steps and take notes.

## Set-up
- Install dependencies
```sh
npm install --save redux
npm install --save react-redux
npm install --save redux-promise
npm install --save axios
npm install react-bootstrap --save
```
- Create folders for `/actions`, `/components`, `/containers` and `/reducers`
- Create blank index.js file for `/actions`
- `/containers` can remain blank for now
- Write rootReducer in `/reducers/index.js`
  ```js
  import { combineReducers } from 'redux';

  const rootReducer = combineReducers({

  });

  export default rootReducer;
  ```
  - There are three main things I need to do: (#1) import the combineReducers function, (#2) set my
  rootReducer equal to the result of the combineReducers function that takes in, as its only argument, 
  an object where each key has a value of reducers I include, (#3) export my rootReducer
- update `./index.js` file:
```js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import App from './components/App';
import reducers from './reducers'
import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>,
  document.getElementById('root')
);
```
  - import { Provider } from ReactRedux
  - import { createStore, applyMiddleware } from 'redux';
  - create the store for Redux.  
    - I used Stephen's version because we will be using middleware but I should at least get the link for
    how to add middleware myself
  - Wrap my `<App />` component in `<Provider>` tags
  - Pass my store into `<Provider>`
- And with that, I believe that I am all set-up.  I am currently getting an error about a valid reducer being passed into my rootReducer but that's okay for now.
- Lastly, I did install Bootstrap:
```sh
npm install react-bootstrap --save
```
  - ...which also required that I include the stylesheet in my index.html file
- L72
- Installing React Router
```sh
npm install --save react-router@2.0.0-rc5
```
- we installed a particular version to ensure I am matching Grider's version
- React-Router also includes a package called History which manages the URL of the browser; it watches
the URL for changes and also has the ability to change it over time
- whenever the user changes the URL, History takes that URL and passes it to ReactRouter
- ReactRouter takes that URL and updates the React components shown on the screen depending on the URL
- React gets the components it needs to renders and renders them
- To the user, it looks like they went to a new page with new content

-L73
- The basic initial set-up of ReactRouter is all in `./index.js`:
```js
import { Router, browserHistory } from 'react-router';

// code
<Provider store={createStoreWithMiddleware(reducers)}>
	<Router history={browserHistory} />
</Provider>,
```
- First, we removed our import of App and instead imported Router and browserHistory from react-router
- Then, we removed our App component between our Provider tags and replaced it with `<Router />` with a
history property.
- Then we did the routes setup.  This wasn't too bad but I need to read the docs to better understand it.
We created a new file `/routes.js`:
```js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

export default (
	<Route path="/" component={App} />
);
```
- and then imported the file `import routes from './routes';` and passed routes as property into `<Router />`:
`<Router history={browserHistory} routes={routes} />`
- I was getting an error about not calling PropTypes which I "fixed" by installing the latest version of
ReactRouter.
- **L75 => REVISIT THIS:** this is where we learn how React Router determines which path to show
- First, we created a component (that we won't use again) and added paths all referencing the same component:
```js
// routes.js
const Greeting = () => {
	return <div>Hey there!</div>;
}


export default (
	<Route path="/" component={App} >
		<Route path="greet" component={Greeting} />
		<Route path="greet2" component={Greeting} />
		<Route path="greet3" component={Greeting} />
	</Route>
);
```
  - Note how the path changes.  We make the `<Route>` element NOT self-closing and we add individual
  self-closing Routes with different path properties and their associated components to render.
  - So `path={greet}` means that in the browser, the URL would show 'myapp.com/greet' and the app would
  look to render the Greeting component
- BUT, we aren't done.  ReactRouter doesn't know WHERE to put it...so in `./components/App.js` we add
`{this.props.children}` in the return statement to say that's where we want to render it
  - Greeting is a child of App as we can see in the Route code above
  - I can see how my `<App />` component would have a header, a footer and then in the middle just render
  my `{this.props.children}`.  

- We always want a component like App to be the root of our application; we don't want to change that
- instead of changing our root route, we can add an IndexRoute for our posts_index.js file
- ReactRouter is actually on one page; it just gives the illusion of changing pages
- **NOTE:** at this point, I have already installed Axios and ReduxPromise
- Grider did `import promise from 'redux-promise'` as opposed to `import ReduxPromise from 'redux-promise';`; I guess
it really doesn't matter...
- Here is a CM derivation of what my action should be:
  - Actions are JS objects that contain a type and a payload (and may contain other things)
  - Because this action is just issuing a GET request, my type can just be `FETCH_POSTS` and my payload will be
  the results of my GET request
  - So if I had to create a basic shell, it'd be like this:
  ```js
  export function fetchPosts() {

    return {
      type: FETCH_POSTS,
      payload: request
    };
  }
  ```

  - What is that request variable?  It is assigned the value of the axios.get request which has a pretty easy
  syntax to understand: 'axios' + '.get' + '(URL)'.  That's it.  The GET request will be inside the function as
  we'll need to issue the GET request EVERY time we want to return the `FETCH_POSTS` action.  So we can write it
  like this: `const request = axios.get('${ROOT_URL}/posts${API_KEY}')` (URL is actually wrapped in backticks, not
  single quotes)
  - As we can see, I have defined my `ROOT_URL` and `API_KEY` elsewhere.  I also have to define `FETCH_POSTS` and
  import axios.
  - Here is my final action:
  ```js
  import axios from 'axios';

  export const FETCH_POSTS = 'FETCH_POSTS';

  const ROOT_URL = 'http://reduxblog.herokuap.com/api';
  const API_KEY = '?key=colinisamazing1234567890'

  export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

    return {
      type: FETCH_POSTS,
      payload: request
    };
  }
  ```
- This is our PostsReducer:
```js
import { FETCH_POSTS } from '../actions/index'

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data }
    default:
      return state;
  }
}
```
  - This is much different than what we've done in our weather app.  Our initial state is not just an empty array
  but is an object with two properties.  I believe that what we are doing is we are taking our state and then
  making the all property be the `action.payload.data`.  I think it's just ES6 syntax but the concept is largely 
  the same as what we did here `return [action.payload.data, ...state]`
- `componentWillMount()` will be called only when the component is initially rendered; it won't be re-rendered on 
subsequent state changes.  This is a perfect place to fetch our posts
- To change port, update your `package.json` file:
```json
"scripts": {
  "start": "PORT=8080 react-scripts start",
```
  - I learned that because I thought my GET request was being blocked because I was on a different PORT.  But I actually
  had a typo in my `ROOT_URL`
- We ended up changing our `posts_index.js` file and removing the mapDispatchToProps using a trick and some ES6:
```js
// OLD
function mapDispatchToProps(dispatch){

  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null,mapDispatchToProps)(PostsIndex);

// NEW
export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

// NEW + ES6 Syntax
export default connect(null, { fetchPosts })(PostsIndex);
```
  - this still gives us access to our fetchPosts in props
  - we can also remove our bindActionCreators import at the top
- In Lecture 82 we are building our PostsNew component which is a form that grabs a title, 
contents, and categories from the user.  Here is a quick run-down of properly incorporating
this into our ReactRouter:
  1. Write the component
  1. Import our component into our routes.js file
  1. Create a new `<Route />` for our component: `<Route path="posts/new" component={PostsNew} />`
- Notice how we aren't importing ANYTHING into our `<App />` component.  That doesn't mean
that we never will it just means that for the things that need their own routes, they are
imported into routes.js and given the proper routing/placement there.  Things like headers
and footers, which I'd want present on ALL pages, will be imported into App.  Remember, 
`<App />` has access to `this.props.children` which is what houses our children components.
So wherever that is in App is where it will populate.
- In L84, we created a new `<Link>` element:
  - In our posts_index file, we imported it: `import { Link } from 'react-router';`
  - and then added it like so:
  ```js
  <Link to="/posts/new" className="btn btn-primary">
    Add a Post
  </Link>
  ```

## Adding Redux Form (L84)
- How it works:
  - we need to tell ReduxForm that it will be in charge of our PostsNew form
  - ReduxForm wants to have its own set of rules for each field
  - ReduxForm is ALSO in charge of submitting as well
  - ReduxForm is then going to pass back some properties

```sh
npm install --save redux-form@4.1.3
```
- Hook it up to our rootReducer in `./reducers/index.js`:
```js
import { reducer as formReducer } from 'redux-form';

// add to rootReducer with key 'form'; the property/key MUST be 'form'
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // NEW
});

export default rootReducer;
```
- Then we need to add it to our component that has the form:
  - import it: `import { reduxForm } from 'redux-form';`
  - we then connect it to the component like we do for the `{ connect } ` function in Redux
  '''js
  export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content']
  })(PostsNew);
  ```
    - it looks bigger and more involved but that first argument in the parens is an object for
    ReduxForm.  This is what is happening:
      - Our first key is the unique name of the form this component is dealing with.  It must be
      unique and it must be attached to the 'form' property
      - The second key is 'fields' and it contains an array of the fields that we'll need for our
      our form.
    - here is a state-based look at what is really happening:
    ```js
    state === {
      form: {
        PostsNewForm: {
          title: '...',
          categories: '...',
          content:'...'
        }
      }
    }
    ```
      - so in state, there is a form key which has a unique key for the particular form that we 
      are working on (as our app could have MULTIPLE forms).  That key, or form name, then has an
      object with the fields that we want
- In the same way that `{ connect }` allows us to access those items in our props, so does the
reduxForm helper.  One of them being handleSubmit which we'll use in our render() method and see
a little ES6 syntax:
```js
// ES6 syntax
const { handleSubmit } = this.props;

// ES5 syntax
const handleSubmit = this.props.handleSubmit
```
- After setting our handleSubmit action, we need to map our inputs to the various fields we've
defined.  After it's all finished, the benefits of ES6 are much more obvious:
```js
// ES6 => 1 line
const { fields: { title, categories, content }, handleSubmit } = this.props;

// ES5 => 4 lines
const handleSubmit = this.props.handleSubmit
const title = this.props.fields.title
const categories = this.props.fields.categories
const content = this.props.fields.content
```
  - NOTE: see how we are getting title, categories and content?  Each of those is a property of
  fields which, because of our helper, is now available to us in props.
- we need to pass the configuration object for each of title, categories and content into our 
associated objects.
  - to see our configuration object, take a look at console.log.
- We want to destructures the object and puts all of those properties onto the element itself and
we do that using special syntax: `{...title}`
- We need to somehow merge connect into ReduxForm...
```js
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew);
```
  - connect: 1st: mapStatetoProps, 2nd: mapDispatchToProps
  - reduxForm: 1st: form config, 2nd: mapStatetoProps, 3rd: mapDispatchToProps
- I am getting a warning when I make my post request.  It works but I am getting a big red warning
from React.  It'd be a good exercise to convert my form to a ReduxForm v6...take a look 
[here](http://redux-form.com/6.0.0-rc.3/docs/MigrationGuide.md/)

## Form Validation
- wrote validate function and added it as an argument in our `export default ReduxForm` object
- It sounds like the validate function and the 'touched' functionality comes with ReduxForm
- The code below is a clever way of giving a div a class based on some conditions.  Here, we 
are using string interpolation to add another class if my title field has been touched AND is
invalid (right now, that means blank).  If so, it gets the 'has-danger' class.

```js
<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
```
- React Router has a built in method called push that allows us to navigate around
- We need to get access to the helper method 'push' from React Router
- We are getting it from the context property of React Router
- it's similar to props BUT it doesn't need to be explicitly passed into a child component
- Do not abuse context in the application, you should generally try to avoid using it
- To get access to context, we must define a context types property:

```js
static contextTypes = {
  router: PropTypes.object
}
```
- we are designing an object on the PostsNew class.  React interprets this object whenever an instance of Post-new is created
- react is going to see that we want a particular property on our context called router
- React is then going to search all of this component's parents until it finds a component that has
a piece of context called router
- It then goes all the way up to the parent Router (inside our index.js) file which gives us the
context for us
- we essentially are trying to get this.context.router inside our component; it's like props but a
little different

- We built our PostsShow component and now we need to build the action and reducer to fetch a
single post
- In our action creator, we did the normal steps:
  - define our action type at the top: `export const FETCH_POST = 'FETCH_POST';`
  - create our action creator:
  ```js
  export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
      type: FETCH_POST,
      payload: request
    }
  }
  ```
- in our PostsReducer:
  - we added a case for `FETCH_POST` and then returned the proper state object
    - remember, we are NOT altering state but we kind of are.  We are NOT altering the particular
    state object that we've received, yes, but we DO want to change the 'post' property.  That's
    why we use the (spread?) operator inside the curly braces to say that we want everything that
    is currently in state but for the 'post' property, replace what we currently have with the
    info we got back from our GET request
- finished L93
- As a quick run through, we have an index page that shows ALL of our blog posts.  We can click on
'ADD POST' to add a new blog post, after which if the creation is successful, we are directed
back to our index page.  We created `PostsShow` component to actually show users the post that 
they've written.  In PostsShow, we needed an action that would fetch the post that we want.  We
do that using the post's id that we get from the back end.  That id is part of what we receive
from the index page's `FETCH_POSTS` call so when we created the `<Link>` element, its path was
just the `/posts/:id`.  In PostsShow, we use that id to determine which post we want.  We pass
our action creator that id through the `this.props.params` object which is what we get for free
(no setup required).  So using that, we have succesfully called our action creator with the
id for our blog post and have received our information from the GET request.  Lecture 94 will
have us actually display it now...

- We are about to create our DELETE_POST action.  This is what we have to do:
  - define DELETE_POST at the top of our `./actions/index.js` file
  - create the action creator which should just be an `axios.delete()`
  
- Adding navigation AFTER completing the delete action is simple.  I just need to bring in the context
and then I can add the promise
```js
// add this inside my PostsShow class
static contextTypes = {
    router: PropTypes.object
}

// add the promise:
this.props.deletePost(this.props.params.id)
  .then(() => { this.context.router.push('/') });
```





