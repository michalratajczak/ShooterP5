import P5, { Vector } from "p5";
import { Unit } from "../base/unit";
import { IWeapon } from "../base/weapon";
import { Gun } from "../weapons/gun";

export class Hero extends Unit {  
  weapon: IWeapon

  constructor(p5: P5, speed: number, size: number, position: Vector) {
    super(p5, speed, size, position)
    this.color = p5.color(130, 40, 0)
    this.weapon = new Gun(p5)
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

  draw(): void {
    this.weapon.draw(this.position, this.size / 2)
    super.draw()
  }

  attack(): void {
    this.weapon.attack(this.position)
  }

  reload(): void {
    this.weapon.reload()
  }
}