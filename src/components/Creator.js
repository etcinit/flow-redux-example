/* @flow */

import type { AppState } from '../reducers';
import type { CreatorState } from '../reducers/creator';
import type { SettingsState } from '../reducers/settings';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, IconButton, IconMenu, MenuItem, Divider } from 'material-ui';
import Settings from 'material-ui/svg-icons/action/settings';
import Done from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';
import { Row, Column } from 'react-cellblock';

import { updateContent } from '../actions/creator';
import { addItem, clearAll } from '../actions/todos';
import { setDoneVisibility } from '../actions/settings';

export class Creator extends Component {
  props: {
    creator: CreatorState,
    settings: SettingsState,

    updateContent: typeof updateContent,
    addItem: typeof addItem,
    clearAll: typeof clearAll,
    setDoneVisibility: typeof setDoneVisibility,
  }

  handleOnKeyPress = (event: SyntheticKeyboardEvent): void => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      this.props.addItem(this.props.creator.content);

      this.props.updateContent('');
    }
  }

  handleOnChange = (event: SyntheticEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      this.props.updateContent(event.target.value);
    }
  }

  handleOnItemTouchTap = (event: SyntheticEvent, item: MenuItem): void => {
    switch (item.key) {
      case 'setDoneVisibility':
        this.props.setDoneVisibility(!this.props.settings.doneVisible);

        break;
      case 'clearAll':
        this.props.clearAll();

        break;
      default:
        return;
    }
  }

  renderDoneVisibility = (): React$Element<*> | React$Element<*> => {
    if (this.props.settings.doneVisible) {
      return (
        <MenuItem
          key="setDoneVisibility"
          primaryText="Show completed tasks"
          leftIcon={<Done/>}/>
      );
    }

    return (
      <MenuItem
        key="setDoneVisibility"
        primaryText="Show completed tasks"
        insetChildren={true}/>
    );
  }

  render() {
    return (
      <Row className="Creator-container">
        <Column className="Creator-field-container" width="21/24">
          <TextField
            value={this.props.creator.content}
            hintText="Add new item"
            underlineShow={false}
            fullWidth={true}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}/>
        </Column>

        <Column className="Creator-button-container" width="3/24">
          <IconMenu
            onItemTouchTap={this.handleOnItemTouchTap}
            iconButtonElement={<IconButton><Settings/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}>
            {this.renderDoneVisibility()}
            <Divider/>
            <MenuItem
              key="clearAll"
              primaryText="Clear all"
              leftIcon={<Delete/>}/>
          </IconMenu>
        </Column>
      </Row>
    );
  }
}

export default connect(
  ({ creator, settings }: AppState) => ({ creator, settings }),
  { updateContent, addItem, clearAll, setDoneVisibility }
)(Creator);
