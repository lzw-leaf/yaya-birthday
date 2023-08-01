<template>
  <canvas
    class="love-tree"
    id="canvas"
    :width="width"
    :height="height"
    @click="onStartAnimateClick"
    @mousemove="onMousemoveSeed"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Tree } from "./lib/Tree"
import { Seed } from "./lib/Seed"
import { Footer } from "./lib/Footer"
const width = 1100
const height = 680
const opts = {
  seed: {
    x: width / 2 - 20,
    color: "rgb(190, 26, 37)",
    scale: 2
  },
  branch: [
    [
      535,
      680,
      570,
      250,
      500,
      200,
      30,
      100,
      [
        [
          540,
          500,
          455,
          417,
          340,
          400,
          13,
          100,
          [[450, 435, 434, 430, 394, 395, 2, 40]]
        ],
        [
          550,
          445,
          600,
          356,
          680,
          345,
          12,
          100,
          [[578, 400, 648, 409, 661, 426, 3, 80]]
        ],
        [539, 281, 537, 248, 534, 217, 3, 40],
        [
          546,
          397,
          413,
          247,
          328,
          244,
          9,
          80,
          [
            [427, 286, 383, 253, 371, 205, 2, 40],
            [498, 345, 435, 315, 395, 330, 4, 60]
          ]
        ],
        [
          546,
          357,
          608,
          252,
          678,
          221,
          6,
          100,
          [[590, 293, 646, 277, 648, 271, 2, 80]]
        ]
      ]
    ]
  ],
  bloom: {
    num: 700,
    width: 1080,
    height: 650
  },
  footer: {
    width: 1200,
    height: 5,
    speed: 10
  }
}
let canvas = null as unknown as HTMLCanvasElement
let tree = null as unknown as Tree
let seed = null as unknown as Seed
let foot = null as unknown as Footer
const clickFlag = ref(false)
const hold = ref(1)

// 点击爱心开始播放动画
const onStartAnimateClick = (e: MouseEvent) => {
  if (clickFlag.value) return
  const x = e.pageX - canvas.offsetLeft
  const y = e.pageY - canvas.offsetTop
  if (seed.hover(x, y)) {
    clickFlag.value = true
    canvas.classList.remove("hand")
    runAnimation()
  }
}

const onMousemoveSeed = (e: MouseEvent) => {
  if (clickFlag.value) return
  const x = e.pageX - canvas.offsetLeft
  const y = e.pageY - canvas.offsetTop
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
      setTimeout(() => reslove(console.log("触发落地")), 10)
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

const flowAnimate = async () => {
  do {
    tree.flower(2)
    await new Promise(reslove => {
      setTimeout(() => reslove(""), 10)
    })
  } while (tree.canFlower())
}

const moveAnimate = async () => {
  tree.snapshot("p1", 240, 0, 610, 680)
  while (tree.move("p1", 500, 0)) {
    foot.draw()
    await new Promise(reslove => {
      setTimeout(() => reslove(""), 10)
    })
  }
  foot.draw()
  tree.snapshot("p2", 500, 0, 610, 680)

  // 会有闪烁不得意这样做, (＞﹏＜)
  // canvas
  //   .parent()
  //   .css("background", "url(" + tree.toDataURL("image/png") + ")")
  // canvas.css("background", "#ffe")
  await new Promise(reslove => {
    setTimeout(() => reslove(""), 300)
  })
  // canvas.css("background", "none")
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
.love-tree {
  &.hand {
    cursor: pointer;
  }
}
</style>
