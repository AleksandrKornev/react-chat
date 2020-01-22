import React from 'react';
import { Route } from 'react-router-dom';
import './leftside.scss';

import Chats from './chats/chats';
import Settings from './settings/settings';
import Tabs from './tabs/tabs';

class LeftSide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="leftSide__wrapper">
        <Route path="/dashboard/messages" component={ Chats }/>
        <Route path="/dashboard/settings" component={ Settings }/>
        <Route path="/dashboard" component={ Tabs }/>
      </div>
    )
  }
}

export default LeftSide;