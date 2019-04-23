import { fromJS } from 'immutable';

const LOGGED = 'LOGGED';
const NOTFOUND = 'NOT_FOUND';
const USER_EXISTS = 'USER_EXISTS';
const USER_ADDED = 'USER_ADDED';
const LOGOUT = 'LOGOUT';
const SET_REPO_LIMIT = 'SET_REPO_LIMIT';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';


export const loginActionCreator = data => (dispatch) => {
  fetch(`http://localhost:1337/user/${data}`)
    .then(response => response.json())
    .then((response) => {
      if (response.status === 404) {
        dispatch({ type: NOTFOUND });
      } else if (response.error) {
        dispatch({ type: NOTFOUND });
      } else {
        dispatch({ type: LOGGED, user: response });
      }
    })
    .catch(() => dispatch({ type: NOTFOUND }));
};

export const signUpActionCreator = data => (dispatch) => {
  fetch(`http://localhost:1337/user/${data}`)
    .then(response => response.json())
    .then((response) => {
      if (response.error) {
        fetch(`http://localhost:1337/user/${data}`, {
          method: 'post',
          body: JSON.stringify({ settings: { resultCount: 15 } }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(innerResponse => innerResponse.json())
          .then((innerResponse) => {
            dispatch({ type: USER_ADDED, user: response });
          });
      } else {
        dispatch({ type: USER_EXISTS });
      }
    });
};

export const logOutActionCreator = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const setRepoLimitActionCreator = (data, id) => (dispatch) => {
  fetch(`http://localhost:1337/user/${id}/settings`, {
    method: 'patch',
    body: { operation: 'update', payload: { resultCount: data } },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(() => dispatch({ type: SET_REPO_LIMIT, limit: data }));
};

export const toggleFavoriteActionCreator = data => (dispatch) => {
  dispatch({ type: TOGGLE_FAVORITE, data });
};

const initialStateBase = {
  user: {},
  foundUser: false,
  userExists: false,
  userAdded: false,
  loggedIn: false,
};

const initialState = fromJS(initialStateBase);


export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return state.set('user', action.user).set('foundUser', true).set('loggedIn', true);
    case NOTFOUND:
      return state.set('foundUser', false).set('loggedIn', false);
    case USER_EXISTS:
      return state.set('userExists', true);
    case USER_ADDED:
      return state.set('userAdded', true).set('loggedIn', true).set('user', action.user).set('foundUser', false);
    case LOGOUT:
      return state.set('foundUser', false).set('loggedIn', false).set('user', {}).set('userAdded', false);
    case SET_REPO_LIMIT:
      const resultCount = { resultCount: action.limit };
      return state.mergeDeep({ user: { settings: resultCount } });
    case TOGGLE_FAVORITE:
      let previousState = state.toJS();
      if (previousState.user.favorites.find(obj => obj.id === action.data.name)) {
        previousState.user.favorites = previousState.user.favorites.filter(obj =>
          obj.id !== action.data.name);
        previousState = fromJS(previousState);
        state.set('user', previousState);
      } else {
        previousState.user.favorites.push(action.data);
        previousState = fromJS(previousState);
        state.set('user', previousState);
      }
    default:
      return state;
  }
};
