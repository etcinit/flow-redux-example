/* @flow */

import type { Item } from '../reducers/items';

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { Checkbox, TextField, IconButton, Menu, MenuItem, Popover } from 'material-ui';

import { ToDoListItem } from './ToDoListItem';

it('should default to rendering the task as text', () => {
  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  expect(wrapper.find({ checked: false, label: 'some content' }).exists())
    .toBeTruthy();
});

it('should default to rendering the task as text with a check if done', () => {
  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: true,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  expect(wrapper.find({ checked: true, label: 'some content' }).exists())
    .toBeTruthy();
});

it('should render a text field if editing', () => {
  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: true,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  expect(wrapper.find(TextField).exists())
    .toBeTruthy();
});

it('should render a menu button when hovering', () => {
  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  wrapper.simulate('mouseOver');

  expect(wrapper.state('hover')).toEqual(true);
  expect(wrapper.find(IconButton).key()).toEqual('menuButton');

  wrapper.simulate('mouseLeave');

  expect(wrapper.state('hover')).toEqual(false);
  expect(wrapper.find(IconButton).exists()).toEqual(false);
});

it('should dispatch a toggle action when clicked', () => {
  const toggleItem = jest.fn();

  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ toggleItem }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  wrapper.find(Checkbox).simulate('check');

  expect(toggleItem).toBeCalledWith('someId');
});

it('should stop editing if focus is lost', () => {
  const endEditItem = jest.fn();

  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: true,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ endEditItem }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  wrapper.find(TextField).simulate('blur');

  expect(endEditItem).toBeCalledWith('someId');
});

it('should stop editing if the enter key is pressed', () => {
  const endEditItem = jest.fn();

  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: true,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ endEditItem }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  wrapper.find(TextField).simulate('keyPress', { key: 'Enter' });

  expect(endEditItem).toBeCalledWith('someId');
});

it('should update the item if text changes', () => {
  const editItem = jest.fn();

  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: true,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ editItem }
      item={ item }
      id="someId"
    />
  );

  const input: HTMLInputElement = document.createElement('input');

  input.value = 'some new content';

  wrapper.find(TextField).simulate('change', { target: input });

  expect(editItem).toBeCalledWith('someId', 'some new content');
});

it('should handle menu item clicks', () => {
  const removeItem = jest.fn();
  const beginEditItem = jest.fn();

  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ removeItem }
      toggleItem={ jest.fn() }
      beginEditItem={ beginEditItem }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  wrapper.find(Menu).simulate('itemTouchTap', {}, <MenuItem key="remove"/>);
  wrapper.find(Menu).simulate('itemTouchTap', {}, <MenuItem key="edit"/>);

  expect(removeItem).toBeCalledWith('someId');
  expect(beginEditItem).toBeCalledWith('someId');
});

it('should handle menu item clicks', () => {
  const item: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: false,
    editing: false,
  };

  const wrapper = shallow(
    <ToDoListItem
      removeItem={ jest.fn() }
      toggleItem={ jest.fn() }
      beginEditItem={ jest.fn() }
      endEditItem={ jest.fn() }
      editItem={ jest.fn() }
      item={ item }
      id="someId"
    />
  );

  const currentTarget = document.createElement('button');

  wrapper.setState({ hover: true });
  wrapper.find(IconButton).simulate('touchTap', { currentTarget });

  expect(wrapper.state('contextOpen')).toEqual(true);
  expect(wrapper.state('contextAnchor')).toEqual(currentTarget);

  wrapper.find(Popover).simulate('requestClose');

  expect(wrapper.state('contextOpen')).toEqual(false);
});
