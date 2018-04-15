import React from 'react';
import ReactDOM from 'react-dom';

require('./styles/index.scss');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="content">
        <h1>Index</h1>
      </div>
    );
  }
}

ReactDOM.render((
  <Index />
), document.getElementById('root'));