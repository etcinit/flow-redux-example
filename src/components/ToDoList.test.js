/* @flow */

import type { Item } from '../reducers/items';

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import moment from 'moment';

import { ToDoList } from './ToDoList';

it('should show a message when there are no tasks', () => {
  const wrapper = shallow(
    <ToDoList items={ Map() } settings={ { doneVisible: true } }/>
  );

  expect(wrapper.find('small').text()).toEqual('Add an item to begin.');
});

it('should show a message when there are no tasks and hidden done', () => {
  const itemBody: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: true,
    editing: false,
  };

  const items: Map<string, Item> = Map()
    .set('firstItem', itemBody)
    .set('secondItem', itemBody);

  const wrapper = shallow(
    <ToDoList items={ items } settings={ { doneVisible: false } }/>
  );

  expect(wrapper.find('small').text())
    .toEqual('Add an item to begin. There are 2 completed tasks.');
});

it('should only render pending tasks if done are hidden', () => {
  const doneItem: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: true,
    editing: false,
  };
  const pendingItem: Item = {
    ...doneItem,
    done: false,
  };

  const items: Map<string, Item> = Map()
    .set('firstItem', doneItem)
    .set('secondItem', pendingItem);

  const wrapper = shallow(
    <ToDoList items={ items } settings={ { doneVisible: false } }/>
  );

  expect(wrapper.find({ item: pendingItem }).exists()).toBeTruthy();
});

it('should render all tasks if done are visible', () => {
  const doneItem: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: true,
    editing: false,
  };
  const pendingItem: Item = {
    ...doneItem,
    done: false,
  };

  const items: Map<string, Item> = Map()
    .set('firstItem', doneItem)
    .set('secondItem', pendingItem);

  const wrapper = shallow(
    <ToDoList items={ items } settings={ { doneVisible: true } }/>
  );

  expect(wrapper.find({ item: pendingItem }).exists()).toBeTruthy();
  expect(wrapper.find({ item: doneItem }).exists()).toBeTruthy();
});

it('should still render tasks when all are done', () => {
  const doneItem: Item = {
    content: 'some content',
    createdAt: moment(),
    toggledAt: moment(),
    done: true,
    editing: false,
  };
  const doneItem2: Item = {
    ...doneItem,
    content: 'some other content',
  };

  const items: Map<string, Item> = Map()
    .set('firstItem', doneItem)
    .set('secondItem', doneItem2);

  const wrapper = shallow(
    <ToDoList items={ items } settings={ { doneVisible: true } }/>
  );

  expect(wrapper.find({ item: doneItem }).exists()).toBeTruthy();
  expect(wrapper.find({ item: doneItem2 }).exists()).toBeTruthy();
});
