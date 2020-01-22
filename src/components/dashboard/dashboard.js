import React from 'react';
import { connect } from 'react-redux';
import "./dashboard.scss";

import LeftSide from './leftside/leftside';
import Rightside from './rightside';

import eventBus from '../../utils/eventBus';
import { exitFromChat } from '../../store/actions/message';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightSideIsActive: null
    }
  }

  componentDidMount() {
    eventBus.subscribe('changeActiveSide', () => this.changeActiveSide());
  }

  changeActiveSide(flag) {
    this.setState({ rightSideIsActive: flag });
  }

  redirectToBlank() {
    const currentPath = this.props.location.pathname;

    if (currentPath !== "/dashboard/messages/blank" &&
        currentPath === "/dashboard/messages"
      ) {
      this.props.history.push("/dashboard/messages/blank");
    }
  }

  handleExitFromChats(e) {
    if (e.key && e.key !== 'Escape') return;
    this.props.EXIT_CHAT();
    this.redirectToBlank();
  }

  render() {
    return(
      <div 
        className="dashboard__wrapper"
        onKeyDown ={ e => this.handleExitFromChats(e) }
        tabIndex="0"
      >
        <div 
          className={ `dashboard__left ${this.state.rightSideIsActive ? '' : 'active'}` }
          onClick={ () => this.changeActiveSide(false) }
        >
          <LeftSide/>
        </div>
        <div 
          className={ `dashboard__right ${this.state.rightSideIsActive ? 'active' : ''}` }
          onClick={ () => this.changeActiveSide(true) }
        >
          <Rightside/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  EXIT_CHAT: () => 
    dispatch(exitFromChat())
})

export default connect(null, mapDispatchToProps)(Dashboard);