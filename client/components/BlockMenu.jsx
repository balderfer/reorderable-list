import React from 'react';
import BlockMenuItem from './BlockMenuItem.jsx'

export default class BlockMenu extends React.Component {
  render() {
    return (
      <div>
        <div className="block-options-menu" style={{ left: this.props.x, top: this.props.y }}>
          <BlockMenuItem labelText="No Color" color="" changeColor={this.props.changeColor} />
          <BlockMenuItem labelText="Blue Background" color="blue" changeColor={this.props.changeColor} />
          <BlockMenuItem labelText="Red Background" color="red" changeColor={this.props.changeColor} />
          <BlockMenuItem labelText="Yellow Background" color="yellow" changeColor={this.props.changeColor} />
        </div>
        <div className="menu-screen-cover" onClick={this.props.closeMenu} />
      </div>
    );
  }
}