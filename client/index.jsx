import React from 'react';
import ReactDOM from 'react-dom';
import Block from './components/Block.jsx';

require('./styles/index.scss');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "base",
        children: [
          {
            type: "bullet",
            text: "Douglas Englebart"
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
                    text: "Dynabook"
                  },
                  {
                    type: "bullet",
                    text: "Smalltalk"
                  }
                ]
              },
              {
                type: "bullet",
                text: "Viewpoints"
              }
            ]
          },
          {
            type: "bullet",
            text: "Bret Victor"
          }
        ]
      }
    }
  }

  render() {
    return (
      <div className="content">
        <h1>Index</h1>

        <Block data={this.state.data}/>
      </div>
    );
  }
}

ReactDOM.render((
  <Index />
), document.getElementById('root'));