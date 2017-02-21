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













