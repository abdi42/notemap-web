import { types } from 'mobx-state-tree';

const Center = types.model({
  offsetLeft: types.number,
  offsetWidth: types.number,
  offsetTop: types.number,
  offsetHeight: types.number
})

const NoteModel = types.model({
  x : types.number,
  y : types.number,
  target:types.maybe(Center)
})
.views(self => ({
  get center() {
    return {
      x: self.target.offsetLeft + self.target.offsetWidth / 2,
      y: self.target.offsetTop + self.target.offsetHeight / 2
    }
  }
}))
.actions(self => ({
  setTarget(target){
    self.target = target
  },
  distanceFrom(pos){
    let xDist = (self.x - pos.x);
    let yDist = (self.y - pos.y);

    let distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return distance
  }
}))

export default NoteModel

// export default class NoteModel {
//
//   constructor(xPos,yPos){
//     this.x = xPos;
//     this.y = yPos;
//   }
//
//   setCenter(target){
//   }
//
//   distanceFrom(pos){
//     let xDist = (this.x - pos.x);
//     let yDist = (this.y - pos.y);
//
//     let distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
//     return distance
//   }
//
// }
