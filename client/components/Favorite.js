import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutActionCreator, toggleFavoriteActionCreator } from '../redux/modules/auth';
import { Table } from './Table';
import { ProfileBar } from './ProfileBar';


class Favorite extends Component{
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  logOut() {
    this.props.logOutActionCreator();
    return Router.push('/splash');
  }

  toggleFavorite(repo) {
    this.props.toggleFavoriteActionCreator(repo);
  }

  render() {
    const favoriteData = this.props.user.favorites || [];
    return (
      <div>
        <ProfileBar props={this.props} logout={this.logOut} />
        <Table
          props={favoriteData}
          isLoggedIn={this.props.loggedIn}
          maxRepos={100}
          pageType='favorite'
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { logOutActionCreator, toggleFavoriteActionCreator }, dispatch);

const mapStateToProps = state => ({
  repos: state.search.get('repos'),
  foundUser: state.auth.get('foundUser'),
  user: state.auth.get('user'),
  loggedIn: state.auth.get('loggedIn'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
