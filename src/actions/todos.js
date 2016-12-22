/* @flow */

import uuid from 'uuid/v4';
import moment from 'moment';

export type AddItemAction = {
  type: 'ADD_ITEM',
  id: string,
  content: string,
  createdAt: moment$Moment,
};

export type RemoveItemAction = {
  type: 'REMOVE_ITEM',
  id: string,
};

export type ToggleItemAction = {
  type: 'TOGGLE_ITEM',
  id: string,
  toggledAt: moment$Moment,
};

export type BeginEditItemAction = {
  type: 'BEGIN_EDIT_ITEM',
  id: string,
};

export type EndEditItemAction = {
  type: 'END_EDIT_ITEM',
  id: string,
};

export type EditItemAction = {
  type: 'EDIT_ITEM',
  id: string,
  content: string,
};

export type ToDoAction
  = AddItemAction
  | RemoveItemAction
  | ToggleItemAction
  | BeginEditItemAction
  | EndEditItemAction
  | EditItemAction;

export function addItem(content: string): AddItemAction {
  return {
    type: 'ADD_ITEM',
    id: uuid(),
    content,
    createdAt: moment(),
  };
}

export function removeItem(id: string): RemoveItemAction {
  return {
    type: 'REMOVE_ITEM',
    id,
  };
}

export function toggleItem(id: string): ToggleItemAction {
  return {
    type: 'TOGGLE_ITEM',
    id,
    toggledAt: moment(),
  };
}

export function beginEditItem(id: string): BeginEditItemAction {
  return {
    type: 'BEGIN_EDIT_ITEM',
    id,
  };
}

export function endEditItem(id: string): EndEditItemAction {
  return {
    type: 'END_EDIT_ITEM',
    id,
  };
}

export function editItem(id: string, content: string): EditItemAction {
  return {
    type: 'EDIT_ITEM',
    id,
    content,
  };
}
