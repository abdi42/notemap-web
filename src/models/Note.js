import { types,onPatch } from 'mobx-state-tree';

const Center = types.model({
  top: types.number,
  left: types.number,
  width: types.number,
  height: types.number
})

const Position = types.model({
  x : types.number,
  y : types.number,
})

const NoteModel = types.model({
  position:Position,
  target:Center
})
.views(self => ({
  get center() {
    return {
      x: self.target.left + self.target.width / 2,
      y: self.target.top + self.target.height / 2
    }
  }
}))
.actions(self => ({
  setTarget(target){
    self.target = target
  },
  setPosition(x,y){
    self.position = {x,y}
  },
  distanceFrom(pos){
    let xDist = (self.center.x - pos.x);
    let yDist = (self.center.y - pos.y);

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
