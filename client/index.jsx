import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Block from './components/Block.jsx';
const uuid = require('uuid/v1');

require('./styles/index.scss');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dragObject: null,
      dragObjectPath: null,
      data: {
        type: "page",
        id: uuid(),
        children: [
          {
            type: "bullet",
            id: uuid(),
            text: "Douglas Englebart",
            children: []
          },
          {
            type: "bullet",
            id: uuid(),
            text: "Alan Kay",
            children: [
              {
                type: "bullet",
                id: uuid(),
                text: "Xerox PARC",
                children: [
                  {
                    type: "bullet",
                    id: uuid(),
                    text: "Dynabook",
                    children: []
                  },
                  {
                    type: "bullet",
                    id: uuid(),
                    text: "Smalltalk",
                    children: []
                  }
                ]
              },
              {
                type: "bullet",
                id: uuid(),
                text: "Viewpoints",
                children: []
              }
            ]
          },
          {
            type: "bullet",
            id: uuid(),
            text: "Bret Victor",
            children: []
          }
        ]
      }
    }

    this.updateDrag = this.updateDrag.bind(this)
    this.updateData = this.updateData.bind(this)
  }

  // returns newData which has the block deleted.
  // takes data which is the scoped data for that level of the tree
  // takes path which is an array of indexes at which the block to be deleted is located
  // while there is more than one index left we 
  deleteBlock(data, dragObjectPath) {
    if (dragObjectPath.length > 1) {
      var id = dragObjectPath.pop();
      var index = _.findIndex(data.children, function(o) { return o.id === id });
      var newChildData = this.deleteBlock(data.children[index], dragObjectPath);
      var newData = Object.assign({}, data);
      newData.children[index] = newChildData;
      return newData;
    } else {
      var id = dragObjectPath.pop();
      var index = _.findIndex(data.children, function(o) { return o.id === id });
      var newData = Object.assign({}, data);
      newData.children.splice(index, 1);
      return newData;
    }

  }

  updateData(newData, index, shouldDelete) {
    if (shouldDelete) {
      var idPath = this.state.dragObjectPath;
      idPath.pop();
      newData = this.deleteBlock(newData, idPath);
    }

    this.setState({
      data: newData,
      dragging: this.state.dragging ? !shouldDelete : this.state.dragging
    });
  }

  updateDrag(newDragging, newDragObject, idPath) {
    console.log(newDragging);
    if (newDragging) newDragObject.id = uuid();
    this.setState({
      dragging: newDragging,
      dragObject: newDragObject,
      dragObjectPath: idPath
    });
  }

  render() {
    return (
      <div className="content">
        <h1>Index</h1>

        <Block
          key={0}
          index={0}
          level={-1}
          data={this.state.data}
          updateData={this.updateData}
          updateDrag={this.updateDrag}
          dragging={this.state.dragging}
          dragObject={this.state.dragObject}
          dragObjectPath={this.state.dragObjectPath}
          parentBeingDragged={false}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Index />
), document.getElementById('root'));