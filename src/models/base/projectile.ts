import { Color, Vector } from "p5"
import { IUnit } from "./unit"

export interface IProjectile {
  start: Vector
  speed: Vector
  projectile: Vector
  size: number
  owner: IUnit
  color: Color

  onCollision: Function
  onDestroy: Function

  move(): void
  draw(): void
}
