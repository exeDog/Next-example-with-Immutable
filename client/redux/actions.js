import { actions as examples } from './modules/examples';
import { loginActionCreator, signUpActionCreator } from './modules/auth';
import { searchActionCreator } from './modules/search';

export default {
  ...examples, ...loginActionCreator, ...signUpActionCreator, ...searchActionCreator
};
