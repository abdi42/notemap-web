import React, { Component } from 'react';
import '../App.css';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import 'font-awesome/css/font-awesome.min.css';

class Note extends React.Component  {


  constructor(props) {
    super(props);

    this.textContainer = React.createRef();
    this.noteElement = React.createRef();
    this.state = {
      x:0,
      y:0,
      editable: true,
      noteStyles:{
        position:"absolute",
        top:0,
        left:0
      }
    }
  }


  componentDidMount(){
    var {note} = this.props;
    var width = this.noteElement.current.offsetWidth;
    var height = this.noteElement.current.offsetHeight;

    var posX = note.x - (width / 2);
    var posY = note.y - (height / 2);
    const {offsetLeft,offsetWidth,offsetTop,offsetHeight} = this.noteElement.current;

    note.setTarget({
      offsetTop,
      offsetWidth,
      offsetLeft,
      offsetHeight
    })
    
    this.setState({noteStyles:{
      x:posX,
      y:posY,
      position:"absolute",
      top:posY,
      left:posX
    }})

    //this.props.didMount(this.noteElement.current)
  }

  componentDidUpdate(){
    //const noteModel = new NoteModel(this.state.x,this.state.y);
    //noteModel.setCenter(this.noteElement.current)

    //this.props.didMount(noteModel);
  }


  handleStart(){
    this.setState({editable:false,classes:"noselect"})
    this.textContainer.current.blur()
  }

  handleStop(){
    this.setState({editable:true,classes:""})
    this.textContainer.current.focus()
  }

  handleDrag(){
    this.textContainer.current.blur()
  }

  onMouseUp(e: MouseEvent) {
    this.state.editable = true
  }

  render() {
    return (
      <Draggable
        handle=".note"
        onStart={this.handleStart.bind(this)}
        onDrag={this.handleDrag.bind(this)}
        onStop={this.handleStop.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        enableUserSelectHack={false}>
        <div ref={this.noteElement} style={this.state.noteStyles} className="note">
          <div className={this.state.classes} contentEditable={this.state.editable} ref={this.textContainer}></div>
        </div>
      </Draggable>
    )
  }
}

export default Note;
