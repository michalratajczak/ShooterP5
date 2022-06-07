import P5 from "p5"
import { Unit } from "../models/base/unit"
import { Hero } from "../models/player/hero"
import { Hud } from "../views/hud"
import enemyService from "../services/enemyService"
import { IView } from "../interfaces/IView"
import { addScore, getEnemies, getHero, getProjectiles, getScore, p5, restartGame } from "../global"
import { Zombie } from "../models/enemies/zombie"
import projectileService from "../services/projectileService"

export class GameScene implements IView {
  isInitialized: boolean
  hud: Hud
  
  constructor() {
    this.isInitialized = false
  }

  init = () => {
    if (!this.isInitialized) {
      restartGame()
      this.hud = new Hud()
      this.isInitialized = true
    }
  }

  draw = () => {
    try
    {
      const es = enemyService()
      const ps = projectileService()

      const heroDirection = getHero().getMoveDirection()
      getHero().move(heroDirection)
      
      if (p5.frameCount % 120 == 0) {
        const zombie = new Zombie(1.2, 50, p5.createVector(0, 0), 30)
        es.spawnEnemy(zombie)
      }
      es.moveEnemies()
      ps.moveProjectiles()
      
      addScore(es.calculateDamage())
  
      es.drawEnemies()
      ps.drawProjectiles()

      getHero().draw()
      this.hud.draw(p5, getHero(), getScore())
    }
    catch(e: any) {
      if (e.message === 'GAME OVER') {
        throw e
      }   
    }
  }

  keyPressed = () => {
    if (p5.keyCode === 82) {//R
      getHero().reload()
    }
  }

  mouseClicked = () => {
    getHero().attack()
  }
}