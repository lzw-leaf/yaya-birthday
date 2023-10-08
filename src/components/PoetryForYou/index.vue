<template>
  <div class="poetry">
    <div class="poetry__title">你</div>
    <template v-for="(poetry, index) of poetryList">
      <Transition name="fade" mode="out-in">
        <PoetryBoard
          class="poetry-board"
          v-if="index <= currentIndex"
          :key="index"
          :textList="poetry"
          @typed="onTyped"
        >
        </PoetryBoard>
      </Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue"
import PoetryBoard from "./PoetryBoard.vue"

const currentIndex = ref(0)
const isTransition = ref(true)
const isPlayOver = ref(false)
provide("isPlayOver", isPlayOver)
const onTyped = () => {
  if (currentIndex.value >= poetryList.value.length - 1)
    return (isPlayOver.value = true)
  isTransition.value = false
  setTimeout(() => {
    isTransition.value = true
  }, 500)

  currentIndex.value++

  console.log("触发事件")
}

const poetryList = ref([
  ["你就像那冬日柔亮的暖阳", "照亮我的心房", "融化了伪造的心墙"],
  ["你就像那荒漠远处的绿意", "激发我的力量", "驱散了灰色的彷徨"],
  ["你就像那丛林穿梭的溪流", "抚平我的眉间", "平息了晦涩的躁狂"],
  ["你像天边飘渺的云", "你像家中温暖的窝"],
  ["你像孩童手中的甜", "你像大人梦中的乐"],
  ["你是我过去美好的猜想", "你是我现在手中的紧握", "你是我未来坚定的执着"],
  ["愿生活如愿，愿你我携手,勇往直前!"],
  ["今天是丫丫值得纪念的日子，祝丫丫生日快乐!", "--咩咩--"]
])

onMounted(() => {})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.poetry {
  line-height: 2;
  width: 400px;
  font-size: 16px;
  color: rgb(255, 136, 136);
  .poetry__title {
    font-size: 30px;
    font-weight: 600;
    color: rgb(255, 85, 85);
    margin-bottom: 30px;
  }
  .poetry-board {
    margin-top: 20px;
  }
}
</style>
