import React from 'react';
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ContentEditable from './ContentEditable.jsx'
import Dropzone from './Dropzone.jsx'
import DragHandler from './DragHandler.jsx'

require('../styles/index.scss');

export default class Block extends React.Component {
  

  /* STATIC METHODS */

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      dragging: nextProps.parentBeingDragged || prevState.beingDragged
    }
  }

  
  /* CONSTRUCTOR */

  constructor(props) {
    super(props);

    this.state = {
      canDrag: false,
      beingDragged: false
    }

    this.updateData = this.updateData.bind(this);
    this.startDrag =  this.startDrag.bind(this);
    this.stopDrag =   this.stopDrag.bind(this);
    this.updateDrag = this.updateDrag.bind(this)
    this.onAppendChild = this.onAppendChild.bind(this)
    this.onAppendAfter = this.onAppendAfter.bind(this)
    this.appendAfter = this.appendAfter.bind(this)
  }


  /* RECURSIVE METHODS */

  updateData(newChildData, childIndex, shouldDelete) {
    var newData = Object.assign({}, this.props.data);
    newData.children[childIndex] = newChildData;
    this.props.updateData(newData, this.props.index, shouldDelete);
  }

  updateDrag(dragging, dragObject, idPath) {
    this.props.updateDrag(dragging, dragObject, dragging ? idPath.concat(this.props.data.id) : null);
  }

  /*
    - Takes an index which the dragObject should be appended after
    - Calls this.props.updateData to initialize a chain update all the
      way to the top.
  */
  appendAfter(id) {
    var newData = Object.assign({}, this.props.data);
    var index = _.findIndex(newData.children, function(o) {
      return o.id === id;
    });
    newData.children.splice(index + 1, 0, this.props.dragObject);
    this.props.updateData(newData, this.props.index, true);
  }


  /* SET METHODS */

  onAppendAfter() {
    this.props.appendAfter(this.props.data.id);
  }

  onAppendChild() {
    var newData = Object.assign({}, this.props.data);
    newData.children.unshift(this.props.dragObject);
    this.props.updateData(newData, this.props.index, true);
  }


  /* GET METHODS */

  /*
    - Helper function to determine if  either this block is
      being dragged or a child of a parent being dragged.
    - Returns true or false
  */
  isBeingDragged() {
    return this.state.beingDragged || this.props.parentBeingDragged;
  }


  /*.EVENT METHODS */

  /*
    - Fired when this block's content is changed. Clones this block's
      data and then updates the text.
    - Calls this.props.updateData to initialize a chain update all the
      way to the top.
  */
  onContentChange(e) {
    var newData = Object.assign({}, this.props.data);
    newData.text = e.target["innerText"];
    this.props.updateData(newData, this.props.index, false);
  }

  startDrag(e) {
    e.stopPropagation();
    this.setState({ beingDragged: true });
    this.props.updateDrag(true, Object.assign({}, this.props.data), [this.props.data.id]);
  }

  stopDrag(e) {
    console.log("stopped dragging");
    e.stopPropagation();
    this.setState({ beingDragged: false });
    this.props.updateDrag(false, null);
  }

  enableDrag() {
    this.setState({ canDrag: true });
  }

  disableDrag() {
    this.setState({ canDrag: false });
  }

  renderBlockContent() {
    if (this.props.data.type === "bullet") {
      return (
        <div className="block-content">
          <ContentEditable
            onContentChange={this.onContentChange.bind(this)}
            text={this.props.data.text}
          />
          <div className="block-actions">
            <DragHandler
              enableDrag={this.enableDrag.bind(this)}
              disableDrag={this.disableDrag.bind(this)}
            />
          </div>
        </div>
      );
    }
  }

  renderLeftPad() {
    if (this.props.data.type !== "page") {
      //TODO on dropped in this dropzone it should append the dragged block after this block
      return (
        <div className="pad-left">
          <Dropzone
            active={!this.props.parentBeingDragged && this.props.dragging}
            handleDrop={this.onAppendAfter}
          />
        </div>
      );
    }
  }

  renderChildren() {
    if (this.props.data.children) {
      return this.props.data.children.map((blockData, i) => {
        return (
          <Block
            key={i}
            index={i}
            data={blockData}
            updateData={this.updateData}
            updateDrag={this.updateDrag}
            dragging={this.props.dragging}
            dragObject={this.props.dragObject}
            dragObjectPath={this.props.dragObjectPath}
            parentBeingDragged={this.isBeingDragged()}
            appendAfter={this.appendAfter}
          />
        );
      })
    }
  }

  render() {
    return (
      <div
        className="block"
        draggable={this.state.canDrag ? true : false}
        onDragStart={this.startDrag}
        onDragEnd={this.stopDrag}
      >
        {this.renderBlockContent()}
        <div className="block-children-container">
          {this.renderLeftPad()}
          <div className="block-children">
            <Dropzone
              active={this.props.dragging && !this.isBeingDragged()}
              handleDrop={this.onAppendChild}
            />
            {this.renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}