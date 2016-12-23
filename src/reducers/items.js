/* @flow */

import type { AppAction } from '../actions';

import { Map } from 'immutable';

export type Item = {
  content: string,
  createdAt: moment$Moment,
  toggledAt: moment$Moment,
  done: boolean,
  editing: boolean,
};

export type ItemsState = Map<string, Item>;

const reducer = (
  state: ItemsState = Map(),
  action: AppAction
): ItemsState => {
  let item: ?Item = null;

  switch (action.type) {
    case 'ADD_ITEM':
      return state.set(action.id, {
          content: action.content,
          createdAt: action.createdAt,
          toggledAt: action.createdAt,
          done: false,
          editing: false,
      });
    case 'REMOVE_ITEM':
      return state.remove(action.id);
    case 'TOGGLE_ITEM':
      item = state.get(action.id);

      if (item) {
        return state.set(action.id, {
          ...item,
          done: !item.done,
          toggledAt: action.toggledAt,
        });
      }

      return state;
    case 'BEGIN_EDIT_ITEM':
      item = state.get(action.id);

      if (item) {
        return state.set(action.id, {
          ...item,
          editing: true,
        });
      }

      return state;
    case 'END_EDIT_ITEM':
      item = state.get(action.id);

      console.log(item);
      if (item) {
        return state.set(action.id, {
          ...item,
          editing: false,
        });
      }

      return state;
    case 'EDIT_ITEM':
      item = state.get(action.id);

      if (item) {
        return state.set(action.id, {
          ...item,
          content: action.content,
        });
      }

      return state;
    case 'CLEAR_ALL':
      return Map();
    default:
      return state;
  }
}

export default reducer;
