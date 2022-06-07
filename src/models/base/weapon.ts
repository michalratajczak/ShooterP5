import P5, { Vector } from "p5"
import { p5 } from "../../global"
import { IUnit } from "./unit"

export interface IWeapon {  
  _isReloading: boolean
  ammo: number
  reloadingTime: number
  damage: number

  attack(attacker: IUnit): void
  reload(): void
  isReloading(): boolean
  getMaxAmmo(): number
  dealDamage(enemy: IUnit): void
  draw(position: P5.Vector, unitSize: number): void
}


export class RangedWeapon implements IWeapon {
  _isReloading: boolean
  maxAmmo: number
  ammo: number
  reloadingTime: number
  weaponSpeed: number
  damage: number

  constructor(maxAmmo: number, reloadingTime: number, weaponSpeed: number, damage: number) {
    this.maxAmmo = maxAmmo
    this.ammo = maxAmmo
    this.reloadingTime = reloadingTime
    this.weaponSpeed = weaponSpeed
    this.damage = damage
  }

  shot(unit: IUnit, target: P5.Vector): void {}
  draw(position: P5.Vector, unitSize: number): void {}  
  
  attack(attacker: IUnit): void {
    if (!this._isReloading && this.ammo > 0) {
      const target = p5.createVector(p5.mouseX, p5.mouseY)
      this.shot(attacker, target)
      this.ammo--
    }
    if (this.ammo <= 0) {
      this.reload()
    }
  }
  reload(): void {
    if (!this._isReloading) {
      this._isReloading = true
      const timeout = setTimeout(() => {
        this.ammo = this.maxAmmo
        this._isReloading = false
        clearTimeout(timeout)
      }, this.reloadingTime / p5.frameRate() * 100)
    }
  }
  isReloading(): boolean {
    return this._isReloading
  }
  getMaxAmmo(): number {
    return this.maxAmmo
  }
  dealDamage(enemy: IUnit): void {
    enemy.health -= this.damage
  }
}