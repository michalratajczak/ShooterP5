import { getHero, getScore, p5 } from '../global'

export class Hud {
  draw() : void {
    p5.strokeWeight(2)
    p5.fill(0)

    p5.textSize(24)
    p5.text('AMMO:', 20, p5.windowHeight - 20)
    p5.text(`SCORE: ${getScore()}`, 20, 40)

    const weapon = getHero().weapon

    for(let i = 1; i <= weapon.getMaxAmmo(); i++) {
      if (i > weapon.ammo) {
        p5.noFill()
      }
      p5.rect(90 + 20 * i, p5.windowHeight - 45, 13, 30)
    }
    
    if (weapon.isReloading()) {
      p5.fill(0)
      p5.strokeWeight(0)
      p5.rect(110, p5.windowHeight - 65, (weapon.reloadingStep / weapon.reloadingTime) * weapon.getMaxAmmo() * 20 - 7, 10)
    }
  }
}