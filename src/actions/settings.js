/* @flow */

export type SetDoneVisibilityAction = {
  type: 'SET_DONE_VISIBILITY',
  visible: boolean,
};

export type SettingsAction = SetDoneVisibilityAction;

export function setDoneVisibility(visible: boolean): SetDoneVisibilityAction {
  return {
    type: 'SET_DONE_VISIBILITY',
    visible,
  };
}

