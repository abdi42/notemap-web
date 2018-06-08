import React, { Component } from 'react';
import Note from "./Note"
import  NoteStore  from '../stores/Note.js';
import { observer, inject } from "mobx-react";
import { onPatch } from 'mobx-state-tree';

@observer class Cluster extends React.Component  {

  constructor(props){
    super(props)

    this.noteStore = NoteStore;
    this.clusterElement = React.createRef();
    this.state = {

    }

    this.updateCluster = this.updateCluster.bind(this);

    onPatch(NoteStore.notes, patch => {
      this.updateCluster()
    })
  }

  renderNotes(){
    return(
      this.noteStore.notes.slice().map((note,index) => {
        return (
          <Note key={index} note={note}  ></Note>
        )
      })
    )
  }

  updateCluster(){
    const numberPoints = this.noteStore.notes.slice().length;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalX = this.noteStore.notes.slice().map(note => note.center.x).reduce(reducer);
    const totalY = this.noteStore.notes.slice().map(note => note.center.y).reduce(reducer);
    const avgX = totalX / numberPoints;
    const avgY = totalY / numberPoints;

    var bounds = this.clusterElement.current.getBoundingClientRect();

    const currentCenter = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2
    }



    this.clusterElement.current.style.transformOrigin
    const distances = this.noteStore.notes.slice().map(note => note.distanceFrom(currentCenter));
    const sizeForNotes = Math.max(...distances) * 2.5;

    this.setState({styles:{
      position:"absolute",
      width:(sizeForNotes) + 200,
      height:(sizeForNotes) + 200,
      top:(avgY -  (sizeForNotes/2)) - 100,
      left:(avgX - (sizeForNotes/2)) - 100,
    }})
  }

  render() {
    return (
      <div>
        <div className="clust circleBase" style={this.state.styles} ref={this.clusterElement}>
        </div>
        {this.renderNotes()}
      </div>
    )
  }
}

export default Cluster;
