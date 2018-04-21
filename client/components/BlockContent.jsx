import React from 'react';
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ContentEditable from './ContentEditable.jsx'
import BlockMenu from './BlockMenu.jsx'

export default class Block extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      shouldShowMenu: false
    }

    this.onContextMenu = this.onContextMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  getClassName() {
    var className = "content-wrapper";
    if (this.props.type === "bullet") className += " bullet";
    if (this.props.color !== null) className += ` ${this.props.color}`;
    return className;
  }

  onContextMenu(e) {
    e.preventDefault();
    this.setState({
      mouseX: e.nativeEvent.offsetX,
      mouseY: e.nativeEvent.offsetY,
      shouldShowMenu: true
    });
  }

  closeMenu() {
    this.setState({
      shouldShowMenu: false
    })
  }

  changeColor(color) {
    this.props.changeColor(color);
    this.closeMenu();
  }

  renderBlockMenu() {
    if (this.state.shouldShowMenu) {
      return (
        <BlockMenu
          closeMenu={this.closeMenu}
          x={this.state.mouseX}
          y={this.state.mouseY}
          options={this.props.options}
          changeColor={this.changeColor}
        />
      );
    } else {
      return <div />
    }
  }

  render() {
    return (
      <div className={this.getClassName()}
        onContextMenu={this.onContextMenu}
      >
        <ContentEditable
          onContentChange={this.props.onContentChange}
          text={this.props.text}
        />
        {this.renderBlockMenu()}
      </div>
    );
  }
}