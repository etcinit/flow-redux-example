/* @flow */

import type { Reducer } from 'redux';
import type { AppAction } from '../actions';
import type { CreatorState } from './creator';
import type { ItemsState } from './items';

import { combineReducers } from 'redux';

import creator from './creator';
import items from './items';

export type AppState = {
  creator: CreatorState,
  items: ItemsState,
};

const reducer: Reducer<AppState, AppAction> = combineReducers({
  creator,
  items,
});

export default reducer;
