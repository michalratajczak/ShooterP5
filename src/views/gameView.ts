import P5 from "p5"
import { Unit } from "../models/base/unit"
import { Hero } from "../models/player/hero"
import { Hud } from "./hud"
import enemyService from "../services/enemyService"
import { IView } from "./IView"

export class GameView implements IView{
  p5: P5
  isInitialized: boolean
  score: number

  hero: Hero 
  enemies: Unit[]
  hud: Hud
  
  constructor(p5: P5) {
    this.p5 = p5
    this.isInitialized = false
  }

  init = () => {
    if (!this.isInitialized) {
      this.hero = new Hero(this.p5, 2.5, 30, this.p5.createVector(this.p5.windowWidth / 2, this.p5.windowHeight / 2), 1)
      this.enemies = []
      this.hud = new Hud()
      this.score = 0
      this.isInitialized = true
    }
  }

  draw = () => {
    try
    {
      const es = enemyService()

      const heroDirection = this.hero.getMoveDirection()
      this.hero.move(heroDirection)
      
      es.spawnEnemy(this.p5, this.enemies, this.hero)
      es.moveEnemies(this.enemies, this.hero)
      
      this.score += es.calculateDamage(this.enemies, this.hero)
  
      es.drawEnemies(this.enemies)
      this.hero.draw()
      this.hud.draw(this.p5, this.hero, this.score)
    }
    catch(e: any) {
      if (e.message === 'GAME OVER') {
        const error = new Error(this.score.toString())
        error.name = 'GAME OVER'
        throw error
      }   
    }
  }

  keyPressed = () => {
    if (this.p5.keyCode === 82) {//R
      this.hero.reload()
    }
  }

  mouseClicked = () => {
    this.hero.attack()
  }
}