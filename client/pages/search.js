import React from 'react';
import { Layout } from '../containers/Layout';
import NextPageSetup from '../containers/NextPageSetup';
import SearchPage from '../components/Search';


class Search extends React.PureComponent {
  getInitialProps = async() => {
    const res = await fetch(`http://localhost:1337/user/${data}`);
    const data = await res.json()
  };

  render() {


    return <Layout>
      <SearchPage/>
    </Layout>;
  }
}

export default NextPageSetup(Search);
