import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

//import { g } from '../../../../../store/actions/message';
import eventBus from '../../../../../utils/eventBus';

class Messages extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        avatar: null
      },
      messages: []
    }
    this.frame = React.createRef();
  }

  componentDidMount() {
    eventBus.subscribe('scrollMessage', () => this.scrollDown());
  }

  scrollDown() {
    if (this.frame.current && this.frame.current.scrollHeight) {
      this.frame.current.scrollTo(0, this.frame.current.scrollHeight);
    }
  }

  render() {
    const messages = [];
    this.props.message.messagesCurrentChat.forEach((message, index) => {
      messages.push(
        <Message 
          text={ message.text } 
          ownerUser={ message.isOwnerUser } 
          key={ index } 
        /> 
      )
    });

    return (
      <div 
        className="messages__wrapper"
        ref={ this.frame }
      > 
        { messages }
      </div>
    )
  }
}

const Message = (props) => {
  return (
    <div 
      className={ `messages__message__wrapper ${ props.ownerUser ? 'current' : 'another' }` }
    >
      <div 
        className="messages__message"
      >{ props.text }</div>
    </div>
  )
}

const mapStateToProps = state => ({
  message: state.message
});

/* const mapDispatchToProps = (dispatch) => ({
  GET_MESSAGES_IN_CHAT: async () => 
    dispatch(await getAll())
}); */

export default connect(mapStateToProps, null)(Messages);