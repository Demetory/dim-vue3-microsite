<script setup lang="ts">
// Core
import { computed } from "vue";

// Composables
import { useImage } from "@/composables/useImage";

// Types
import type { IFlipper } from "@/types/IFlipper";

// Props
const props = defineProps({
  flipper: {
    type: Object as () => IFlipper,
    required: true,
  },
});

// Computed Properties
const getSize = computed(() => {
  return new String(props.flipper.size + "px");
});
</script>

<template>
  <div class="flip-container">
    <a :href="flipper.url" target="_blank" rel="noopener noreferrer">
      <span class="front"><img alt="Demetory - Flipper" :src="useImage(`${flipper.img}-front.svg`)" /></span>
      <span class="back"><img alt="Demetory - Flipper" :src="useImage(`${flipper.img}-back.svg`)" /></span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.flip-container {
  display: inline-flex;
  flex: 0 1 auto;
  perspective: 1000px;
  width: v-bind(getSize);
  height: 60px;

  &:hover {
    > a {
      transform: rotateY(180deg);
    }
  }

  > a {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    transition: grid.$transition;
    transform-style: preserve-3d;

    .back,
    .front {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .front {
      z-index: 2;
      transform: rotateY(0deg);
    }

    .back {
      z-index: 1;
      transform: rotateY(180deg);
    }
  }
}
</style>
