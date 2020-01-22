import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

function Wrapper() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <div>
          <Route path="/" component={ App }/>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default Wrapper;