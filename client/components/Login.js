import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from './Button';
import { TextField } from './TextField';
import { Form } from './Form';
import { loginActionCreator } from '../redux/modules/auth';

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitted: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleLogin(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    this.props.loginActionCreator(this.state.username);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ username: value });
  }

  render() {
    if (this.props.foundUser) {
      return Router.push(`/search`);
    }

    return (
      <div>
        <Form onSubmit={this.handleLogin}>
          <TextField onChange={this.handleChange} placeholder='Username' value={this.state.username} />
          <Button style={{ display: 'block' }}>Log In</Button>
        </Form>
        {this.state.submitted && !this.props.foundUser && <div className='error'>Account not found</div>}
        <style jsx>{`
          .error {
            color: red;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

LoginBase.propTypes = {
  username: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { loginActionCreator }, dispatch);

const mapStateToProps = state => ({
  user: state.auth.get('user'),
  foundUser: state.auth.get('foundUser'),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginBase);
