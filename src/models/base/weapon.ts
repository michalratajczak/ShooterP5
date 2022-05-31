import P5, { Vector } from "p5"

export interface IWeapon {  
  _p5: P5
  _isReloading: boolean
  ammo: number
  reloadingTime: number

  attack(position: P5.Vector): void
  reload(): void
  isReloading(): boolean
  draw(position: P5.Vector, unitSize: number): void
}

export interface IShot {
  position: P5.Vector
  shot: P5.Vector
  bullet: P5.Vector
}

export class RangedWeapon implements IWeapon {
  _p5: P5
  _isReloading: boolean
  maxAmmo: number
  ammo: number
  reloadingTime: number
  weaponSpeed: number
  _shots: IShot[]

  constructor(p5: P5, maxAmmo: number, reloadingTime: number, weaponSpeed: number) {
    this._p5 = p5
    this.maxAmmo = maxAmmo
    this.ammo = maxAmmo
    this.reloadingTime = reloadingTime
    this.weaponSpeed = weaponSpeed
    this._shots = []
  }

  shot(target: P5.Vector, position: P5.Vector): void {}
  draw(position: P5.Vector, unitSize: number): void {}  
  
  attack(position: P5.Vector): void {
    if (!this._isReloading) {
      const target = this._p5.createVector(this._p5.mouseX, this._p5.mouseY)
      this.shot(target, position)
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
}