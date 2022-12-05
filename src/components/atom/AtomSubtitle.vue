<script setup lang="ts">
// Props
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <small>{{ message }}</small>
</template>

<style scoped lang="scss">
small {
  z-index: 200;
  position: fixed;
  display: block;
  bottom: calc(50% - 200px);
  right: calc(-400px + grid.$gap * 2);
  width: 400px;
  height: 12px;
  text-align: center;
  transform-origin: bottom left;
  transform: rotate(-90deg);
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: colors.$font-grey;
  opacity: 0.75;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
    height: 1px;
    width: 25px;
    background: colors.$font-grey;
  }
}

@media screen and (max-width: 800px) {
  small {
    right: calc(-400px + grid.$gap);
  }
}
</style>
