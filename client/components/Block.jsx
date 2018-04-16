import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from './ContentEditable.jsx'

require('../styles/index.scss');

export default class Block extends React.Component {
  constructor(props) {
    super(props);
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

  renderChildren() {
    if (this.props.data.children) {
      return this.props.data.children.map((blockData, i) => <Block key={i} id={i} data={blockData} updateData={this.updateData.bind(this)}/>);
    }
  }

  render() {
    return (
      <div className="block">
        <div className="block-content">
          {this.renderContent()}
        </div>
        <div className={this.getClassName()}>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}