import { Vector } from "p5";
import { delAnimation, p5 } from "../../global";
import { AnimationType, IAnimation } from "../base/animation";

export class BloodAfterShoot implements IAnimation {
  duration: number
  step: number
  position: Vector
  direction: Vector
  type: AnimationType

  constructor(position: Vector, direction: Vector) {
    this.duration = 180
    this.step = 0
    this.position = position.copy()
    this.direction = direction.copy().mult(0.6)
    this.type = AnimationType.dynamic
  }

  draw(): void {
    if (this.step >= this.duration) {
      delAnimation(this)
      return
    }
    p5.strokeWeight(0)

    if (this.step < 20) {
      p5.fill(p5.color(230, 0 , 0, 255))
      p5.circle(this.position.x, this.position.y, 5 + this.step / 2)
      this.position.add(this.direction)
    } else if (this.step === 20) {
      this.type = AnimationType.static 
    } else if (this.step < 100) {
      p5.fill(p5.color(250 - this.step, 0 , 0, 255))
      p5.circle(this.position.x, this.position.y, 15)
    } else {
      p5.fill(p5.color(150, 0 , 0, 255 - (this.step - 100) * 2.55))
      p5.circle(this.position.x, this.position.y, 15)
    }

    this.step++
  }
}