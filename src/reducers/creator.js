/* @flow */

import type { AppAction } from '../actions';

export type CreatorState = { content: string };

const initialState: CreatorState = {
  content: '',
};

const reducer = (
  state: CreatorState = initialState,
  action: AppAction
): CreatorState => {
  switch (action.type) {
    case 'UPDATE_CONTENT':
      return {
        ...state,
        content: action.content,
      };
    default:
      return state;
  }
}

export default reducer;
