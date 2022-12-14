<script setup lang="ts">
// Composables
import { useImage } from "@/composables/useImage";

// Data
const edges = [
  { id: 1, name: "front", className: "black", img: "logo-black.svg" },
  { id: 2, name: "back", className: "black", img: "logo-black.svg" },
  { id: 3, name: "right", className: "white", img: "logo-white.svg" },
  { id: 4, name: "left", className: "white", img: "logo-white.svg" },
  { id: 5, name: "top", className: "black", img: "logo-black.svg" },
  { id: 6, name: "bottom", className: "white", img: "logo-white.svg" },
];
</script>

<template>
  <div class="scene">
    <router-link :to="{ name: 'home' }">
      <div class="cube">
        <span
          v-for="(edge, index) in edges"
          :key="`edge-${index}`"
          :class="['cube-edge', `cube-${edge.name}`, `cube-${edge.className}`]"
        >
          <img alt="Demetory" :src="useImage(edge.img)" />
        </span>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
$cube-size: 100px;
$cube-bg-color: #000;
$cube-duration: 60s;

$rotate-default: (
  "front": rotateY(0deg),
  "right": rotateY(90deg),
  "back": rotateY(180deg),
  "left": rotateY(-90deg),
  "top": rotateX(90deg),
  "bottom": rotateX(-90deg),
);

$rotate-animaton: (
  0%: rotateY(0deg),
  16.6%: rotateX(90deg),
  33.2%: rotateY(-90deg),
  49.8%: rotateY(-180deg),
  65.4%: rotateX(-90deg),
  82%: rotateY(90deg),
  100%: rotateY(0deg),
);

.scene {
  z-index: 1;
  display: flex;
  width: $cube-size;
  height: $cube-size;
  justify-content: center;
  align-items: center;
  perspective: 1000;
}

.cube {
  position: relative;
  width: $cube-size;
  height: $cube-size;
  transform-style: preserve-3d;
  transform: translateZ(calc($cube-size/2));
  transition: transform 1s;
  animation-name: spincube;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: $cube-duration;
  transform-style: preserve-3d;
  transform-origin: center;

  &-edge {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    line-height: $cube-size;
    text-align: center;
    background-color: $cube-bg-color;
    border: solid 1px #000;
  }

  @each $name, $rotate in $rotate-default {
    .cube-#{$name} {
      transform: $rotate translateZ(calc($cube-size/2));
    }
  }
}

@keyframes spincube {
  @each $percent, $rotate in $rotate-animaton {
    #{$percent} {
      transform: translateZ(calc($cube-size/2)) $rotate;
    }
  }
}

@media screen and (max-width: 800px) {
  $cube-size: 60px;
  .scene,
  .cube {
    width: $cube-size;
    height: $cube-size;
  }

  .cube {
    transform: translateZ(calc($cube-size/2));

    &-edge {
      line-height: $cube-size;
    }

    @each $name, $rotate in $rotate-default {
      .cube-#{$name} {
        transform: $rotate translateZ(calc($cube-size/2));
      }
    }
  }

  @keyframes spincube {
    @each $percent, $rotate in $rotate-animaton {
      #{$percent} {
        transform: translateZ(calc($cube-size/2)) $rotate;
      }
    }
  }
}
</style>
