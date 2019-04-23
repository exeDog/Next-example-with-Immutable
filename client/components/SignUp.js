import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from './Button';
import { TextField } from './TextField';
import { Form } from './Form';
import { signUpActionCreator } from '../redux/modules/auth';


class SignUp extends Component {
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
    this.props.signUpActionCreator(this.state.username);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ username: value });
  }

  render() {
    if (this.props.userAdded) {
      return (Router.push(`/search`));
    }

    return (
      <div>
        <Form onSubmit={this.handleLogin}>
          <TextField onChange={this.handleChange} placeholder='Enter a new username' value={this.state.username} />
          <Button style={{ display: 'block' }}>Sign Up</Button>
        </Form>
        {this.state.submitted && this.props.userExists && <div className='error'>Username already exists</div>}
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

SignUp.propTypes = {
  username: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { signUpActionCreator }, dispatch);

const mapStateToProps = state => ({
  userExists: state.auth.get('userExists'),
  userAdded: state.auth.get('userAdded'),
  loggedIn: state.auth.get('loggedIn'),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
