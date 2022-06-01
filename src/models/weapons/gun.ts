import P5, { Vector } from "p5";
import { RangedWeapon, IAttack } from "../base/weapon";

export class Gun extends RangedWeapon {
  constructor(p5: P5) {
    super(p5, 9, 600, 8, 5)
  }

  shot(target: P5.Vector, position: P5.Vector): void {
    const gun = target.sub(position).normalize()
    const shot = position.copy().add(gun)
    this._shots.push({
      position: position,
      vector: gun.copy().normalize().mult(this.weaponSpeed),
      attack: shot.copy()
    })
  }

  _drawBullets(): void {
    const shotsToDelete: IAttack[] = []
    for (let s of this._shots) { 
      s.attack.add(s.vector)

      if(Math.abs(s.attack.x) > this._p5.width || Math.abs(s.attack.y) > this._p5.height) 
        shotsToDelete.push(s)
      else {
        this._p5.circle(s.attack.x, s.attack.y, 3)
      }
    }
    for (let s of shotsToDelete) {
      const idx = this._shots.indexOf(s)
      this._shots.splice(idx, 1)
    }
  }
  
  draw(position: P5.Vector, unitSize: number): void {
    this._drawBullets()

    const target = this._p5.createVector(this._p5.mouseX, this._p5.mouseY)
    const gun = target.sub(position).normalize().mult(unitSize + 10).add(position)
    this._p5.stroke(0)
    this._p5.strokeWeight(5)
    this._p5.line(position.x, position.y, gun.x, gun.y)
  }
}