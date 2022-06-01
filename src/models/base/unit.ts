import P5, { Vector } from "p5"

export interface IUnit {
  _p5: P5
  position: Vector
  size: number
  speed: number
  color: P5.Color
  health: number
  maxHealth: number

  move(v: Vector): void
  draw(p5: P5): void
}

export class Unit implements IUnit {
  _p5: P5
  position: Vector
  size: number
  speed: number
  color: P5.Color
  health: number
  maxHealth: number

  constructor(p5: P5, speed: number, size: number, position: Vector, health: number) {
    this._p5 = p5
    this.speed = speed
    this.size = size
    this.position = position
    this.color = p5.color(80)
    this.health = health
    this.maxHealth = health
  }

  move(v: Vector): void {
    this.position.add(v.mult(this.speed))
  }

  draw(): void {
    //body
    this._p5.strokeWeight(2)
    this._p5.fill(this.color)
    this._p5.circle(this.position.x, this.position.y, this.size)

    //health
    this._p5.textSize(16)
    this._p5.fill(0)
    const healthText = Math.round(this.health / this.maxHealth * 100) + '%'
    this._p5.text(healthText, this.position.x - this._p5.textWidth(healthText) / 2, this.position.y + 7)
  }
}