<template>
  <VueWriter
    v-for="(poetry, index) of poetryList"
    v-show="index === currentIndex"
    :key="poetry[0] + index"
    :array="poetry"
    :iterations="1"
    @typed="onTyped"
  >
  </VueWriter>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import VueWriter from "vue-writer"
const currentIndex = ref(0)
const onTyped = () => {
  console.log("触发事件")
}
const poetryList = ref([
  ["sfsf"],
  ["sfsf"],
  ["sfsf"],
  ["sfsf"],
  ["sfsf"],
  ["sfsf"]
])

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
