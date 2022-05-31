import P5 from "p5"
import { Unit } from "../models/base/unit"
import { Zombie } from "../models/enemies/zombie"
import { Hero } from "../models/player/hero"

const enemyService = () => {
  const spawnEnemy = (p5: P5, enemies: Unit[], hero: Hero) => {
    if(p5.frameCount % 120 === 0) {
      const outerSide = p5.random(['x', 'y'])
      let x: number, y: number
      if (outerSide === 'x') {
        x = p5.random(0, 1) > 0.5 ? p5.windowWidth + 100 : -100
        y = p5.random(0, p5.windowHeight)
      } else {
        x = p5.random(0, p5.windowWidth)
        y = p5.random(0, 1) > 0.5 ? p5.windowHeight + 100 : -100
      }     

      enemies.push(new Zombie(p5, 1, 40, p5.createVector(x, y)))
    }
  }

  const moveEnemies = (enemies: Unit[], hero: Hero) => {
    const enemiesToAbsorb = []
    for (const enemy of enemies) {
      const v = hero.position.copy().sub(enemy.position).normalize().mult(enemy.speed)
      enemy.position.add(v)

      for (const other of enemies) {
        if (enemy === other) continue
        if (enemiesToAbsorb.some(e => e.absorbed === enemy)) continue
        if (other.size > enemy.size) continue
        if (enemy.position.dist(other.position) < (enemy.size / 2) - (other.size / 4)) {
          enemiesToAbsorb.push({
            grow: enemy,
            absorbed: other
          })                  
        }
      }      
    }    

    for (const x of enemiesToAbsorb) {
      x.grow.size += 5
      x.speed *= 0.90
      enemies.splice(enemies.indexOf(x.absorbed), 1)
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