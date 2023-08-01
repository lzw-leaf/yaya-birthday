<template>
  <div>
    <template v-for="(poetry, index) of textList">
      <EPTypeWriter
        v-if="currentIndex >= index"
        :key="poetry[0] + index"
        :text="poetry"
        @typed="onTyped"
      >
      </EPTypeWriter>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import EPTypeWriter from "./EPTypeWriter.vue"
interface PoetryBoardProps {
  textList: string[]
}

const props = withDefaults(defineProps<PoetryBoardProps>(), {
  textList: () => [""]
})
const emits = defineEmits(["typed"])
const currentIndex = ref(0)
const onTyped = () => {
  currentIndex.value++
  if (currentIndex.value > props.textList.length - 1) {
    setTimeout(() => emits("typed"), 1000)
  }
}
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
