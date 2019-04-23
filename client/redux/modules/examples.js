import { Map } from 'immutable';

const TOGGLE = 'app/examples/TOGGLE';
const UNTOGGLE = 'app/examples/UNTOGGLE';

const initialState = new Map({
  toggled: false,
});

export default (
  state = initialState,
  action
) => {
  const { type } = action;
  switch (type) {
    case TOGGLE:
      return state.set('toggled', true);
    case UNTOGGLE:
      return state.set('toggled', false);
    default:
      return state;
  }
};

export const actions = {
  toggleState: () => (dispatch, getState) => {
    const toggled = getState().examples.get('toggled');
    dispatch({ type: toggled ? UNTOGGLE : TOGGLE });
  },
};
