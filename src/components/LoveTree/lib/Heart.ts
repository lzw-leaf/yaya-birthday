import { Point } from "./Point"

export default class Heart {
  points: Point[] = []
  length = 0
  constructor() {
    // 爱心的函数方程
    // x = 16 sin^3 t
    // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
    // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
    const points = []
    let x = 0
    let y = 0
    let t = 0
    for (let i = 10; i < 30; i += 0.2) {
      t = i / Math.PI
      x = 16 * Math.pow(Math.sin(t), 3)
      y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      points.push(new Point(x, y))
    }
    this.points = points
    this.length = points.length
  }

  get(index: number, scale?: number) {
    return this.points[index].mul(scale || 1)
  }
}
