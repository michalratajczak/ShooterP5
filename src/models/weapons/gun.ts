import P5, { Vector } from "p5";
import { addProjectile, p5 } from "../../global";
import { IUnit } from "../base/unit";
import { RangedWeapon } from "../base/weapon";
import { Bullet } from "../projectiles/bullet";

export class Gun extends RangedWeapon {
  constructor() {
    super(9, 600, 8, 5)
  }

  shot(unit: IUnit, target: P5.Vector): void {
    const gun = target.sub(unit.position).normalize()
    const bullet = new Bullet(unit.position.copy(), gun.copy().normalize().mult(this.weaponSpeed),
      3, unit, p5.color(10), this.dealDamage, () => {})
    addProjectile(bullet)
  }
  
  draw(position: P5.Vector, unitSize: number): void {
    const target = p5.createVector(p5.mouseX, p5.mouseY)
    const gun = target.sub(position).normalize().mult(unitSize + 10).add(position)
    p5.stroke(0)
    p5.strokeWeight(5)
    p5.line(position.x, position.y, gun.x, gun.y)
  }
}