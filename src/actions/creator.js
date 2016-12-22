/* @flow */

export type UpdateContentAction = {
  type: 'UPDATE_CONTENT',
  content: string,
}

export type CreatorAction = UpdateContentAction;

export function updateContent(content: string): UpdateContentAction {
  return {
    type: 'UPDATE_CONTENT',
    content,
  };
}
