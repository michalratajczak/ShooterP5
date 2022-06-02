import P5 from "p5"
import { IView } from "./IView"

export class MenuView implements IView{
  p5: P5

  constructor(p5: P5) {
    this.p5 = p5
  }

  init = () => {

  }

  draw = () => {
    this.p5.strokeWeight(0)
    this.p5.textSize(80)
    this.p5.textStyle(this.p5.BOLD)
    this.p5.fill(this.p5.color(130, 40, 0))
    const title = 'ShooterP5'
    this.p5.text(title, this.p5.windowWidth / 2 - this.p5.textWidth(title) / 2, this.p5.windowHeight / 4)

    this.p5.textStyle(this.p5.NORMAL)
    this.p5.textSize(30)
    this.p5.fill(20)

    const controlsMoving = 'Moving:   [W] [A] [S] [D]'
    this.p5.text(controlsMoving, this.p5.windowWidth / 2 - this.p5.textWidth(controlsMoving) / 2, this.p5.windowHeight / 2)

    const controlsMouse = 'Shooting:   Left Mouse Button'
    this.p5.text(controlsMouse, this.p5.windowWidth / 2 - this.p5.textWidth(controlsMouse) / 2, this.p5.windowHeight / 2 + 40)    

    const controlsReloading = 'Reloading:   [R]'
    this.p5.text(controlsReloading, this.p5.windowWidth / 2 - this.p5.textWidth(controlsReloading) / 2, this.p5.windowHeight / 2 + 80)    

    this.p5.textStyle(this.p5.NORMAL)
    this.p5.textSize(40)
    const menuText = `Press [ SPACE ] to start game`
    this.p5.text(menuText, this.p5.windowWidth / 2 - this.p5.textWidth(menuText) / 2, this.p5.windowHeight * 3 / 4)
  }

  keyPressed = () => {
    if (this.p5.keyCode === 32) {//space
      const error = new Error()
      error.name = 'GAME'
      throw error
    }
  }

  mouseClicked = () => {

  }
}