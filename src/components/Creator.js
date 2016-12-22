/* @flow */

import type { AppState } from '../reducers';
import type { CreatorState } from '../reducers/creator';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, IconButton } from 'material-ui';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import { Row, Column } from 'react-cellblock';

import { updateContent } from '../actions/creator';
import { addItem } from '../actions/todos';

export class Creator extends Component {
  props: {
    creator: CreatorState,

    updateContent: typeof updateContent,
    addItem: typeof addItem,
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
          <IconButton>
            <FilterList/>
          </IconButton>
        </Column>
      </Row>
    );
  }
}

export default connect(
  ({ creator }: AppState) => ({ creator }),
  { updateContent, addItem }
)(Creator);
