import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Note from "./components/Note"
import { SyntheticEvent } from 'react'
import  NoteStore  from './stores/Note.js';
import { observer, inject } from "mobx-react";
import Cluster from './components/Cluster';

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
        console.dir(this.mapElement)
        return (
          <Note key={index} note={note}  ></Note>
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
      position:{
        x:e.pageX,
        y:e.pageY,
      },
      target:{
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    });

  }

  render() {
    return (
      <div id="map" className="App" ref={this.mapElement} onDoubleClick={(e) => this.handleClick(e)}>
        <Cluster></Cluster>
      </div>
    );
  }
}

export default App;
