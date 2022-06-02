import P5 from "p5"
import { GameView } from "./views/gameView"
import { IView } from "./views/IView"
import { MenuView } from "./views/menuView"
import { ResultView } from "./views/resultView"

const sketch = (p5: P5) => {
  let currentView: IView

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")

    currentView = new MenuView(p5)
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
      if (e.name === 'GAME OVER') {
        currentView = new ResultView(p5, e.message)
      }      
    }
  }

  p5.keyPressed = () => {
    try {
      currentView.keyPressed()
    }
    catch(e: any) {
      if (e.name === 'MENU') {
        currentView = new MenuView(p5)
      }
      else if (e.name === 'GAME') {
        currentView = new GameView(p5)
      }
    }
  }

  p5.mouseClicked = () => {
    currentView.mouseClicked()
  } 
}

new P5(sketch)