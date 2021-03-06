/* @flow */

import type { AppState } from '../reducers';
import type { ItemsState } from '../reducers/items';
import type { SettingsState } from '../reducers/settings';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import ToDoListItem from './ToDoListItem';

export class ToDoList extends Component {
  props: {
    items: ItemsState,
    settings: SettingsState,
  }

  render() {
    const [pendingItems, doneItems] = this.props.items.reduce(
      ([pendingItems, doneItems], item, id) => {
        if (item.done) {
          return [pendingItems, doneItems.set(id, item)];
        }

        return [pendingItems.set(id, item), doneItems];
      },
      [Map(), Map()]
    );

    const pendingElements = pendingItems
      .map((item, id) => <ToDoListItem key={id} id={id} item={item}/>)
      .toArray();
    const doneElements = doneItems
      .map((item, id) => <ToDoListItem key={id} id={id} item={item}/>)
      .toArray();

    const hasPending = pendingElements.length !== 0;
    const hasDone = doneElements.length !== 0;

    if ((!hasPending && !hasDone)
      || (!hasPending && !this.props.settings.doneVisible)
    ) {
      const doneText = hasDone
        ? ` There are ${doneElements.length} completed tasks.`
        : null;

      return (
        <div className="ToDoList-container empty">
          <p>
            <b>Nothing here yet</b>
            <br/>
            <small>Add an item to begin.{doneText}</small>
          </p>
        </div>
      );
    }

    return (
      <div>
        {
          hasPending
            ? <div className="ToDoList-container">{pendingElements}</div>
            : null
        }
        {
          hasDone && this.props.settings.doneVisible
            ? <div className="ToDoList-container">{doneElements}</div>
            : null
        }
      </div>
    )
  }
}

export default connect(
  ({ items, settings }: AppState) => ({ items, settings }),
)(ToDoList);
