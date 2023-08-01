import Heart from "./Heart"
import { Point } from "./Point"
import { Tree } from "./Tree"
import { random } from "./utils"

export class Bloom {
  tree: Tree
  point: Point
  figure: Heart
  color: string
  alpha: number
  angle: number
  scale: number
  place: Point | null = null
  speed: number | null = null
  constructor(
    tree: Tree,
    point: Point,
    figure: Heart,
    color?: string,
    alpha?: number,
    angle?: number,
    scale?: number,
    place?: Point,
    speed?: number
  ) {
    this.tree = tree
    this.point = point
    this.color =
      color || "rgb(255," + random(0, 255) + "," + random(0, 255) + ")"
    this.alpha = alpha || random(0.3, 1)
    this.angle = angle || random(0, 360)
    this.scale = scale || 0.1
    this.place = place || null
    this.speed = speed || null

    this.figure = figure
  }

  setFigure(figure: Heart) {
    this.figure = figure
  }
  flower() {
    const s = this
    s.draw()
    s.scale += 0.1
    if (s.scale > 1) {
      s.tree.removeBloom(s)
    }
  }
  draw() {
    var s = this,
      ctx = s.tree.ctx!,
      figure = s.figure

    ctx.save()
    ctx.fillStyle = s.color
    ctx.globalAlpha = s.alpha
    ctx.translate(s.point.x, s.point.y)
    ctx.scale(s.scale, s.scale)
    ctx.rotate(s.angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    for (var i = 0; i < figure.length; i++) {
      var p = figure.get(i)
      ctx.lineTo(p.x, -p.y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  jump() {
    var s = this,
      height = s.tree.height
    if (s.point.x < -20 || s.point.y > height + 20) {
      s.tree.removeBloom(s)
    } else {
      s.draw()
      s.point = s.place.sub(s.point).div(s.speed).add(s.point)
      s.angle += 0.05
      s.speed -= 1
    }
  }
}
