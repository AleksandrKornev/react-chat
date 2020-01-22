import React from 'react';
import { connect } from 'react-redux';
import "./index.scss";

import { authUser } from '../../store/actions/auth';

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInput(stateName, e) {
    this.setState({ [stateName]: e.target.value });
  }

  Login() {
    this.props.Auth(this.state.email, this.state.password);
  }

  render() {
    return(
      <div className="auth__wrapper">
        <div className="auth__form">
          <input 
            className="auth__form__input"
            placeholder="email"
            onChange={ e => this.handleInput('email', e) }
          />
          <input 
            className="auth__form__input last"
            placeholder="password"
            onChange={ e => this.handleInput('password', e) }
          />
          <div 
            className="auth__form__btn"
            onClick={ () => this.Login() }
          >Login</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  Auth: async (email, password) =>
    dispatch(await authUser({ email, password })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);