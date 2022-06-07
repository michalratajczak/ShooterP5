import { Vector } from "p5";
import { p5 } from "../../global";
import { Unit } from "../base/unit";

export class Zombie extends Unit {
  constructor(speed: number, size: number, position: Vector, health: number) {
    super(speed, size, position, health)
    this.color = p5.color(50, 150, 0)
  }
}