import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import Auth from './components/auth';

import { loadFromLocalStorage } from './store/actions/auth';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.loadStorage();
    this.conditionRedirect();
  }

  componentDidUpdate() {
    this.conditionRedirect();
  }

  conditionRedirect() {
    const isAuth = this.props.accessToken;
    if (!isAuth && this.props.location.pathname.indexOf("/auth") === -1) {
      this.props.history.push("/auth");
    } else if (!!isAuth && this.props.location.pathname.indexOf("/dashboard") === -1) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={ Dashboard }/>
          <Route path="/auth" component={ Auth }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: 'TEST', payload: "payload" }),
  loadStorage: async () =>
    dispatch(await loadFromLocalStorage()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
