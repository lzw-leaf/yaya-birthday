import { Bloom } from "./Bloom"
import { Branch } from "./Branch"
import { Footer } from "./Footer"
import Heart from "./Heart"
import { Point } from "./Point"
import { Seed } from "./Seed"
import { inheart, random } from "./utils"

export class Tree {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  width = 0
  height = 0
  opt: Record<string, any> = {}
  record: Record<string, any> = {}
  seed: Seed | null = null
  footer: Footer | null = null
  branchs: Branch[] = []
  blooms: Bloom[] = []
  bloomsCache: Bloom[] = []
  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    opt: Record<string, any>
  ) {
    this.canvas = canvas
    console.log("canvas", canvas)

    this.ctx = canvas.getContext("2d")
    this.width = width
    this.height = height
    this.opt = opt || {}

    this.record = {}

    this.initSeed()
    this.initFooter()
    this.initBranch()
    this.initBloom()
  }

  initSeed() {
    const seed = this.opt.seed || {}
    const x = seed.x || this.width / 2
    const y = seed.y || this.height / 2
    const point = new Point(x, y)
    const color = seed.color || "#FF0000"
    const scale = seed.scale || 1

    this.seed = new Seed(this, point, scale, color)
  }

  initFooter() {
    const footer = this.opt.footer || {}
    const width = footer.width || this.width
    const height = footer.height || 5
    const speed = footer.speed || 2
    this.footer = new Footer(this, width, height, speed)
  }

  initBranch() {
    const branchs = this.opt.branch || []
    this.branchs = []
    this.addBranchs(branchs)
  }

  initBloom() {
    const bloom = this.opt.bloom || {}
    const cache = []
    const num = bloom.num || 500
    const width = bloom.width || this.width
    const height = bloom.height || this.height
    const figure = this.seed!.heart.figure
    const r = 240
    for (let i = 0; i < num; i++) {
      cache.push(this.createBloom(width, height, r, figure))
    }
    this.blooms = []
    this.bloomsCache = cache
  }

  toDataURL(type: string) {
    return this.canvas!.toDataURL(type)
  }

  draw(k: string) {
    const s = this
    const ctx = s.ctx!
    const rec = s.record[k]
    if (!rec) return

    const point = rec.point,
      image = rec.image

    ctx.save()
    ctx.putImageData(image, point.x, point.y)
    ctx.restore()
  }

  addBranch(branch: Branch) {
    this.branchs.push(branch)
  }

  addBranchs(branchs: any[]) {
    const tree = this
    var b, p1, p2, p3, r, l, c
    for (let i = 0; i < branchs.length; i++) {
      b = branchs[i]
      p1 = new Point(b[0], b[1])
      p2 = new Point(b[2], b[3])
      p3 = new Point(b[4], b[5])
      r = b[6]
      l = b[7]
      c = b[8]
      tree.addBranch(new Branch(tree, p1, p2, p3, r, l, c))
    }
  }

  removeBranch(branch: Branch) {
    const branchs = this.branchs
    for (let i = 0; i < branchs.length; i++) {
      if (branchs[i] === branch) {
        branchs.splice(i, 1)
      }
    }
  }

  canGrow() {
    return !!this.branchs.length
  }
  grow() {
    const branchs = this.branchs
    for (let i = 0; i < branchs.length; i++) {
      const branch = branchs[i]
      if (branch) {
        branch.grow()
      }
    }
  }

  addBloom(bloom: Bloom) {
    this.blooms.push(bloom)
  }

  removeBloom(bloom: Bloom) {
    const blooms = this.blooms
    for (let i = 0; i < blooms.length; i++) {
      if (blooms[i] === bloom) {
        blooms.splice(i, 1)
      }
    }
  }

  createBloom(
    width: number,
    height: number,
    radius: number,
    figure: Heart,
    color?: string,
    alpha?: number,
    angle?: number,
    scale?: number,
    place?: Point,
    speed?: number
  ) {
    let x, y
    while (true) {
      x = random(20, width - 20)
      y = random(20, height - 20)
      if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
        return new Bloom(
          this,
          new Point(x, y),
          figure,
          color,
          alpha,
          angle,
          scale,
          place,
          speed
        )
      }
    }
  }

  canFlower() {
    return !!this.blooms.length
  }
  flower(num: number) {
    const s = this
    let blooms = s.bloomsCache.splice(0, num)
    for (let i = 0; i < blooms.length; i++) {
      s.addBloom(blooms[i])
    }
    blooms = s.blooms
    for (let j = 0; j < blooms.length; j++) {
      blooms[j].flower()
    }
  }

  snapshot(k: string, x: number, y: number, width: number, height: number) {
    const ctx = this.ctx!
    const image = ctx.getImageData(x, y, width, height)
    this.record[k] = {
      image: image,
      point: new Point(x, y),
      width: width,
      height: height
    }
  }
  setSpeed(k: string, speed: number) {
    this.record[k || "move"].speed = speed
  }
  move(k: string, x: number, y: number) {
    const s = this
    const ctx = s.ctx!
    const rec = s.record[k || "move"]
    const point = rec.point,
      image = rec.image,
      speed = rec.speed || 10,
      width = rec.width,
      height = rec.height

    const i = point.x + speed < x ? point.x + speed : x
    const j = point.y + speed < y ? point.y + speed : y

    ctx.save()
    ctx.clearRect(point.x, point.y, width, height)
    ctx.putImageData(image, i, j)
    ctx.restore()

    rec.point = new Point(i, j)
    rec.speed = speed * 0.95

    if (rec.speed < 2) {
      rec.speed = 2
    }
    return i < x || j < y
  }

  jump() {
    const s = this,
      blooms = s.blooms
    if (blooms.length) {
      for (let i = 0; i < blooms.length; i++) {
        blooms[i].jump()
      }
    }
    if ((blooms.length && blooms.length < 3) || !blooms.length) {
      const bloom = this.opt.bloom || {},
        width = bloom.width || this.width,
        height = bloom.height || this.height,
        figure = this.seed!.heart.figure
      const r = 240

      for (let i = 0; i < random(1, 2); i++) {
        blooms.push(
          this.createBloom(
            width / 2 + width,
            height,
            r,
            figure,
            undefined,
            1,
            undefined,
            1,
            new Point(random(-100, 600), 720),
            random(200, 300)
          )
        )
      }
    }
  }
}
