export interface IScene {
  init(): void
  draw(): void
  keyPressed(): void
  mouseClicked(): void
}