/* @flow */

import type { Item } from '../reducers/items';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, IconButton, Popover, Menu, MenuItem, TextField } from 'material-ui';
import { Row, Column } from 'react-cellblock';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { removeItem, toggleItem, beginEditItem, endEditItem, editItem } from '../actions/todos';

type State = {
  hover: boolean,
  contextOpen: boolean,
  contextAnchor: ?EventTarget,
};

export class ToDoListItem extends Component {
  props: {
    id: string,

    item: Item,

    removeItem: typeof removeItem,
    toggleItem: typeof toggleItem,
    beginEditItem: typeof beginEditItem,
    endEditItem: typeof endEditItem,
    editItem: typeof editItem,
  }

  state: State = {
    hover: false,
    contextOpen: false,
    contextAnchor: null,
  }

  handleOnMouseEnter = () => this.setState({ hover: true });
  handleOnMouseLeave = () => this.setState({ hover: false });

  handleOnTouchTap = (event: SyntheticEvent) => {
    this.setState({
      contextOpen: true,
      contextAnchor: event.currentTarget,
    });
  };
  handleOnRequestClose = () => this.setState({ contextOpen: false, hover: true });
  handleOnItemTouchTap = (event: SyntheticEvent, item: MenuItem) => {
    this.setState({ contextOpen: false, hover: true });

    if (item.key === 'remove') {
      this.props.removeItem(this.props.id);
    } else if (item.key === 'edit') {
      this.props.beginEditItem(this.props.id);
    }
  };

  handleOnChange = (event: SyntheticEvent) => {
    if (event.target instanceof HTMLInputElement
      && this.props.item.content !== event.target.value
    ) {
      this.props.editItem(this.props.id, event.target.value);
    }
  };
  handleOnKeyPress = (event: SyntheticKeyboardEvent) => {
    if (event.key === 'Enter') {
      this.props.endEditItem(this.props.id);
    }
  };
  handleOnBlur = () => this.props.endEditItem(this.props.id);

  handleOnCheckChange = () => this.props.toggleItem(this.props.id);

  renderRemoveButton = (): ?React$Element<*> => {
    if (this.state.hover || this.state.contextOpen) {
      return (
        <IconButton onTouchTap={this.handleOnTouchTap}>
          <MoreVertIcon/>
        </IconButton>
      );
    }

    return null;
  }

  renderField = (): React$Element<*> | React$Element<*> => {
    if (this.props.item.editing) {
      return (
        <Column width="21/24">
          <TextField
            value={this.props.item.content}
            hintText="Item description"
            fullWidth={true}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}/>
        </Column>
      );
    }

    return (
      <Column width="21/24" className="ToDoListItem-field-container">
        <Checkbox label={this.props.item.content}
          checked={this.props.item.done}
          onCheck={this.handleOnCheckChange}/>
      </Column>
    )
  }

  render() {
    return (
      <div
        onMouseOver={ this.handleOnMouseEnter }
        onMouseLeave={ this.handleOnMouseLeave }>
        <Row>
          { this.renderField() }
          <Column width="3/24">
            { this.renderRemoveButton() }

            <Popover
              open={this.state.contextOpen}
              anchorEl={this.state.contextAnchor}
              onRequestClose={this.handleOnRequestClose}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}>
              <Menu onItemTouchTap={this.handleOnItemTouchTap}>
                <MenuItem primaryText="Edit" key="edit"/>
                <MenuItem primaryText="Remove" key="remove"/>
              </Menu>
            </Popover>
          </Column>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  { removeItem, toggleItem, beginEditItem, endEditItem, editItem },
)(ToDoListItem);
