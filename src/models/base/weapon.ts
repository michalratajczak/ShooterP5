import P5, { Vector } from "p5"
import { p5 } from "../../global"
import { IUnit } from "./unit"

export interface IWeapon {  
  _isReloading: boolean
  ammo: number
  reloadingTime: number
  reloadingStep: number
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
  reloadingStep: number
  weaponSpeed: number
  damage: number

  constructor(maxAmmo: number, reloadingTime: number, weaponSpeed: number, damage: number) {
    this.maxAmmo = maxAmmo
    this.ammo = maxAmmo
    this.reloadingTime = reloadingTime
    this.reloadingStep = 0
    this.weaponSpeed = weaponSpeed
    this.damage = damage
    this._isReloading = false
  }

  shot(unit: IUnit, target: P5.Vector): void {}
  draw(position: P5.Vector, unitSize: number): void {
    if (this._isReloading) {
      if (this.reloadingStep === this.reloadingTime) {
        this._isReloading = false
        this.ammo = this.maxAmmo
      }
      this.reloadingStep++
    }
  }  
  
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
      this.reloadingStep = 0
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