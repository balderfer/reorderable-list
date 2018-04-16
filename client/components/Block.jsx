import React from 'react';
import ReactDOM from 'react-dom';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassName() {
    return this.props.data.type === "base" ? "block-children-container" : "block-children-container pad-left"
  }

  renderContent() {
    if (this.props.data.type === "bullet") {
      return <p>{this.props.data.text}</p>;
    }
  }

  renderChildren() {
    if (this.props.data.children) {
      return this.props.data.children.map((blockData, i) => <Block key={i} data={blockData}/>);
    }
  }

  render() {
    return (
      <div className="block">
        {this.renderContent()}
        <div className={this.getClassName()}>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}