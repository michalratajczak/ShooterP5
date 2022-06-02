import P5 from "p5";

export interface IView {
  p5: P5

  init(): void
  draw(): void
  keyPressed(): void
  mouseClicked(): void
}