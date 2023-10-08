<template>
  <div class="is-typed">
    <span class="typed">{{ isPlayOver ? text : writedStr }}</span>
    <span :class="{ cursor: !isWriteCompleted && !isPlayOver }">&nbsp;</span>
  </div>
</template>

<script setup lang="ts" name="EPTypeWriter">
import { inject, onMounted, ref } from "vue"

interface EPTypeWriterProps {
  text: string
  typeSpeed?: number
}

const props = withDefaults(defineProps<EPTypeWriterProps>(), {
  text: "",
  typeSpeed: 200
})
const emits = defineEmits(["typed"])

const isPlayOver = inject("isPlayOver")

const charIndex = ref(0)
const writedStr = ref("")
const isWriteCompleted = ref(false)

const typeWriter = () => {
  if (charIndex.value < props.text.length) {
    writedStr.value += props.text.charAt(charIndex.value)
    charIndex.value++
    setTimeout(typeWriter, props.typeSpeed)
  } else {
    isWriteCompleted.value = true
    emits("typed")
  }
}

onMounted(() => {
  setTimeout(typeWriter, props.typeSpeed)
})
</script>

<style lang="scss" scoped>
.is-typed span.cursor {
  margin-left: 2px;
  line-height: 1;
  display: inline-block;
  width: 1px;
  background-color: black;
}
</style>
