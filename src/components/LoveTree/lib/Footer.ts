import { Point } from "./Point"
import { Tree } from "./Tree"

export class Footer {
  tree: Tree
  width: number
  height: number
  speed: number
  point: Point
  length = 0
  constructor(tree: Tree, width: number, height: number, speed: number) {
    this.tree = tree
    this.point = new Point(tree.seed!.heart.point.x, tree.height - height / 2)
    this.width = width
    this.height = height
    this.speed = speed || 2
    this.length = 0
  }

  draw() {
    var ctx = this.tree.ctx!,
      point = this.point
    var len = this.length / 2

    ctx.save()
    ctx.strokeStyle = "rgb(35, 31, 32)"
    ctx.lineWidth = this.height
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.translate(point.x, point.y)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(len, 0)
    ctx.lineTo(-len, 0)
    ctx.stroke()
    ctx.restore()

    if (this.length < this.width) {
      this.length += this.speed
    }
  }
}
