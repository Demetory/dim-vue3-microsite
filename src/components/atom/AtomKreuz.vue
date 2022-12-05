<script setup lang="ts">
// Core
import { ref } from "vue";

// Modules
import { useEventListener } from "@vueuse/core";

// Data
const kreuz = ref(null);
let rotation = 0;

// Listeners
useEventListener(document, "wheel", (evt) => {
  evt.deltaY < 0 ? rotation-- : rotation++;

  // @ts-expect-error: nullable element
  kreuz.value.style.transform = "rotate(" + rotation * 10 + "deg)";
});
</script>

<template>
  <div ref="kreuz" class="kreuz" />
</template>

<style scoped lang="scss">
.kreuz {
  z-index: grid.$zindex-kreuz;
  position: fixed;
  top: calc(grid.$gap / 2);
  right: calc(grid.$gap / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: grid.$gap;
  height: grid.$gap;

  &::before,
  &::after {
    position: absolute;
    content: "";
    background-color: colors.$white;
  }

  &::before {
    width: 1px;
    height: 100%;
  }
  &::after {
    height: 1px;
    width: 100%;
  }
}
</style>
