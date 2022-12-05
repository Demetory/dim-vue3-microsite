<template>
  <div class="noise"></div>
</template>

<style scoped lang="scss">
.noise {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;

  &::after {
    content: "";
    position: fixed;
    top: -110%;
    left: -50%;
    width: 300%;
    height: 300%;
    -webkit-animation: grain 8s steps(10) infinite;
    animation: grain 8s steps(10) infinite;
    background-image: url(@/assets/images/noise.jpg);
    opacity: 0.06;
  }

  @keyframes grain {
    0%,
    to {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    10% {
      -webkit-transform: translate(-5%, -10%);
      transform: translate(-5%, -10%);
    }
    20% {
      -webkit-transform: translate(-15%, 5%);
      transform: translate(-15%, 5%);
    }
    30% {
      -webkit-transform: translate(7%, -25%);
      transform: translate(7%, -25%);
    }
    40% {
      -webkit-transform: translate(-5%, 25%);
      transform: translate(-5%, 25%);
    }
    50% {
      -webkit-transform: translate(-15%, 10%);
      transform: translate(-15%, 10%);
    }
    60% {
      -webkit-transform: translate(15%);
      transform: translate(15%);
    }
    70% {
      -webkit-transform: translateY(15%);
      transform: translateY(15%);
    }
    80% {
      -webkit-transform: translate(3%, 35%);
      transform: translate(3%, 35%);
    }
    90% {
      -webkit-transform: translate(-10%, 10%);
      transform: translate(-10%, 10%);
    }
  }
}
</style>
