import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from './ContentEditable.jsx'

require('../styles/index.scss');

export default class Dropzone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropzone">

      </div>
    );
  }
}