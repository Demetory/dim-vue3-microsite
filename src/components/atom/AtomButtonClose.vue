<template>
  <div class="btn-close" />
</template>

<style scoped lang="scss">
.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 60px;
  height: 60px;
  background-color: colors.$white;
  transition: background-color grid.$transition;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: "";
    background-color: colors.$black;
    transform: rotate(45deg);
  }

  &::before {
    width: 4px;
    height: 50%;
  }
  &::after {
    height: 4px;
    width: 50%;
  }

  &:active {
    background-color: colors.$grey;
  }
}
</style>
