import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Note from "./components/Note"
import { SyntheticEvent } from 'react'
import  NoteStore  from './stores/Note.js';
import { observer, inject } from "mobx-react";


@observer class App extends React.Component {

  map: HTMLElement;

  constructor(props){
    super(props)

    this.noteStore = NoteStore;
    this.mapElement = React.createRef();
    this.state = {
      notes:[],
      prevNote:null
    }

  }

  renderNotes(){
    return(
      this.noteStore.notes.slice().map((note,index) => {
        console.log(note,index)
        return (
          <Note key={index} note={note} ></Note>
        )
      })
    )
  }

  didMount(note){
    if(this.state.prevNote !== null){
      this.state.prevNote.distanceFrom({x:note.x,y:note.y})
    }

    this.setState({
      prevNote:note
    })
  }


  handleClick(e) {
    e.preventDefault();


    var note = this.noteStore.addNote({
      x:e.pageX,
      y:e.pageY,
    });

  }

  render() {
    return (
      <div className="App" ref={this.map} onDoubleClick={(e) => this.handleClick(e)}>
        {this.renderNotes()}
      </div>
    );
  }
}

export default App;
