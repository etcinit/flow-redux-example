/* @flow */

import { Map } from 'immutable';

import reducer from './index';

it('should have a default state', () => {
  const state = reducer(
    {
      creator: { content: 'meh' },
      items: Map(),
      settings: { doneVisible: false },
    },
    {type: 'DUMMY'}
  );

  ['creator', 'items', 'settings'].forEach(x => expect(state[x]).toBeDefined());
});
