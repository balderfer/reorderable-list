import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from './ContentEditable.jsx'

require('../styles/index.scss');

export default class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }

  _onDragEnter(e) {
    this.setState({
      isHovered: true
    })
  }

  _onDragLeave(e) {
    this.setState({
      isHovered: false
    })
  }

  _onDrop(e) {
    console.log("dropped!")
    this.setState({
      isHovered: false
    })
    if (this.props.active) {
      this.props.handleDrop();
    }
  }

  render() {
    return (
      <div
        className={`dropzone ${this.props.active ? 'active' : 'inactive'}`}
        onDragEnter={this._onDragEnter.bind(this)}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={this._onDragLeave.bind(this)}
        onDrop={this._onDrop.bind(this)}
      >
        <div className={`dropzone-area ${this.state.isHovered ? 'hover' : ''}`}/>
        <div className={`dropzone-indicator ${this.state.isHovered ? 'hover' : ''}`}/>
      </div>
    );
  }
}