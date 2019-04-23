import React from 'react';
import { Layout } from '../containers/Layout';
import NextPageSetup from '../containers/NextPageSetup';
import { NameCard } from '../components/NameCard';
import { TitleBox } from '../components/TitleBox';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginBoxDisplayed: false,
      signUpBoxDisplayed: false,
    };
    this.showLoginBox = this.showLoginBox.bind(this);
    this.showSignUpBox = this.showSignUpBox.bind(this);
  }

  getInitialProps = async() => {
    /*
     * This lifecycle method is used by nextjs to make any initial data requests
     * For an example of usage, see https://learnnextjs.com/basics/fetching-data-for-pages/fetching-batman-shows
     */
  };

  showLoginBox() {
    this.setState({ loginBoxDisplayed: true, signUpBoxDisplayed: false });
  }

  showSignUpBox() {
    this.setState({ loginBoxDisplayed: false, signUpBoxDisplayed: true });
  }

  render() {

    const { loginBoxDisplayed, signUpBoxDisplayed } = this.state;
    return (<Layout>
      <TitleBox text="Welcome to Github Profile Viewer" />
      <NameCard
        text="Please select an option to continue."
        showLoginBox={this.showLoginBox}
        showSignUpBox={this.showSignUpBox}
      />
      { loginBoxDisplayed && <Login />}
      { signUpBoxDisplayed && <SignUp />}
    </Layout>);
  }
}

export default NextPageSetup(Splash);
