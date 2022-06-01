import P5 from "p5"
import { Unit } from "./models/base/unit"
import { Hero } from "./models/player/hero"
import enemyService from "./services/enemyService"
import { Hud } from "./views/hud"

const sketch = (p5: P5) => {
  let hero: Hero 
  let enemies: Unit[]
  let hud: Hud

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")

    hero = new Hero(p5, 2.5, 30, p5.createVector(p5.windowWidth / 2, p5.windowHeight / 2), 1)
    enemies = []
    hud = new Hud()
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    const es = enemyService()
    p5.background(120)

    const heroDirection = hero.getMoveDirection()
    hero.move(heroDirection)
    
    es.spawnEnemy(p5, enemies, hero)
    es.moveEnemies(enemies, hero)
    
    es.calculateDamage(enemies, hero)

    es.drawEnemies(enemies)
    hero.draw()
    hud.draw(p5, hero)
  }

  p5.keyPressed = () => {
    if (p5.keyCode === 82) {//R
      hero.reload()
    }
  }

  p5.mouseClicked = () => {
    hero.attack()
  } 
}

new P5(sketch)