/* @flow */

import type { Reducer } from 'redux';
import type { AppAction } from '../actions';
import type { CreatorState } from './creator';
import type { ItemsState } from './items';
import type { SettingsState } from './settings';

import { combineReducers } from 'redux';

import creator from './creator';
import items from './items';
import settings from './settings';

export type AppState = {
  creator: CreatorState,
  items: ItemsState,
  settings: SettingsState,
};

const reducer: Reducer<AppState, AppAction> = combineReducers({
  creator,
  items,
  settings,
});

export default reducer;
