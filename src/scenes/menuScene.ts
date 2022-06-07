import P5 from "p5"
import { p5 } from "../global"
import { IView } from "../interfaces/IView"

export class MenuScene implements IView{
  init = () => {

  }

  draw = () => {
    p5.strokeWeight(0)
    p5.textSize(80)
    p5.textStyle(p5.BOLD)
    p5.fill(p5.color(130, 40, 0))
    const title = 'ShooterP5'
    p5.text(title, p5.windowWidth / 2 - p5.textWidth(title) / 2, p5.windowHeight / 4)

    p5.textStyle(p5.NORMAL)
    p5.textSize(30)
    p5.fill(20)

    const controlsMoving = 'Moving:   [W] [A] [S] [D]'
    p5.text(controlsMoving, p5.windowWidth / 2 - p5.textWidth(controlsMoving) / 2, p5.windowHeight / 2)

    const controlsMouse = 'Shooting:   Left Mouse Button'
    p5.text(controlsMouse, p5.windowWidth / 2 - p5.textWidth(controlsMouse) / 2, p5.windowHeight / 2 + 40)    

    const controlsReloading = 'Reloading:   [R]'
    p5.text(controlsReloading, p5.windowWidth / 2 - p5.textWidth(controlsReloading) / 2, p5.windowHeight / 2 + 80)    

    p5.textStyle(p5.NORMAL)
    p5.textSize(40)
    const menuText = `Press [ SPACE ] to start game`
    p5.text(menuText, p5.windowWidth / 2 - p5.textWidth(menuText) / 2, p5.windowHeight * 3 / 4)
  }

  keyPressed = () => {
    if (p5.keyCode === 32) {//space
      throw new Error('GAME')
    }
  }

  mouseClicked = () => {

  }
}