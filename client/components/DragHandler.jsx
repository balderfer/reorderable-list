import React from 'react';

export default class Block extends React.Component {

  _onMouseEnter(e) {
    this.props.enableDrag();
  }

  _onMouseLeave(e) {
    this.props.disableDrag();
  }

  render() {
    return (
      <div
        className="drag-handler"
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}
      >
      </div>
    );
  }
}