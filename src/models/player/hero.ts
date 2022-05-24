import P5, { Vector } from "p5";
import { Unit } from "../base/unit";

export class Hero extends Unit {  
  constructor(p5: P5, speed: number, size: number, position: Vector) {
    super(p5, speed, size, position)
  }

  getMoveDirection(): Vector {
    const v = this._p5.createVector(0, 0)

    if(this._p5.keyIsDown(87)) // W
      v.y -= 1
    if(this._p5.keyIsDown(83)) // S
      v.y += 1
    if(this._p5.keyIsDown(65)) // A
      v.x -= 1
    if(this._p5.keyIsDown(68)) // D
      v.x += 1

    return v
  }
}