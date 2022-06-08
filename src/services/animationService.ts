import { getAnimations } from "../global"
import { AnimationType } from "../models/base/animation"


const animationService = () => { 
  const drawDynamicAnimations = () => {
    for (const animation of getAnimations().filter(a => a.type === AnimationType.dynamic)) {
      animation.draw()
    }
  }

  const drawStaticAnimations = () => {
    for (const animation of getAnimations().filter(a => a.type === AnimationType.static)) {
      animation.draw()
    }
  }

  return {
    drawDynamicAnimations,
    drawStaticAnimations
  }
}

export default animationService