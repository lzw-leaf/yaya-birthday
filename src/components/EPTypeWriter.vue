<template>
  <div class="is-typed">
    <span class="typed">{{ writedStr }}</span>
    <span :class="{ cursor: !isWriteCompleted }">&nbsp;</span>
  </div>
</template>

<script setup lang="ts" name="EPTypeWriter">
import { onMounted, ref } from "vue"

interface EPTypeWriterProps {
  text: string
  typeSpeed: number
}

const props = withDefaults(defineProps<EPTypeWriterProps>(), {
  text: "",
  typeSpeed: 200
})
const emits = defineEmits(["typed"])

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
