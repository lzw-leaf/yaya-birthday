<script setup lang="ts">
import LoveTree from "./components/LoveTree/index.vue"
</script>

<template>
  <div class="app">
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
  .app__body {
    position: relative;
    .body__poetry {
      position: absolute;
      top: 30%;
      left: 30%;
      line-height: 1.5;
    }
  }
}
</style>
