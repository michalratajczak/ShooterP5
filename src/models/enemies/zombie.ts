import P5, { Vector } from "p5";
import { Unit } from "../base/unit";

export class Zombie extends Unit {
  constructor(p5: P5, speed: number, size: number, position: Vector, health: number) {
    super(p5, speed, size, position, health)
    this.color = p5.color(50, 150, 0)
  }
}