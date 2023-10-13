<script setup lang="ts">
import { onBeforeMount, provide, ref } from "vue"
import LoveTree from "./components/LoveTree/index.vue"

const widthScale = ref(1)
const heightScale = ref(1)
provide(widthScale, widthScale)
provide(heightScale, heightScale)
const updateScreenScale = () => {
  widthScale.value = window.innerWidth / 1920
  heightScale.value = window.innerHeight / 1080
}
onBeforeMount(() => {
  updateScreenScale()
  window.addEventListener("resize", updateScreenScale)
})
</script>

<template>
  <div class="app" :style="{ scale: widthScale }">
    <LoveTree></LoveTree>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
}
</style>
