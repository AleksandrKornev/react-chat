import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './tabs.scss';

import MessageLogo from "../../../../assets/images/message.png";
import SettingsLogo from "../../../../assets/images/settings.png";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ''
    }
  }

  componentDidMount() {
    const currentPath = this.props.location.pathname;

    this.setState({ path: currentPath});
    if (currentPath.indexOf("/dashboard/messages") === -1 &&
        currentPath.indexOf("/dashboard/settings") === -1
      ) {
      this.props.history.push("/dashboard/messages/blank");
    }
  }

  componentDidUpdate() {
    if (this.state.path !== this.props.location.pathname) {
      this.setState({ path: this.props.location.pathname });
    }
  }

  computedMessage() {
    return this.props.companionID ? 
      "/dashboard/messages" : "/dashboard/messages/blank";
  }

  render() {
    return (
      <div className="tabs__wrapper">
        <div className="tabs">
          <div 
            className={ `tabs__tab ${this.state.path.indexOf("/dashboard/messages") !== -1 ? "active" : ""}` }
          >
            <Link 
              className="tabs__link"
              to={ this.computedMessage() }
            />
            <img
              className="tabs__tab__img message"
              src={ MessageLogo } 
              alt="message"
            />
          </div>
          <div 
            className={ `tabs__tab ${this.state.path === "/dashboard/settings" ? "active" : ""}` }
          >
            <Link 
              className="tabs__link"
              to="/dashboard/settings"
            />
            <img
              className="tabs__tab__img settings" 
              src={ SettingsLogo } 
              alt="settings"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  companionID: state.message.companion.id
})

export default connect(mapStateToProps, null)(Tabs);