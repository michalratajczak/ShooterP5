import P5 from "p5"

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.parent("app")
  }

  p5.draw = () => {
    p5.background(120)
  }
}

new P5(sketch)