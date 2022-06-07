import { Color, Vector } from "p5"
import { p5 } from "../../global"
import { IProjectile } from "../base/projectile"
import { IUnit } from "../base/unit"

export class Bullet implements IProjectile {
  start: Vector
  speed: Vector
  projectile: Vector
  size: number
  owner: IUnit
  color: Color

  onCollision: Function
  onDestroy: Function

  constructor(start: Vector, speed: Vector, size: number, owner: IUnit,
    color: Color, onCollision: Function, onDestroy: Function) {
    this.start = start
    this.speed = speed
    this.projectile = start.copy()
    this.size = size
    this.owner = owner
    this.color = color
    this.onCollision = onCollision
    this.onDestroy = onDestroy
  }

  move() {
    this.projectile.add(this.speed)
  }

  draw() {
    p5.fill(this.color)
    p5.circle(this.projectile.x, this.projectile.y, this.size)
  }
} 