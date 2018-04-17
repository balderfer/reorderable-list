import React from 'react';
import ReactDOM from 'react-dom'
import ContentEditable from './ContentEditable.jsx'
import Dropzone from './Dropzone.jsx'

require('../styles/index.scss');

export default class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canDrag: false
    }
  }

  getClassName() {
    return this.props.data.type === "base" ? "block-children-container" : "block-children-container pad-left"
  }

  onContentChange(e) {
    var newData = Object.assign({}, this.props.data);
    newData.text = e.target["innerText"];
    this.props.updateData(newData, this.props.id);
  }

  updateData(newChildData, id) {
    var newData = Object.assign({}, this.props.data);
    newData.children[id] = newChildData;
    this.props.updateData(newData, this.props.id);
  }

  _startDrag() {
    console.log("start drag");
    this.setState({
      canDrag: true
    });
    this.props.updateDragging(true, this.props.data);
  }

  _stopDrag() {
    this.setState({
      canDrag: false
    });
    this.props.updateDragging(false, null);
  }

  _appendAfter() {
    console.log(`append after: ${this.props.data.text}`);
  }

  _appendFirstChild() {
    console.log(`append within: ${this.props.data.text}`);
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
    if (this.props.data.type !== "base") {
      //TODO on dropped in this dropzone it should append the dragged block after this block
      return (
        <div className="pad-left">
          <Dropzone isDragging={this.props.isDragging} handleDrop={this._appendAfter.bind(this)}/>
        </div>
      );
    }
  }

  renderChildren() {
    if (this.props.data.children) {
      return this.props.data.children.map((blockData, i) => <Block key={i} id={i} data={blockData} updateData={this.updateData.bind(this)} updateDragging={this.props.updateDragging} isDragging={this.props.isDragging}/>);
    }
  }

  render() {
    return (
      <div className="block" draggable={this.state.canDrag ? true : false}>
        {this.renderContent()}
        <div className="block-children-container">
          {this.renderLeftPad()}
          <div className="block-children">
            <Dropzone isDragging={this.props.isDragging} handleDrop={this._appendFirstChild.bind(this)}/>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}