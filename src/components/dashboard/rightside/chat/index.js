import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import Messages from './messages';
import InputMessage from './inputMessage';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        avatar: null
      }
    }
  }

  render() {
    return (
      <div className="chat__wrapper">
        <div className="chat__header">
          <div className="chat__header__user">
            {
              this.state.user.avatar ? 
              <div className="chat__header__user__avatar"></div> :
              <div className="chat__header__user__nonavatar">U</div>
            }
            <span className="chat__header__user__name">{ this.props.email }</span>
          </div>
        </div>
        <div className="chat__body">
          <Messages/>
        </div>
        <div className="chat__footer">
          <InputMessage/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.message.companion.email
});

/* const mapDispatchToProps = (dispatch) => ({
  GET_ALL: async () => 
    dispatch(await getAll())
}); */

export default connect(mapStateToProps, null)(Chat);