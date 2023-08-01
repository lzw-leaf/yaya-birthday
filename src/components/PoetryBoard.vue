<template>
  <EPTypeWriter
    v-for="(poetry, index) of textList"
    v-show="currentIndex >= index"
    :key="poetry[0] + index"
    :text="poetry"
    @typed="currentIndex = index + 1"
  >
  </EPTypeWriter>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

interface PoetryBoardProps {
  textList: string[]
}

const props = withDefaults(defineProps<PoetryBoardProps>(), {
  textList: () => [""]
})
const emits = defineEmits(["typed"])

const currentIndex = ref(0)

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
