/* @flow */

import type { AppAction } from '../actions';

export type SettingsState = {
  doneVisible: boolean,
};

const initialState = { doneVisible: true };

const reducer = (
  state: SettingsState = initialState,
  action: AppAction,
): SettingsState => {
  switch (action.type) {
    case 'SET_DONE_VISIBILITY':
      return {
        ...state,
        doneVisible: action.visible,
      };
    default:
      return state;
  }
};

export default reducer;
