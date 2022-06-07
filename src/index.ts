import P5 from "p5"
import { GameScene } from "./scenes/gameScene"
import { IView } from "./interfaces/IView"
import { MenuScene } from "./scenes/menuScene"
import { ResultScene } from "./scenes/resultScene"
import { init } from "./global"

const sketch = (p5: P5) => {
  let currentView: IView

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")
    init(p5)

    currentView = new MenuScene()
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.background(120)

    try {
      currentView.init()
      currentView.draw()
    }
    catch(e: any) {
      if (e.message === 'GAME OVER') {
        currentView = new ResultScene()
      }      
    }
  }

  p5.keyPressed = () => {
    try {
      currentView.keyPressed()
    }
    catch(e: any) {
      if (e.message === 'MENU') {
        currentView = new MenuScene()
      }
      else if (e.message === 'GAME') {
        currentView = new GameScene()
      }
    }
  }

  p5.mouseClicked = () => {
    currentView.mouseClicked()
  } 
}

new P5(sketch)