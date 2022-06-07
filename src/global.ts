import P5 from "p5"
import { IProjectile } from "./models/base/projectile"
import { IUnit } from "./models/base/unit"
import { Hero } from "./models/player/hero"

export let p5: P5
let _hero: Hero 
let _enemies: IUnit[]
let _score: number
let _projectiles: IProjectile[]

export const init = (P5: P5) => {
  p5 = P5
  restartGame()
}

export const restartGame = () => {
  _hero = new Hero(2.5, 30, p5.createVector(p5.windowWidth / 2, p5.windowHeight / 2), 1)
  _enemies = []
  _score = 0
  _projectiles = []
}

export const getHero = () => _hero

export const getEnemies = () => _enemies
export const addEnemy = (e: IUnit) => {
  _enemies.push(e)
}
export const delEnemy = (e: IUnit) => {
  const idx = _enemies.indexOf(e)
  if (idx >= 0) {
    _enemies.splice(idx, 1)
  }
}

export const getScore = () => _score
export const addScore = (scores: number) => {
  return _score += scores
}

export const getProjectiles = () => _projectiles
export const addProjectile = (p: IProjectile) => {
  _projectiles.push(p)
}
export const delProjectile = (p: IProjectile) => {
  const idx = _projectiles.indexOf(p)
  if (idx >= 0) {
    _projectiles.splice(idx, 1)
  }
}


