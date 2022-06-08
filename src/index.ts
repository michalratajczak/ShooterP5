import P5 from "p5"
import { MenuScene } from "./scenes/menuScene"
import { getCurrentScene, init, setCurrentScene } from "./global"

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")

    init(p5)
    setCurrentScene(new MenuScene())
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.background(120)
    const scene = getCurrentScene()

    scene.init()
    scene.draw()
  }

  p5.keyPressed = () => {
    const scene = getCurrentScene()
    scene.keyPressed()
  }

  p5.mouseClicked = () => {
    const scene = getCurrentScene()
    scene.mouseClicked()
  } 
}

new P5(sketch)