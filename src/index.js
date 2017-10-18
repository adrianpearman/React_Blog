import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import promise from 'redux-promise';
import reducers from './reducers';
import PostsIndex from './components/post_index';
import PostsNew from './components/post_new';
import PostShow from './components/post_show';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <div>
      {/* Using the built in Switch function from react-router allows for the proper switch between those different routes. Also to be sure to place the more spefic routes first to make sure that it runs properly */}
      <Switch>
        <Route path='/posts/new' component={PostsNew} />
        <Route path='/posts/:id' component={PostShow} />
        <Route path='/' component={PostsIndex} />
      </Switch>
    </div>
  </BrowserRouter>
</Provider>
  , document.getElementById('root'));
registerServiceWorker();
