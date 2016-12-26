/* @flow */

import reducer from './settings';

it('should return the same state on an unknown action', () => {
  expect(reducer({ doneVisible: false }, { type: 'DUMMY' }))
    .toEqual({ doneVisible: false });
});

it('should set done visibility on SET_DONE_VISIBILITY', () => {
  expect(reducer(
    { doneVisible: false },
    {
      type: 'SET_DONE_VISIBILITY',
      visible: true,
    }
  ))
    .toEqual({ doneVisible: true });
});
