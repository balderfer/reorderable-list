import React from 'react';
import ReactDOM from 'react-dom'
import ContentEditable from './ContentEditable.jsx'
import Dropzone from './Dropzone.jsx'

require('../styles/index.scss');

export default class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canDrag: false,
      isBeingDragged: this.props.parentBeingDragged || false
    }
  }

  onContentChange(e) {
    var newData = Object.assign({}, this.props.data);
    newData.text = e.target["innerText"];
    this.props.updateData(newData, this.props.id, false, [this.props.id]);
  }

  updateData(newChildData, id, shouldDelete, newBlockPath) {
    var newData = Object.assign({}, this.props.data);

    if (newChildData !== null) {
      newData.children[id] = newChildData;
    } else {
      // console.log(newData.children.slice())
      // console.log(this.props.addedAtPath)
      console.log(newData.children)
      newData.children.splice(id, 1);
    }

    newBlockPath.push(this.props.id);
    this.props.updateData(newData, this.props.id, shouldDelete, newBlockPath);
  }

  handleAppendAfter(id) {
    var newData = Object.assign({}, this.props.data);
    newData.children.splice(id + 1, 0, this.props.draggingContent);
    this.props.updateData(newData, this.props.id, true, [id, this.props.id]);
  }

  updateDragging(newDragging, draggingContent, path) {
    path.push(this.props.data.id);
    this.props.updateDragging(newDragging, draggingContent, path);
  }

  _startDrag() {
    this.setState({
      canDrag: true,
      isBeingDragged: true
    });
    this.props.updateDragging(true, Object.assign({}, this.props.data), [this.props.data.id]);
  }

  _stopDrag() {
    this.setState({
      canDrag: false,
      isBeingDragged: false
    });
    this.props.updateDragging(false, null, [this.props.id]);
  }

  _appendAfter() {
    this.props.handleAppendAfter(this.props.id);
  }

  _appendFirstChild() {
    var newData = Object.assign({}, this.props.data);
    newData.children.unshift(this.props.draggingContent);
    this.props.updateData(newData, this.props.id, true, [0, this.props.id]);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isBeingDragged: nextProps.parentBeingDragged || prevState.isBeingDragged
    }
  }

  renderContent() {
    if (this.props.data.type === "bullet") {
      return (
        <div
          className="block-content"
          onDragStart={this._startDrag.bind(this)}
          onDragEnd={this._stopDrag.bind(this)}
        >
          <ContentEditable
            onContentChange={this.onContentChange.bind(this)}
            text={this.props.data.text}
          />
          <div className={`block-actions ${this.props.isDragging ? 'dragging' : ''}`}>
            <div className="drag-handler"></div>
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
            isDragging={this.props.isDragging}
            active={!this.props.parentBeingDragged}
            handleDrop={this._appendAfter.bind(this)}
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
            id={i}
            data={blockData}
            updateData={this.updateData.bind(this)}
            updateDragging={this.updateDragging.bind(this)}
            isDragging={this.props.isDragging}
            handleAppendAfter={this.handleAppendAfter.bind(this)}
            draggingContent={this.props.draggingContent}
            parentBeingDragged={this.state.isBeingDragged}
            addedAtPath={this.props.addedAtPath}
          />
        );
      })
    }
  }

  render() {
    return (
      <div className="block" draggable={this.state.canDrag ? true : false}>
        {this.renderContent()}
        <div className="block-children-container">
          {this.renderLeftPad()}
          <div className="block-children">
            <Dropzone
              isDragging={this.props.isDragging}
              active={!this.state.isBeingDragged}
              handleDrop={this._appendFirstChild.bind(this)}
            />
            {this.renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}