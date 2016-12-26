/* @flow */

jest.mock('uuid');

import uuid from 'uuid';
import MockDate from 'mockdate';
import moment from 'moment';

import {
  addItem,
  removeItem,
  toggleItem,
  beginEditItem,
  endEditItem,
  editItem,
  clearAll,
} from './todos';

describe('addItem', () => {
  it('should create an action for adding an item to the list', () => {
    uuid.v4 = jest.fn(uuid.v4); // Mainly done to please Flow.

    uuid.v4.mockImplementationOnce(() => 'some uuid');
    MockDate.set('1/1/2000');

    expect(addItem('content'))
      .toEqual({
        type: 'ADD_ITEM',
        content: 'content',
        id: 'some uuid',
        createdAt: moment(),
      });
  });
});

describe('removeItem', () => {
  it('should create an action for removing an item from the list', () => {
    expect(removeItem('some uuid'))
      .toEqual({
        type: 'REMOVE_ITEM',
        id: 'some uuid',
      });
  });
});

describe('toggleItem', () => {
  it('should create an action for toggling a task as done', () => {
    MockDate.set('1/1/2000');

    expect(toggleItem('some uuid'))
      .toEqual({
        type: 'TOGGLE_ITEM',
        toggledAt: moment(),
        id: 'some uuid',
      });
  });
});

describe('beginEditItem', () => {
  it('should create an action for when we start editing an item', () => {
    expect(beginEditItem('some uuid'))
      .toEqual({
        type: 'BEGIN_EDIT_ITEM',
        id: 'some uuid',
      });
  });
});

describe('endEditItem', () => {
  it('should create an action for when we stop editing an item', () => {
    expect(endEditItem('some uuid'))
      .toEqual({
        type: 'END_EDIT_ITEM',
        id: 'some uuid',
      });
  });
});

describe('editItem', () => {
  it('should create an action for updating an item', () => {
    expect(editItem('some uuid', 'new content'))
      .toEqual({
        type: 'EDIT_ITEM',
        id: 'some uuid',
        content: 'new content',
      });
  });
});

describe('clearAll', () => {
  it('should create an action for clearing all tasks', () => {
    expect(clearAll())
      .toEqual({
        type: 'CLEAR_ALL',
      });
  });
});
