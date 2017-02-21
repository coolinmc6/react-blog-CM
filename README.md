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













