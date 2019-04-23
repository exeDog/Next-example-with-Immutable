import React from 'react';
import { Layout } from '../containers/Layout';
import NextPageSetup from '../containers/NextPageSetup';
import Favorite from '../components/Favorite';

class Favorites extends React.PureComponent {
  render() {
    return (<Layout>
      <Favorite />
    </Layout>);
  }
}

export default NextPageSetup(Favorites);
