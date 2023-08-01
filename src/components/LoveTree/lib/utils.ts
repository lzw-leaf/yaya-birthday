import { Point } from "./Point"

export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function bezier(cp: Point[], t: number) {
  var p1 = cp[0].mul((1 - t) * (1 - t))
  var p2 = cp[1].mul(2 * t * (1 - t))
  var p3 = cp[2].mul(t * t)
  return p1.add(p2).add(p3)
}

export function inheart(x: number, y: number, r: number) {
  // x^2+(y-(x^2)^(1/3))^2 = 1
  // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
  var z =
    ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) -
    (x / r) * (x / r) * (y / r) * (y / r) * (y / r)
  return z < 0
}
