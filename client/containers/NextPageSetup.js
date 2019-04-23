import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import initRedux, { dehydrate, rehydrate } from '../lib/initRedux';

export default ComposedComponent =>
  class NextPageSetup extends Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;
      const isServer = !!req;

      let pageProps = {};

      ctx.store = initRedux();

      /**
       * We want to call the getInitialProps method of our wrapped component, so we pass
       * our modified ctx to the next
       */
      if (ComposedComponent.getInitialProps) {
        pageProps = await ComposedComponent.getInitialProps(ctx);
      }

      return {
        initialState: dehydrate(ctx.store.getState()),
        ...pageProps,
        isServer,
      };
    }

    constructor(props) {
      super(props);
      this.redux = initRedux(rehydrate(this.props.initialState));
    }

    render() {
      return (
        <ThemeProvider theme={{ primary: '#860037', secondary: '#2b3d38' }}>
          <Provider store={this.redux}>
            <ComposedComponent {...this.props} />
          </Provider>
        </ThemeProvider>
      );
    }
  };
