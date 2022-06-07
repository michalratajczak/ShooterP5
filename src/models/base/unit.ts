import { Vector, Color } from "p5"
import { p5 } from "../../global"

export interface IUnit {
  position: Vector
  size: number
  speed: number
  color: Color
  health: number
  maxHealth: number

  move(v: Vector): void
  draw(): void
}

export class Unit implements IUnit {
  position: Vector
  size: number
  speed: number
  color: Color
  health: number
  maxHealth: number

  constructor(speed: number, size: number, position: Vector, health: number) {
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
    p5.strokeWeight(2)
    p5.fill(this.color)
    p5.circle(this.position.x, this.position.y, this.size)

    //health
    p5.textSize(16)
    p5.fill(0)
    const healthText = Math.round(this.health / this.maxHealth * 100) + '%'
    p5.text(healthText, this.position.x - p5.textWidth(healthText) / 2, this.position.y + 7)
  }
}