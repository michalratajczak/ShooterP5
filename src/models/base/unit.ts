import P5, { Vector } from "p5"

export interface IUnit {
  _p5: P5
  position: Vector
  size: number
  speed: number
  color: P5.Color

  move(v: Vector): void
  draw(p5: P5): void
}

export class Unit implements IUnit {
  _p5: P5
  position: Vector
  size: number
  speed: number
  color: P5.Color

  constructor(p5: P5, speed: number, size: number, position: Vector) {
    this._p5 = p5
    this.speed = speed
    this.size = size
    this.position = position
    this.color = p5.color(80)
  }

  move(v: Vector): void {
    this.position.add(v.mult(this.speed))
  }

  draw(): void {
    this._p5.strokeWeight(2)
    this._p5.fill(this.color)
    this._p5.circle(this.position.x, this.position.y, this.size)
  }
}