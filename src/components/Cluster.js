import React, { Component } from 'react';

class Note extends React.Component  {

  element: HTMLElement;
  textContainer: HTMLElement;

  constructor(props) {
    super(props);
    this.state = {
      editable: true
    }
  }

  handleStart(){

  }

  handleStop(){

  }

  handleDrag(){

  }

  render() {
    return (
      <div className="clust">
      </div>
    )
  }
}

export default Note;
