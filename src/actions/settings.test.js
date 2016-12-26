/* @flow */

import { setDoneVisibility } from './settings';

describe('setDoneVisibility', () => {
  it('should create an action for setting the done visibility', () => {
    expect(setDoneVisibility(true))
      .toEqual({
        type: 'SET_DONE_VISIBILITY',
        visible: true,
      });

    expect(setDoneVisibility(false))
      .toEqual({
        type: 'SET_DONE_VISIBILITY',
        visible: false,
      });
  })
});
