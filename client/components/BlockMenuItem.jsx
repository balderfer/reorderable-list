import React from 'react';

export default class BlockMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeColor(this.props.color);
  }

  render() {
    return (
      <div className="block-options-menu-item" onClick={this.handleClick}>
        <div className={`preview ${this.props.color}`}>A</div>
        <div className="label">{this.props.labelText}</div>
      </div>
    );
  }
}