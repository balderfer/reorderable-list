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

  onDragEnter(e) {
    this.setState({
      isHovered: true
    })
    this.props.hoverStart();
  }

  onDragLeave(e) {
    this.setState({
      isHovered: false
    })
    this.props.hoverEnd();
  }

  onDrop(e) {
    this.setState({
      isHovered: false
    })
    if (this.props.active) {
      this.props.hoverEnd();
      this.props.handleDrop();
    }
  }

  getWidthStyle() {
    return {
      width: 560 - (this.props.level * 40)
    }
  }

  renderLevelIndicators() {
    if (this.props.level > 0) {
      var levelIndicators = [];
      for (var i = 0; i < this.props.level; i++) {
        levelIndicators.push(<div key={i} className="dropzone-indicator-level"/>)
      }
      return levelIndicators;
    } else {
      <div />
    }
  }

  render() {
    return (
      <div
        className={`dropzone ${this.props.active ? 'active' : 'inactive'} ${this.state.isHovered ? 'hovered' : ''}`}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={this.onDragLeave.bind(this)}
        onDrop={this.onDrop.bind(this)}
      >
        <div className={`dropzone-area ${this.state.isHovered ? 'hover' : ''}`}/>
        <div className={`dropzone-indicator ${this.state.isHovered ? 'hover' : ''}`} style={this.getWidthStyle()}>
          <div className="dropzone-indicator-levels-container">
            {this.renderLevelIndicators()}
          </div>
        </div>
      </div>
    );
  }
}