import { Hud } from "../views/hud"
import enemyService from "../services/enemyService"
import { addScore, getHero, getProjectiles, getScore, p5, restartGame, setCurrentScene } from "../global"
import { Zombie } from "../models/enemies/zombie"
import projectileService from "../services/projectileService"
import { IScene } from "../interfaces/scene"
import { ResultScene } from "./resultScene"
import animationService from "../services/animationService"

export class GameScene implements IScene {
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
      const as = animationService()
      
      //calculations
      const heroDirection = getHero().getMoveDirection()
      getHero().move(heroDirection)
      
      const newEnemy = es.createEnemy()
      if (newEnemy) es.spawnEnemy(newEnemy)

      es.moveEnemies()
      ps.moveProjectiles()
      
      addScore(es.calculateDamage())
  
      //drawing
      as.drawStaticAnimations()
      es.drawEnemies()
      ps.drawProjectiles()
      getHero().draw()
      as.drawDynamicAnimations()
      this.hud.draw(p5, getHero(), getScore())
    }
    catch(e: any) {
      if (e.message === 'GAME OVER') {
        setCurrentScene(new ResultScene())
      }   
      else console.error(e)
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