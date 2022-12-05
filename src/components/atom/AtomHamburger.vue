<script setup lang="ts">
// Props
defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="[`hamburger`, { 'hamburger-opened': isOpened }]">
    <span v-for="index in 4" :key="`span-${index}`" />
  </div>
</template>

<style scoped lang="scss">
$hamburger-size: 60px;
$hamburger-bg-menu: #ececec;
$hamburger-bg-open: #000;
$hamburger-zindex: 21000;
$hamburger-transition: all 0.25s ease-in-out;

.hamburger {
  margin-left: auto;
  display: none;
  width: $hamburger-size;
  height: $hamburger-size;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);
  transition: $hamburger-transition;
  background-color: $hamburger-bg-menu;
  cursor: pointer;
  z-index: $hamburger-zindex;

  span {
    display: flex;
    position: absolute;
    height: 6px;
    width: 60%;
    background-color: colors.$black;
    opacity: 1;
    transform: rotate(0deg);
    transition: $hamburger-transition;
    cursor: pointer;
  }

  span:nth-child(1) {
    top: calc(50% - 18px);
  }
  span:nth-child(2) {
    bottom: calc(50% - 18px);
  }
  span:nth-child(3) {
    top: calc(50% - 3px);
  }
  span:nth-child(4) {
    top: 50%;
    width: 0%;
  }

  &-opened span:nth-child(3),
  &-opened span:nth-child(4) {
    width: 50%;
  }
  &-opened span:nth-child(1),
  &-opened span:nth-child(2) {
    width: 0%;
  }
  &-opened span:nth-child(3) {
    top: calc(50% - 3px);
    transform: rotate(45deg);
  }
  &-opened span:nth-child(4) {
    top: calc(50% - 3px);
    transform: rotate(-45deg);
  }
}

@media screen and (max-width: 640px) {
  .hamburger {
    display: flex;
  }
}
</style>
