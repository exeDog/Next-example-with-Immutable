import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from './TextField';
import { Form } from './Form';
import { TitleBox } from './TitleBox';
import { searchActionCreator } from '../redux/modules/search';
import { logOutActionCreator, setRepoLimitActionCreator, toggleFavoriteActionCreator } from '../redux/modules/auth';
import { ProfileBar } from './ProfileBar';
import { Table } from './Table';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      numberOfRepos: 15,
      repos: [],
      search: '',
    };

    this.findRepos = this.findRepos.bind(this);
    this.setMaxRepos = this.setMaxRepos.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  findRepos(event) {
    const value = event.target.value;
    this.setState({ search: value });
    if (value.length > 2) {
      this.props.searchActionCreator(value);
    }
  }

  setMaxRepos(event, username) {
    const value = event.target.value;
    this.setState({ numberOfRepos: value });
    if (this.props.loggedIn) {
      this.props.setRepoLimitActionCreator(value, username.id);
    }
  }

  logOut() {
    this.props.logOutActionCreator();
    return Router.push('/splash');
  }

  toggleFavorite(repo) {
    this.props.toggleFavoriteActionCreator(repo);
  }

  render() {
    return (
      <div>
        <ProfileBar props={this.props} logout={this.logOut} />
        <TitleBox text='Welcome' />
        <Form>
          <TextField placeholder='Start searching' onChange={this.findRepos} value={this.state.search} />
          <TextField placeholder='Max Results' onChange={event => this.setMaxRepos(event, this.props.user)} value={this.state.numberOfRepos} />
        </Form>
        <Table
          props={this.props.repos}
          isLoggedIn={this.props.loggedIn}
          maxRepos={this.state.numberOfRepos}
          pageType='search'
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    );
  }
}

Search.propTypes = {
  user: PropTypes.object,
  numberOfRepos: PropTypes.number,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { searchActionCreator,
    logOutActionCreator,
    setRepoLimitActionCreator,
    toggleFavoriteActionCreator }, dispatch);

const mapStateToProps = state => ({
  repos: state.search.get('repos'),
  foundUser: state.auth.get('foundUser'),
  user: state.auth.get('user'),
  loggedIn: state.auth.get('loggedIn'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
