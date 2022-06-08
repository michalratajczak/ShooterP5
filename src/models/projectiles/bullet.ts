import { Color, Vector } from "p5"
import { delProjectile, p5 } from "../../global"
import { IProjectile } from "../base/projectile"
import { IUnit } from "../base/unit"

export class Bullet implements IProjectile {
  start: Vector
  speed: Vector
  projectile: Vector
  size: number
  owner: IUnit
  color: Color
  range: number

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
    this.range = p5.windowWidth > p5.windowHeight ? p5.windowWidth : p5.windowHeight
  }

  move() {
    if (this.projectile.dist(this.start) <= this.range) {      
      this.projectile.add(this.speed)
    } else {
      this.onDestroy(this)
    }
  }

  draw() {
    p5.fill(this.color)
    p5.circle(this.projectile.x, this.projectile.y, this.size)
  }
} 