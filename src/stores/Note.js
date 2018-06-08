import { types } from 'mobx-state-tree';
import NoteModel from '../models/Note.js'

const NoteStore = types.model('NoteStore',{
  notes: types.array(NoteModel)
})
.actions(self => {
  return {
    addNote(note){
      self.notes.push(note);
    }
  }
})
.create({
  notes:[]
});
//
// onSnapshot(NoteStore, (snapshot) => {
//     console.dir(NoteStore.notes.splice())
// })

export default NoteStore;
