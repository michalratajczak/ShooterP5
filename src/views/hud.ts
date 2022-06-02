import P5 from 'p5'
import { Hero } from '../models/player/hero'

export class Hud {
  draw(p5: P5, hero: Hero, score: number) : void {
    p5.fill(0)

    p5.textSize(24)
    p5.text('AMMO:', 20, p5.windowHeight - 20)
    p5.text(`SCORE: ${score}`, 20, 40)

    const maxAmmo = hero.weapon.getMaxAmmo()
    const ammo = hero.weapon.ammo

    for(let i = 1; i <= maxAmmo; i++) {
      if (i > ammo) {
        p5.noFill()
      }
      p5.rect(90 + 20 * i, p5.windowHeight - 45, 13, 30)
    }
  }
}