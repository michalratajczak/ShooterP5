import P5, { Vector } from "p5";
import { addAnimation, addProjectile, delProjectile, p5 } from "../../global";
import { BloodAfterShoot } from "../animations/bloodAfterShoot";
import { IProjectile } from "../base/projectile";
import { IUnit } from "../base/unit";
import { RangedWeapon } from "../base/weapon";
import { Bullet } from "../projectiles/bullet";

export class Gun extends RangedWeapon {
  constructor() {
    super(9, 60, 8, 5)
  }

  shot(unit: IUnit, target: P5.Vector): void {
    const gun = target.sub(unit.position).normalize()
    const bullet = new Bullet(unit.position.copy(), 
      gun.copy().normalize().mult(this.weaponSpeed), 3, unit, p5.color(10), 
      (unit: IUnit, bullet: IProjectile) => this.onBulletCollision(unit, bullet), 
      (bullet: IProjectile) => this.onBulletDestroy(bullet))
    addProjectile(bullet)
  }
  
  draw(position: P5.Vector, unitSize: number): void {
    super.draw(position, unitSize)
    const target = p5.createVector(p5.mouseX, p5.mouseY)
    const gun = target.sub(position).normalize().mult(unitSize + 10).add(position)
    p5.stroke(0)
    p5.strokeWeight(5)
    p5.line(position.x, position.y, gun.x, gun.y)
  }

  onBulletCollision(unit: IUnit, bullet: IProjectile) {
    this.dealDamage(unit)
    addAnimation(new BloodAfterShoot(bullet.projectile, bullet.speed))
    this.onBulletDestroy(bullet)
  }

  onBulletDestroy(bullet: IProjectile) {
    delProjectile(bullet)
  }
}