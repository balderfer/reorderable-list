import React from 'react';
import ReactDOM from 'react-dom';
import Block from './components/Block.jsx';

require('./styles/index.scss');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      draggingContent: null,
      path: null,
      data: {
        type: "base",
        children: [
          {
            type: "bullet",
            text: "Douglas Englebart",
            children: []
          },
          {
            type: "bullet",
            text: "Alan Kay",
            children: [
              {
                type: "bullet",
                text: "Xerox PARC",
                children: [
                  {
                    type: "bullet",
                    text: "Dynabook",
                    children: []
                  },
                  {
                    type: "bullet",
                    text: "Smalltalk",
                    children: []
                  }
                ]
              },
              {
                type: "bullet",
                text: "Viewpoints",
                children: []
              }
            ]
          },
          {
            type: "bullet",
            text: "Bret Victor",
            children: []
          }
        ]
      }
    }
  }

  // returns newData which has the block deleted.
  // takes data which is the scoped data for that level of the tree
  // takes path which is an array of indexes at which the block to be deleted is located
  // while there is more than one index left we 
  deleteBlock(data, path) {
    if (path.length > 1) {
      // pop and store the current index
      var index = path.pop();
      // recursively call deleteBlock with now popped path
      var newChildData = this.deleteBlock(data.children[index], path);
      var newData = Object.assign({}, data);
      newData.children[index] = newChildData;
      return newData;
    } else {
      console.log(data.children[path[0]]);
      var newData = Object.assign({}, data);
      newData.children.splice(path[0], 1);
      return newData;
    }

  }

  updateData(newData, id, shouldDelete) {
    if (shouldDelete) {
      console.log(`should delete ${this.state.path}`)
      var path = this.state.path;
      path.pop(); //ignoring the base container's index
      newData = this.deleteBlock(newData, path);
    }
    this.setState({
      data: newData
    });
  }

  updateDragging(newDragging, draggingContent, path) {
    console.log(path);
    this.setState({
      isDragging: newDragging,
      draggingContent: draggingContent,
      path: path
    });
  }

  render() {
    return (
      <div className="content">
        <h1>Index</h1>

        <Block
          key={0}
          id={0}
          data={this.state.data}
          updateData={this.updateData.bind(this)}
          isDragging={this.state.isDragging}
          updateDragging={this.updateDragging.bind(this)}
          draggingContent={this.state.draggingContent}
          parentIsDragging={false}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Index />
), document.getElementById('root'));