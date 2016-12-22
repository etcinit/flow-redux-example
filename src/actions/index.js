/* @flow */

import type { ToDoAction } from './todos';
import type { CreatorAction } from './creator';

export type AppAction = ToDoAction | CreatorAction;
