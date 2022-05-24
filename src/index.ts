import P5 from "p5"
import { Hero } from "./models/player/hero"

const sketch = (p5: P5) => {
  let hero: Hero 

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")

    hero = new Hero(p5, 2.5, 30, p5.createVector(p5.windowWidth / 2, p5.windowHeight / 2))
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.background(120)

    const heroDirection = hero.getMoveDirection()
    hero.move(heroDirection)
    
    
    
    hero.draw()
  }
}

new P5(sketch)