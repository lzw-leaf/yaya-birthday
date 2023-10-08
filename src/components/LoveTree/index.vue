<template>
  <div id="loveTree">
    <audio id="audio" autoplay :src="loveMp3"></audio>
    <canvas
      class="love-tree"
      id="canvas"
      :width="width"
      :height="height"
      @click="onStartAnimateClick"
      @mousemove="onMousemoveSeed"
    >
    </canvas>
    <PoetryForYou v-if="poetryStart" class="love-poetry"></PoetryForYou>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Tree } from "./lib/Tree"
import { Seed } from "./lib/Seed"
import { Footer } from "./lib/Footer"
import PoetryForYou from "../PoetryForYou/index.vue"
import loveMp3 from "../../music/love.mp3"
const multiple = 1.5
const width = 1100 * multiple
const height = 680 * multiple
const opts = {
  seed: {
    x: width / 2 - 20,
    color: "rgb(190, 26, 37)",
    scale: 2
  },
  branch: [
    [
      535 * multiple,
      680 * multiple,
      570 * multiple,
      250 * multiple,
      500 * multiple,
      200 * multiple,
      30 * multiple,
      100 * multiple,
      [
        [
          540 * multiple,
          500 * multiple,
          455 * multiple,
          417 * multiple,
          340 * multiple,
          400 * multiple,
          13 * multiple,
          100 * multiple,
          [
            [
              450 * multiple,
              435 * multiple,
              434 * multiple,
              430 * multiple,
              394 * multiple,
              395 * multiple,
              2 * multiple,
              40 * multiple
            ]
          ]
        ],
        [
          550 * multiple,
          445 * multiple,
          600 * multiple,
          356 * multiple,
          680 * multiple,
          345 * multiple,
          12 * multiple,
          100 * multiple,
          [
            [
              578 * multiple,
              400 * multiple,
              648 * multiple,
              409 * multiple,
              661 * multiple,
              426 * multiple,
              3 * multiple,
              80 * multiple
            ]
          ]
        ],
        [
          539 * multiple,
          281 * multiple,
          537 * multiple,
          248 * multiple,
          534 * multiple,
          217 * multiple,
          3 * multiple,
          40 * multiple
        ],
        [
          546 * multiple,
          397 * multiple,
          413 * multiple,
          247 * multiple,
          328 * multiple,
          244 * multiple,
          9 * multiple,
          80 * multiple,
          [
            [
              427 * multiple,
              286 * multiple,
              383 * multiple,
              253 * multiple,
              371 * multiple,
              205 * multiple,
              2 * multiple,
              40 * multiple
            ],
            [
              498 * multiple,
              345 * multiple,
              435 * multiple,
              315 * multiple,
              395 * multiple,
              330 * multiple,
              4 * multiple,
              60 * multiple
            ]
          ]
        ],
        [
          546 * multiple,
          357 * multiple,
          608 * multiple,
          252 * multiple,
          678 * multiple,
          221 * multiple,
          6 * multiple,
          100 * multiple,
          [
            [
              590 * multiple,
              293 * multiple,
              646 * multiple,
              277 * multiple,
              648 * multiple,
              271 * multiple,
              2 * multiple,
              80 * multiple
            ]
          ]
        ]
      ]
    ]
  ],
  bloom: {
    num: 700 * multiple,
    width: 1080 * multiple,
    height: 650 * multiple,
    radius: 240 * multiple
  },
  footer: {
    width: 1200 * multiple,
    height: 5 * multiple,
    speed: 10 * multiple
  }
}
let canvas = null as unknown as HTMLCanvasElement
let tree = null as unknown as Tree
let seed = null as unknown as Seed
let foot = null as unknown as Footer

const clickFlag = ref(false)
const poetryStart = ref(false)

// 点击爱心开始播放动画
const onStartAnimateClick = (e: MouseEvent) => {
  if (clickFlag.value) return
  const x = e.offsetX - canvas.offsetLeft
  const y = e.offsetY - canvas.offsetTop
  if (seed.hover(x, y)) {
    clickFlag.value = true
    canvas.classList.remove("hand")
    const audioEl = document.getElementById("audio") as HTMLAudioElement
    audioEl.load()
    console.log([audioEl])

    runAnimation()
  }
}

const onMousemoveSeed = (e: MouseEvent) => {
  if (clickFlag.value) return
  const x = e.offsetX - canvas.offsetLeft
  const y = e.offsetY - canvas.offsetTop
  seed.hover(x, y)
    ? canvas.classList.add("hand")
    : canvas.classList.remove("hand")
}

const seedAnimate = async () => {
  console.log("开始播种")
  // 等待种子落地
  while (seed.canScale()) {
    seed.scale(0.95)
    await new Promise(reslove => {
      setTimeout(() => reslove(console.log("正在落地")), 10)
    })
  }
  console.log("地面展开")
  // 种子下落中开始地面展开
  while (seed.canMove()) {
    seed.move(0, 2)
    foot.draw()
    await new Promise(reslove => {
      setTimeout(() => reslove(console.log("地面展开中")), 10)
    })
  }
}

const growAnimate = async () => {
  do {
    // 树开始长大
    tree.grow()
    await new Promise(reslove => {
      setTimeout(() => reslove(console.log("树长大中")), 10)
    })
  } while (tree.canGrow())
}

/** 开花 */
const flowAnimate = async () => {
  do {
    tree.flower(2)
    console.log("开花~~~~~")

    await new Promise(reslove => {
      setTimeout(() => reslove(""), 10)
    })
  } while (tree.canFlower())
  console.log("变成爱心了！")
}

const moveAnimate = async () => {
  tree.snapshot("p1", 240 * multiple, 0, 610 * multiple, 680 * multiple)
  while (tree.move("p1", 500 * multiple, 0)) {
    foot.draw()
    await new Promise(reslove => {
      setTimeout(() => reslove(""), 10)
    })
  }
  foot.draw()
  tree.snapshot(
    "p2",
    500 * multiple,
    0 * multiple,
    610 * multiple,
    680 * multiple
  )

  // 会有闪烁不得意这样做, (＞﹏＜)
  const loveTreeEl = document.getElementById("loveTree")!
  loveTreeEl.style.background = `url(${tree.toDataURL("image/png")})`

  await new Promise(reslove => {
    setTimeout(() => reslove(""), 300)
  })
}

const jumpAnimate = async () => {
  while (true) {
    tree.ctx!.clearRect(0, 0, width, height)
    tree.jump()
    foot.draw()
    await new Promise(reslove => {
      setTimeout(() => reslove(""), 25)
    })
  }
}

const runAnimation = async () => {
  await seedAnimate()
  await growAnimate()
  await flowAnimate()
  await moveAnimate()
  console.log("开始文字答应")
  poetryStart.value = true
  await jumpAnimate()
}

const init = () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  tree = new Tree(canvas, width, height, opts)
  seed = tree.seed!
  foot = tree.footer!
  seed.draw()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
#loveTree {
  position: relative;

  .love-tree {
    &.hand {
      cursor: pointer;
    }
  }
  .love-poetry {
    position: absolute;
    top: 50px;
    left: 10%;
    z-index: -1;
  }
}
</style>
