export class Point {
  x = 0
  y = 0

  constructor(x: number, y: number) {
    this.x = x || 0
    this.y = y || 0
  }

  clone() {
    return new Point(this.x, this.y)
  }

  add(oldPoint: Point) {
    const point = this.clone()
    point.x += oldPoint.x
    point.y += oldPoint.y
    return point
  }

  sub(oldPoint: Point) {
    const point = this.clone()
    point.x -= oldPoint.x
    point.y -= oldPoint.y
    return point
  }

  div(n: number) {
    const point = this.clone()
    point.x /= n
    point.y /= n
    return point
  }

  mul(n: number) {
    const point = this.clone()
    point.x *= n
    point.y *= n
    return point
  }
}
