import React, { Component } from 'react';
import '../App.css';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import 'font-awesome/css/font-awesome.min.css';

const map = document.getElementById('root')

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
    const {top,left,width,height} = this.noteElement.current.getBoundingClientRect();

    var posX = note.position.x - (width / 2);
    var posY = note.position.y - (height / 2);

    this.setState({noteStyles:{
      x:posX,
      y:posY,
      position:"absolute",
      top:posY,
      left:posX
    }})


    note.setTarget({top,left,width,height})
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

  handleDrag(e,ui){
    const {note} = this.props;
    const offset = getOffset(ui.node)
    const {top,left,width,height} = this.noteElement.current.getBoundingClientRect();

    console.log(note.center)
    note.setTarget({top,left,width,height})

    note.setPosition(ui.x,ui.y)
    this.textContainer.current.blur()
  }

  onMouseUp(e: MouseEvent) {
    this.state.editable = true
  }

  render() {
    return (
      <Draggable
        offsetParent={document.body}
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

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

export default Note;
