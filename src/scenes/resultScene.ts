import { getScore, p5, setCurrentScene } from "../global"
import { IScene } from "../interfaces/scene"
import { MenuScene } from "./menuScene"

export class ResultScene implements IScene {
  init = () => {

  }

  draw = () => {
    p5.strokeWeight(5)
    p5.textSize(60)
    p5.fill(60)
    const resultText = `Your result: ${getScore()}!`
    p5.text(resultText, p5.windowWidth / 2 - p5.textWidth(resultText) / 2, p5.windowHeight / 3)

    p5.strokeWeight(0)
    p5.textSize(40)
    const menuText = `Press [ SPACE ] to go to main menu`
    p5.text(menuText, p5.windowWidth / 2 - p5.textWidth(menuText) / 2, p5.windowHeight * 2 / 3)
  }

  keyPressed = () => {
    if (p5.keyCode === 32) {//space
      setCurrentScene(new MenuScene())
    }
  }

  mouseClicked = () => {

  }
}