import { addEnemy, delEnemy, delProjectile, getEnemies, getHero, getProjectiles, p5 } from "../global"
import { IUnit, Unit } from "../models/base/unit"

const enemyService = () => {
  const spawnEnemy = (enemy: IUnit) => {
    const outerSide = p5.random(['x', 'y'])
    let x: number, y: number
    if (outerSide === 'x') {
      x = p5.random(0, 1) > 0.5 ? p5.windowWidth + 100 : -100
      y = p5.random(0, p5.windowHeight)
    } else {
      x = p5.random(0, p5.windowWidth)
      y = p5.random(0, 1) > 0.5 ? p5.windowHeight + 100 : -100
    }     
    enemy.position = p5.createVector(x, y)
    addEnemy(enemy)
  }

  const moveEnemies = () => {
    const enemiesToAbsorb = []
    for (const enemy of getEnemies()) {
      const v = getHero().position.copy().sub(enemy.position).normalize().mult(enemy.speed)
      enemy.position.add(v)

      for (const other of getEnemies()) {
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
      delEnemy(x.absorbed)
    }
  }

  const drawEnemies = () => {
    for (const enemy of getEnemies()) {
      enemy.draw()
    }
  }

  const calculateDamage = (): number => {
    if (getEnemies().some(e => getHero().position.dist(e.position) < e.size / 2 + getHero().size / 2)) 
      throw new Error("GAME OVER")
    
    const deadEnemies: Unit[] = []
    for (const enemy of getEnemies()) {
      for (const projectile of getProjectiles()) {
        if (enemy.position.dist(projectile.projectile) < enemy.size / 2) {
          getHero().weapon.dealDamage(enemy)
          delProjectile(projectile)
          if (enemy.health <= 0) deadEnemies.push(enemy)
        }
      } 
    }

    for (let enemy of deadEnemies) {
      delEnemy(enemy)
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