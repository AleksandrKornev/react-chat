import React from 'react';
import { connect } from 'react-redux';
import './chats.scss';

import { getAll } from '../../../../store/actions/message';
import Item from './item/item';

class Chats extends React.Component {
  constructor() {
    super();
    this.state = {
      listenerGetAllChats: null
    }
  }

  componentDidMount() {
    if (this.state.listenerGetAllChats === null) {
      this.setState({ 
        listenerGetAllChats: setInterval(() => this.getAllChats(), 1000)
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      listenerGetAllChats: null
    })
  }

  async getAllChats() {
    await this.props.GET_ALL();
  }

  redirectToMessages() {
    this.props.history.push("/dashboard/messages");
  }

  render() {
    return (
      <div className="chats__wrapper">
        { 
          this.props.message.chats.map((chat, index) => 
            <Item 
              name={ chat.companion } 
              text={ chat.text }
              key={ index }
              chat={ chat }
              onClick={ () => this.redirectToMessages() }
            />
          ) 
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = (dispatch) => ({
  GET_ALL: async () => 
    dispatch(await getAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);