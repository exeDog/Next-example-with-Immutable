import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fromJS } from 'immutable';
import reducers from '../redux/reducers';

// reduxStore singleton for the client only
let reduxStore = null;

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;

/* eslint-disable no-underscore-dangle */
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}
/* eslint-enable */

/**
 * This is just a simple helper that calls
 * createStore so that we can call this function
 * multiple times during the initial request.
 */
const create = initialState => createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    devtools,
  ),
);

/**
 * This function is for taking our redux state
 * and dehydrating it into a plain javascript object
 * that can be reyhdrated on the client. Use in
 * tandem with the follow 'rehydrate' function.
 */
export const dehydrate = (state) => {
  const dehydrated = {};
  for (const key of Object.keys(state)) {
    dehydrated[key] = state[key].toJS();
  }
  return dehydrated;
};

/**
 * Takes a plain javascript object and loops
 * through it to call fromJS on each subkey.
 * This rehydrates an object from dehydrate to
 * re-establish the server state in the client
 */
export const rehydrate = (state) => {
  const rehydrated = {};
  for (const key of Object.keys(state)) {
    rehydrated[key] = fromJS(state[key]);
  }
  return rehydrated;
};

/**
 * initializes our redux state. If we are in the
 * server it will ALWAYS return a new reduxStore.
 * This is to prevent stores from being cached between
 * server side requests which would be bad.
 *
 * If in the client it will return the already initialized
 * redux store to prevent overwriting the store unintentionally.
 */
export default (initialState) => {
  // Always create new store on the server
  if (!process.browser) return create(initialState);

  // If we are in the browser, init the store once.
  if (!reduxStore) reduxStore = create(initialState);

  return reduxStore;
};
