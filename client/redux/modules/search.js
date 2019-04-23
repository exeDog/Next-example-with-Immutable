import { Map } from 'immutable';

const FOUND = 'FOUND';
const NOTFOUND = 'NOT_FOUND';

export const searchActionCreator = data => (dispatch) => {
  fetch(`https://api.github.com/users/${data}/repos`)
    .then(response => response.json())
    .then((response) => {
      if (response.length > 0) {
        dispatch({ type: FOUND, response });
      }
    })
    .catch(() => dispatch({ type: NOTFOUND }));
};

const initialState = new Map({
  repos: [],
});


export default (state = initialState, action) => {
  const { response } = action;
  switch (action.type) {
    case FOUND:
      return state.set('repos', response);
    default:
      return state;
  }
};
