import P5 from "p5"
import { IUnit, Unit } from "../models/base/unit"
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

      enemies.push(new Zombie(p5, 1, 50, p5.createVector(x, y), 30))
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
          enemy.health += other.health
          enemy.maxHealth += other.maxHealth
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

  const calculateDamage = (enemies: Unit[], hero: Hero): number => {
    if (enemies.some(e => hero.position.dist(e.position) < e.size / 2 + hero.size / 2)) 
      throw new Error("GAME OVER")
    
    const deadEnemies: Unit[] = []
    for (const enemy of enemies) {
      for (const attack of hero.weapon.getAttacks()) {
        if (enemy.position.dist(attack.attack) < enemy.size / 2) {
          hero.weapon.dealDamage(enemy, attack)
          if (enemy.health <= 0) deadEnemies.push(enemy)
        }
      } 
    }

    for (let enemy of deadEnemies) {
      enemies.splice(enemies.indexOf(enemy), 1)
    }

    return deadEnemies.length
  }

  return {
    spawnEnemy,
    moveEnemies,
    drawEnemies,
    calculateDamage
  }
}

export default enemyService