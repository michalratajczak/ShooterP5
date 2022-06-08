import { Vector } from "p5"

export interface IAnimation {
  duration: number
  step: number
  position: Vector
  direction: Vector
  type: AnimationType

  draw(): void
}

export enum AnimationType {
  static = 1,
  dynamic = 2
}