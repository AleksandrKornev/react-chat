import React from 'react';
import { connect } from 'react-redux';
import './item.scss';

import { getByChat } from '../../../../../store/actions/message';
import eventBus from '../../../../../utils/eventBus';

class Item extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  async selectChat() {
    let companionID = this.props.chat.companionID;
    this.props.onClick();
    await this.props.SELECT_CHAT(companionID);
    eventBus.dispatch("scrollMessage");
  }

  render() {
    return (
      <div 
        className={ `item__wrapper ${ this.props.chat.companionID === this.props.companion.id ? 'active' : ''}` }
        onClick={ () => this.selectChat() }
      >
        <i className="item__icon default">U</i>
        <div className="item__text">
        <span className="item__text__name">{ this.props.name }</span>
        <span className="item__text__message">{ this.props.text }</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  companion: state.message.companion
});

const mapDispatchToProps = (dispatch) => ({
  SELECT_CHAT: async (companionID) => 
    dispatch(await getByChat(companionID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);