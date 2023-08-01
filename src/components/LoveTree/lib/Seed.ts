import Heart from "./Heart"
import { Point } from "./Point"
import { Tree } from "./Tree"

export class Seed {
  tree: Tree | null = null
  heart: Record<string, any> = {}
  cirle: Record<string, any> = {}
  constructor(tree: Tree, point: Point, scale: number, color: string) {
    this.tree = tree
    scale = scale || 1
    color = color || "#FF0000"
    this.heart = { point, scale, color, figure: new Heart() }

    this.cirle = { point, scale, color, radius: 5 }
  }

  draw() {
    this.drawHeart()
    this.drawText()
  }
  addPosition(x: number, y: number) {
    this.cirle.point = this.cirle.point.add(new Point(x, y))
  }
  canMove() {
    return this.cirle.point.y < this.tree!.height + 20
  }
  move(x: number, y: number) {
    this.clear()
    this.drawCirle()
    this.addPosition(x, y)
  }
  canScale() {
    return this.heart.scale > 0.2
  }
  setHeartScale(scale: number) {
    this.heart.scale *= scale
  }
  scale(scale: number) {
    this.clear()
    this.drawCirle()
    this.drawHeart()
    this.setHeartScale(scale)
  }
  drawHeart() {
    const ctx = this.tree!.ctx!,
      heart = this.heart
    const point = heart.point,
      color = heart.color,
      scale = heart.scale
    ctx.save()
    ctx.fillStyle = color
    ctx.translate(point.x, point.y)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    for (var i = 0; i < heart.figure.length; i++) {
      var p = heart.figure.get(i, scale)
      ctx.lineTo(p.x, -p.y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  drawCirle() {
    const ctx = this.tree!.ctx!,
      cirle = this.cirle
    const point = cirle.point,
      color = cirle.color,
      scale = cirle.scale,
      radius = cirle.radius
    ctx.save()
    ctx.fillStyle = color
    ctx.translate(point.x, point.y)
    ctx.scale(scale, scale)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  drawText() {
    const ctx = this.tree!.ctx!,
      heart = this.heart
    const point = heart.point,
      color = heart.color,
      scale = heart.scale
    ctx.save()
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.translate(point.x, point.y)
    ctx.scale(scale, scale)
    ctx.moveTo(0, 0)
    ctx.lineTo(15, 15)
    ctx.lineTo(60, 15)
    ctx.stroke()

    ctx.moveTo(0, 0)
    ctx.scale(0.75, 0.75)
    ctx.font = "12px 微软雅黑,Verdana" // 字号肿么没有用? (ˉ(∞)ˉ)
    ctx.fillText("Come Baby", 23, 10)
    ctx.restore()
  }
  clear() {
    const ctx = this.tree!.ctx!,
      cirle = this.cirle
    const point = cirle.point,
      scale = cirle.scale,
      radius = 26
    const h = radius * scale
    const w = h
    ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h)
  }
  hover(x: number, y: number) {
    const ctx = this.tree!.ctx!
    const pixel = ctx.getImageData(x, y, 1, 1)
    return pixel.data[3] == 255
  }
}
