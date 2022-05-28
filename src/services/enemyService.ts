import P5 from "p5"
import { Unit } from "../models/base/unit"
import { Zombie } from "../models/enemies/zombie"
import { Hero } from "../models/player/hero"

const enemyService = () => {
  const spawnEnemy = (p5: P5, enemies: Unit[], hero: Hero) => {
    if(p5.frameCount % 180 === 0) {
      const x = p5.random(0, p5.windowWidth)
      const y = p5.random(0, p5.windowHeight)
      enemies.push(new Zombie(p5, 1.5, 40, p5.createVector(x, y)))
    }
  }

  const moveEnemies = (enemies: Unit[], hero: Hero) => {
    for (const enemy of enemies) {
      const v = hero.position.copy().sub(enemy.position).normalize().mult(enemy.speed)
      enemy.position.add(v)
    }
  }

  const drawEnemies = (enemies: Unit[]) => {
    for (const enemy of enemies) {
      enemy.draw()
    }
  }

  return {
    spawnEnemy,
    moveEnemies,
    drawEnemies
  }
}

export default enemyService