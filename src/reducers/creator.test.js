/* @flow */

import reducer from './creator';

it('should return the same state on an unknown action', () => {
  expect(reducer({ content: 'initial' }, { type: 'DUMMY' }))
    .toEqual({ content: 'initial' });
});

it('should set the content on UPDATE_CONTENT', () => {
  expect(reducer(
    { content: 'initial' },
    {
      type: 'UPDATE_CONTENT',
      content: 'new content',
    }
  ))
    .toEqual({ content: 'new content' });
});
