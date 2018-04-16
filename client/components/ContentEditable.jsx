import React from 'react';
import ReactDOM from 'react-dom';

require('../styles/index.scss');

export default class Block extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== this.elem["innerText"];
  }

  render() {
    return (
      <div
        className="contentBlock"
        ref={(elem) => { this.elem = elem }}
        contentEditable="true"
        suppressContentEditableWarning
        onInput={this.props.onContentChange.bind(this)}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      ></div>
    );
  }
}