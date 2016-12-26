/* @flow */

import React from 'react';
import { shallow } from 'enzyme';
import { IconMenu, MenuItem, TextField } from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';

import { Creator } from './Creator';

it('should clear content if enter key is pressed', () => {
  const updateContent = jest.fn();

  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={ updateContent }
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  wrapper.find(TextField).simulate('keyPress', {
    target: document.createElement('input'),
    key: 'Enter',
  });

  expect(updateContent).toBeCalledWith('');
});

it('should update content on change', () => {
  const updateContent = jest.fn();

  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={ updateContent }
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  const input = document.createElement('input');

  input.value = 'amazing';

  wrapper.find(TextField).simulate('change', {
    target: input,
  });

  expect(updateContent).toBeCalledWith('amazing');
});

it('should handle clear all menu item', () => {
  const clearAll = jest.fn();

  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={ jest.fn() }
      addItem={jest.fn()}
      clearAll={ clearAll }
      setDoneVisibility={jest.fn()}
    />
  );

  wrapper
    .find(IconMenu)
    .simulate('itemTouchTap', {}, <MenuItem key="clearAll"/>);

  expect(clearAll).toBeCalled();
});

it('should handle toggle visibility menu item', () => {
  const setDoneVisibility = jest.fn();

  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={ jest.fn() }
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={ setDoneVisibility }
    />
  );

  wrapper
    .find(IconMenu)
    .simulate('itemTouchTap', {}, <MenuItem key="setDoneVisibility"/>);

  expect(setDoneVisibility).toBeCalledWith(true);
});

it('should handle other menu items', () => {
  const setDoneVisibility = jest.fn();

  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={ jest.fn() }
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  wrapper
    .find(IconMenu)
    .simulate('itemTouchTap', {}, <MenuItem key="unknown"/>);
});

it('should not display a check icon when done are hidden', () => {
  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: false }}
      updateContent={jest.fn()}
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  expect(wrapper.contains(
    <MenuItem
      key="setDoneVisibility"
      primaryText="Show completed tasks"
      insetChildren={true}/>
  )).toBeTruthy();
});

it('should display a check icon when done are visible', () => {
  const wrapper = shallow(
    <Creator
      creator={{ content: '' }}
      settings={{ doneVisible: true }}
      updateContent={jest.fn()}
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  expect(wrapper.contains(
    <MenuItem
      key="setDoneVisibility"
      primaryText="Show completed tasks"
      leftIcon={<Done/>}/>
  )).toBeTruthy();
});

it('should display the content value from the store', () => {
  const wrapper = shallow(
    <Creator
      creator={{ content: 'my awesome content' }}
      settings={{ doneVisible: true }}
      updateContent={jest.fn()}
      addItem={jest.fn()}
      clearAll={jest.fn()}
      setDoneVisibility={jest.fn()}
    />
  );

  expect(wrapper.find('TextField').prop('value')).toEqual('my awesome content');
});
