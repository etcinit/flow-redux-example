/* @flow */

import type { StoreEnhancer } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App, { getEnhancer } from './App';

beforeAll(() => {
  injectTapEventPlugin();
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App />, div);
});

describe('getEnhancer', () => {
  it('uses the devtools extension when available', () => {
    const dummyEnhancer: StoreEnhancer<any, any> = x => x;

    const mockedEnhancer = jest.fn(dummyEnhancer);

    window.__REDUX_DEVTOOLS_EXTENSION__ = mockedEnhancer;

    getEnhancer();

    expect(mockedEnhancer).toBeCalled();
  });
});
