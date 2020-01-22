import React from 'react';
import { connect } from 'react-redux';
import './settings.scss';

import { logout } from '../../../../store/actions/auth';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null
    }
  }

  render() {
    return (
      <div className="settings__wrapper">
        <div className="settings__user">
          <div className="settings__user__avatar">
            { this.state.avatar ? 
              <img className="settings__user__avatar__img" alt="avatar"/> :
              <div className="settings__user__avatar__nonimg">U</div> 
            }
          </div>
          <span className="settings__user__name">{ this.props.auth.email }</span>
        </div>
        <div 
          className="settings__exit"
          onClick={(e) => this.props.logout()}
        >Logout</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () =>
    dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);