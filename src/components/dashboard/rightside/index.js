import React from 'react';
import { Route } from 'react-router-dom';
import "./index.scss";

import Chat from './chat';
import Blank from './blank';

class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="rightside__wrapper">
        <Route exact path="/dashboard/messages" component={ Chat }/>
        <Route path="/dashboard/messages/blank" component={ Blank }/>
      </div>
    )
  }
}

export default RightSide;