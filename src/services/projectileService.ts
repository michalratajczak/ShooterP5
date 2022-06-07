import { getProjectiles } from "../global"

const projectileService = () => { 

  const moveProjectiles = () => {
    for (const projectile of getProjectiles()) {
      projectile.move()
    }
  }

  const drawProjectiles = () => {
    for (const projectile of getProjectiles()) {
      projectile.draw()
    }
  }

  return {
    moveProjectiles,
    drawProjectiles
  }
}

export default projectileService