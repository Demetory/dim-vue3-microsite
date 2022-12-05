<template>
  <div class="hole">
    <i v-for="i in 10" :key="`hole-${i}`"></i>
  </div>
</template>

<style scoped lang="scss">
$hole-size: 280px;
$hole-color: rgba(255, 255, 255, 0.5);
$hole-iteration: 0;
$hole-duration: 3s;

.hole {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: calc(50% + $hole-size);
  opacity: 0.1;
  transition: all 0.05s ease-in-out;

  i {
    position: absolute;
    display: block;
    left: calc(($hole-size / 2) * -1);
    top: calc(($hole-size / 2) * -1);
    width: $hole-size;
    height: $hole-size;
    border-radius: $hole-size;
    opacity: 0;
    animation-name: scale;
    animation-duration: $hole-duration;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @for $i from 1 through 10 {
    $hole-iteration: $hole-iteration + 0.3;
    i:nth-child(#{$i}) {
      animation-delay: $hole-iteration + s;
    }
  }

  @keyframes scale {
    0% {
      opacity: 0;
      transform: scale(2);
      box-shadow: 0px 0px 50px $hole-color;
    }
    50% {
      opacity: 1;
      transform: scale(1) translate(0px, -5px);
      box-shadow: 0px 8px 20px $hole-color;
    }
    100% {
      opacity: 0;
      transform: scale(0.1) translate(0px, 5px);
      box-shadow: 0px 10px 20px $hole-color;
    }
  }
}

@media screen and (max-width: 1280px) {
  .hole {
    left: calc(40% + $hole-size);
  }
}

@media screen and (max-width: 1024px) {
  $hole-size: 200px;
  .hole {
    left: calc(30% + $hole-size);

    i {
      width: $hole-size !important;
      height: $hole-size !important;
    }
  }
}

@media screen and (max-width: 800px) {
  .hole {
    left: calc(50% + 50px);
  }
}

@media screen and (max-width: 480px) {
  $hole-size: 140px;

  .hole {
    left: calc(50% + 70px);

    i {
      width: $hole-size !important;
      height: $hole-size !important;
    }
  }
}
</style>
