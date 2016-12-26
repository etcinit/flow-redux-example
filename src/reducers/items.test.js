/* @flow */

import { Map } from 'immutable';
import moment from 'moment';

import reducer from './items';

it('should return the same state on an unknown action', () => {
  expect(reducer(Map(), { type: 'DUMMY' }))
    .toEqual(Map());
});

it('should add an item on ADD_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map(),
    {
      type: 'ADD_ITEM',
      content: 'some content',
      id: 'someId',
      createdAt: now,
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: false,
      },
    }));
});

it('should remove an item on REMOVE_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: false,
      },
    }),
    {
      type: 'REMOVE_ITEM',
      id: 'someId',
    }
  ))
    .toEqual(Map());
});

it('should toggle an item on TOGGLE_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: moment().subtract(10, 'days'),
        done: false,
        editing: false,
      },
    }),
    {
      type: 'TOGGLE_ITEM',
      id: 'someId',
      toggledAt: now,
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: true,
        editing: false,
      },
    }));
});

it('should not toggle an item on TOGGLE_ITEM and invalid ID', () => {
  const now = moment();
  const aWhileAgo = moment().subtract(10, 'days');

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: aWhileAgo,
        done: false,
        editing: false,
      },
    }),
    {
      type: 'TOGGLE_ITEM',
      id: 'someOtherId',
      toggledAt: now,
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: aWhileAgo,
        done: false,
        editing: false,
      },
    }));
});

it('should mark an item as editing on BEGIN_EDIT_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: false,
      },
    }),
    {
      type: 'BEGIN_EDIT_ITEM',
      id: 'someId',
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: true,
      },
    }));
});

it('should not mark an item on BEGIN_EDIT_ITEM and invalid ID', () => {
  const now = moment();

  expect(reducer(
    Map(),
    {
      type: 'BEGIN_EDIT_ITEM',
      id: 'someId',
    }
  ))
    .toEqual(Map());
});

it('should mark an item as editing on END_EDIT_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: true,
      },
    }),
    {
      type: 'END_EDIT_ITEM',
      id: 'someId',
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: false,
      },
    }));
});

it('should not mark an item on END_EDIT_ITEM and invalid ID', () => {
  const now = moment();

  expect(reducer(
    Map(),
    {
      type: 'END_EDIT_ITEM',
      id: 'someId',
    }
  ))
    .toEqual(Map());
});

it('should update an item on EDIT_ITEM', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: true,
      },
    }),
    {
      type: 'EDIT_ITEM',
      id: 'someId',
      content: 'some fresh new content',
    }
  ))
    .toEqual(Map({
      someId: {
        content: 'some fresh new content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: true,
      },
    }));
});

it('should not update an item on EDIT_ITEM and invalid ID', () => {
  const now = moment();

  expect(reducer(
    Map(),
    {
      type: 'EDIT_ITEM',
      id: 'someId',
      content: 'some fresh new content',
    }
  ))
    .toEqual(Map());
});

it('should remove all on CLEAR_ALL', () => {
  const now = moment();

  expect(reducer(
    Map({
      someId: {
        content: 'some content',
        createdAt: now,
        toggledAt: now,
        done: false,
        editing: true,
      },
    }),
    {
      type: 'CLEAR_ALL',
    }
  ))
    .toEqual(Map());
});
