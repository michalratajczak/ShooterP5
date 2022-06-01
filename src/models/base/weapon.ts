import P5, { Vector } from "p5"
import { IUnit } from "./unit"

export interface IWeapon {  
  _p5: P5
  _isReloading: boolean
  ammo: number
  reloadingTime: number
  damage: number

  attack(position: P5.Vector): void
  reload(): void
  isReloading(): boolean
  getMaxAmmo(): number
  draw(position: P5.Vector, unitSize: number): void
  getAttacks(): IAttack[]
  dealDamage(enemy: IUnit, attack: IAttack): void
}

export interface IAttack {
  position: P5.Vector
  vector: P5.Vector
  attack: P5.Vector
}

export class RangedWeapon implements IWeapon {
  _p5: P5
  _isReloading: boolean
  maxAmmo: number
  ammo: number
  reloadingTime: number
  weaponSpeed: number
  _shots: IAttack[]
  damage: number

  constructor(p5: P5, maxAmmo: number, reloadingTime: number, weaponSpeed: number, damage: number) {
    this._p5 = p5
    this.maxAmmo = maxAmmo
    this.ammo = maxAmmo
    this.reloadingTime = reloadingTime
    this.weaponSpeed = weaponSpeed
    this._shots = []
    this.damage = damage
  }

  shot(target: P5.Vector, position: P5.Vector): void {}
  draw(position: P5.Vector, unitSize: number): void {}  
  
  attack(position: P5.Vector): void {
    if (!this._isReloading && this.ammo > 0) {
      const target = this._p5.createVector(this._p5.mouseX, this._p5.mouseY)
      this.shot(target, position)
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
      }, this.reloadingTime / this._p5.frameRate() * 100)
    }
  }
  isReloading(): boolean {
    return this._isReloading
  }
  getMaxAmmo(): number {
    return this.maxAmmo
  }
  getAttacks(): IAttack[] {
    return this._shots
  }
  dealDamage(enemy: IUnit, attack: IAttack): void {
    enemy.health -= this.damage
    this._shots.splice(this._shots.indexOf(attack), 1)
  }
}