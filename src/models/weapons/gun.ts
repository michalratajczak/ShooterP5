import P5, { Vector } from "p5";
import { RangedWeapon, IShot } from "../base/weapon";

export class Gun extends RangedWeapon {
  constructor(p5: P5) {
    super(p5, 9, 600, 8)
  }

  shot(target: P5.Vector, position: P5.Vector): void {
    //const shot = position.copy().sub(target)
    const gun = target.sub(position).normalize()//.add(position)
    const shot = position.copy().add(gun)
    this._shots.push({
      position: position,
      shot: gun.copy().normalize().mult(this.weaponSpeed),
      bullet: shot.copy()
    })
  }

  _drawBullets(): void {
    const shotsToDelete: IShot[] = []
    for (let s of this._shots) { 
      s.bullet.add(s.shot)

      if(Math.abs(s.bullet.x) > this._p5.width || Math.abs(s.bullet.y) > this._p5.height) 
        shotsToDelete.push(s)
      else {
        this._p5.circle(s.bullet.x, s.bullet.y, 3)
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
    this._p5.stroke(6)
    this._p5.line(position.x, position.y, gun.x, gun.y)
  }
}