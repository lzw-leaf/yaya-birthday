import { Point } from "./Point"
import { Tree } from "./Tree"
import { bezier } from "./utils"

export class Branch {
  tree: Tree | null
  point1: Point
  point2: Point
  point3: Point
  radius: number
  length: number
  branchs: Branch[]
  len = 0
  t = 0

  constructor(
    tree: Tree,
    point1: Point,
    point2: Point,
    point3: Point,
    radius: number,
    length: number,
    branchs: Branch[]
  ) {
    this.tree = tree
    this.point1 = point1
    this.point2 = point2
    this.point3 = point3
    this.radius = radius
    this.length = length || 100
    this.len = 0
    this.t = 1 / (this.length - 1)
    this.branchs = branchs || []
  }

  grow() {
    var s = this,
      p
    if (s.len <= s.length) {
      p = bezier([s.point1, s.point2, s.point3], s.len * s.t)
      s.draw(p)
      s.len += 1
      s.radius *= 0.97
    } else {
      s.tree!.removeBranch(s)
      s.tree!.addBranchs(s.branchs)
    }
  }
  draw(p: Point) {
    var s = this
    var ctx = s.tree!.ctx!
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "rgb(35, 31, 32)"
    ctx.shadowColor = "rgb(35, 31, 32)"
    ctx.shadowBlur = 2
    ctx.moveTo(p.x, p.y)
    ctx.arc(p.x, p.y, s.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}
