import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import { send, getByChat } from '../../../../../store/actions/message';
import SendImg from '../../../../../assets/images/send.png';
import eventBus from '../../../../../utils/eventBus';

class InputMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
    this.inp = React.createRef();
  }

  handleInputMessage(e) {
    this.setState({ message: e.target.value });
  }

  focusToInput() {
    this.inp.current.focus();
  }

  async messageSend(e) {
    if (e.key && e.key !== 'Enter') return;
    if (!!this.state.message) return;

    const message = this.state.message;
    const companionID = this.props.companionID;
    await this.props.MESSAGE_SEND(message);
    this.setState({ message: '' });
    await this.props.MESSAGES_UPDATE(companionID);
    eventBus.dispatch("scrollMessage");
  }

  render() {
    return (
      <div className="inputMessage__wrapper">
        <div 
          className="inputMessage__input__wrapper"
          onClick={ e => this.focusToInput(e) }
        >
          <textarea 
            className="inputMessage__input" 
            ref={ this.inp }
            value={ this.state.message }
            onChange={ e => this.handleInputMessage(e) }
            onKeyDown ={ e => this.messageSend(e) }
          />
        </div>
        <div className="inputMessage__send__wrapper">
          <div 
            className={`inputMessage__send ${ !!this.state.message ? 'active' : '' }`}
            onClick={e => this.messageSend(e)}
          >
            <img 
              className="inputMessage__send__img"
              src={ SendImg } 
              alt="send"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  companionID: state.message.companion.id
});

const mapDispatchToProps = dispatch => ({
  MESSAGE_SEND: async (text) => 
    dispatch(await send(text)),
  MESSAGES_UPDATE: async (companionID) =>
    dispatch(await getByChat(companionID))
});

export default connect(mapStateToProps, mapDispatchToProps)(InputMessage);