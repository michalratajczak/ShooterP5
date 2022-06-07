import { Vector } from "p5";
import { p5 } from "../../global";
import { Unit } from "../base/unit";
import { IWeapon } from "../base/weapon";
import { Gun } from "../weapons/gun";

export class Hero extends Unit {  
  weapon: IWeapon

  constructor(speed: number, size: number, position: Vector, health: number) {
    super(speed, size, position, health)
    this.color = p5.color(130, 40, 0)
    this.weapon = new Gun()
  }

  getMoveDirection(): Vector {
    const v = p5.createVector(0, 0)

    if(p5.keyIsDown(87)) // W
      v.y -= 1
    if(p5.keyIsDown(83)) // S
      v.y += 1
    if(p5.keyIsDown(65)) // A
      v.x -= 1
    if(p5.keyIsDown(68)) // D
      v.x += 1

    return v
  }

  move(v: Vector): void {    
    this.position.add(v.mult(this.speed))
    const x = p5.constrain(this.position.x, 30, p5.windowWidth - 30)
    const y = p5.constrain(this.position.y, 30, p5.windowHeight - 30)
    this.position = p5.createVector(x, y)
  }

  draw(): void {
    this.weapon.draw(this.position, this.size / 2)
    p5.strokeWeight(2)
    p5.fill(this.color)
    p5.circle(this.position.x, this.position.y, this.size)
  }

  attack(): void {
    this.weapon.attack(this)
  }

  reload(): void {
    this.weapon.reload()
  }
}