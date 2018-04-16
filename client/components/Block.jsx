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
    console.log(e.target.innerHTML);

    // Attempts to get the caret position
    var caretOffset = 0;
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(e.target);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;

    newData.text = e.target["innerText"];
    this.props.updateData(newData, this.props.id);
  }

  updateData(newChildData, id) {
    var newData = Object.assign({}, this.props.data);
    newData.children[id] = newChildData;
    this.props.updateData(newData, this.props.id);
  }

  _startDrag() {
    this.setState({
      canDrag: true
    })
  }

  renderContent() {
    if (this.props.data.type === "bullet") {
      return (
        <ContentEditable
          onContentChange={this.onContentChange.bind(this)}
          text={this.props.data.text}
        />
      );
    }
  }

  renderLeftPad() {
    if (this.props.data.type !== "base") {
      //TODO on dropped in this dropzone it should append the dragged block after this block
      return (
        <div className="pad-left">
          <Dropzone />
        </div>
      );
    }
  }

  renderChildren() {
    if (this.props.data.children) {
      return this.props.data.children.map((blockData, i) => <Block key={i} id={i} data={blockData} updateData={this.updateData.bind(this)}/>);
    }
  }

  render() {
    return (
      <div className="block" draggable={this.state.canDrag ? true : false}>
        {this.renderContent()}
        <div className="block-children-container">
          {this.renderLeftPad()}
          <div className="block-children">
            {this.renderChildren()}
          </div>
        </div>
        <div className="block-actions">
          <div
            className="drag-handler"
            onMouseDown={this._startDrag.bind(this)}
          ></div>
        </div>
      </div>
    );
  }
}