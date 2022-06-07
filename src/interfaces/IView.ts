export interface IView {
  init(): void
  draw(): void
  keyPressed(): void
  mouseClicked(): void
}