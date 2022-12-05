<script setup lang="ts">
// Modules
import { useOverlayStore } from "@/stores/overlayStore";

// Components
import AtomButtonClose from "@/components/atom/AtomButtonClose.vue";

// Data
const overlayStore = useOverlayStore();

// Methods
const closeOverlay = () => {
  overlayStore.isOverlayOpened = !overlayStore.isOverlayOpened;
};
</script>

<template>
  <section class="overlay">
    <AtomButtonClose @click.stop="closeOverlay" />
    <div class="overlay-body">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.overlay {
  z-index: grid.$zindex-top;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: grid.$gap;
  width: 100vw;
  height: 100vh;
  font-size: 10rem;
  font-weight: 900;
  transition: all 0.5s ease-in-out;
  background: rgba(0, 0, 0, 0.9);
  user-select: none;

  &-body {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    :slotted(h2) {
      font-size: 7rem;
      font-weight: 900;
    }
  }
}
</style>
