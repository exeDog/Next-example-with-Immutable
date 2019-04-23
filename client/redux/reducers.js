import { combineReducers } from 'redux';

import examples from './modules/examples';
import auth from './modules/auth';
import search from './modules/search';

export default combineReducers({
  examples, auth, search,
});
