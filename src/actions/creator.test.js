/* @flow */

import { updateContent } from './creator';

describe('updateContent', () => {
  it('should create an action for updating the content', () => {
    expect(updateContent('my new content'))
      .toEqual({
        type: 'UPDATE_CONTENT',
        content: 'my new content',
      });
  });
});
