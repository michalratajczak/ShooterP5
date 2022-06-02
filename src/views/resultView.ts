import P5 from "p5"
import { IView } from "./IView"

export class ResultView implements IView{
  p5: P5
  result: number

  constructor(p5: P5, result: string) {
    this.p5 = p5
    this.result = parseInt(result)
  }

  init = () => {

  }

  draw = () => {
    this.p5.strokeWeight(5)
    this.p5.textSize(60)
    this.p5.fill(60)
    const resultText = `Your result: ${this.result}!`
    this.p5.text(resultText, this.p5.windowWidth / 2 - this.p5.textWidth(resultText) / 2, this.p5.windowHeight / 3)

    this.p5.strokeWeight(0)
    this.p5.textSize(40)
    const menuText = `Press [ SPACE ] to go to main menu`
    this.p5.text(menuText, this.p5.windowWidth / 2 - this.p5.textWidth(menuText) / 2, this.p5.windowHeight * 2 / 3)
  }

  keyPressed = () => {
    if (this.p5.keyCode === 32) {//space
      const error = new Error()
      error.name = 'MENU'
      throw error
    }
  }

  mouseClicked = () => {

  }
}