/* @flow */

import type { ToDoAction } from './todos';
import type { CreatorAction } from './creator';
import type { SettingsAction } from './settings';

type DummyAction = {
  type: 'DUMMY',
};

export type AppAction
  = ToDoAction
  | CreatorAction
  | SettingsAction
  | DummyAction;
