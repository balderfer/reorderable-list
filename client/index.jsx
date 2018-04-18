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
        type: "page",
        id: "1234",
        children: [
          {
            type: "bullet",
            id: "1235",
            text: "Douglas Englebart",
            children: []
          },
          {
            type: "bullet",
            id: "1236",
            text: "Alan Kay",
            children: [
              {
                type: "bullet",
                id: "1237",
                text: "Xerox PARC",
                children: [
                  {
                    type: "bullet",
                    id: "1238",
                    text: "Dynabook",
                    children: []
                  },
                  {
                    type: "bullet",
                    id: "1239",
                    text: "Smalltalk",
                    children: []
                  }
                ]
              },
              {
                type: "bullet",
                id: "1240",
                text: "Viewpoints",
                children: []
              }
            ]
          },
          {
            type: "bullet",
            id: "1241",
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
  deleteBlock(data, path, newBlockPath) {
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

  updateData(newData, id, shouldDelete, newBlockPath) {
    if (shouldDelete) {
    //   console.log(`should delete ${this.state.path}`);
    //   console.log(`block added at ${newBlockPath}`);
    //   var path = this.state.path;
    //   path.pop(); //ignoring the base container's index
    //   newBlockPath.pop();
    //   // newData = this.deleteBlock(newData, path, newBlockPath);
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
          addedAtPath={this.state.path}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Index />
), document.getElementById('root'));