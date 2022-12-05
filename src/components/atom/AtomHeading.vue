<script setup lang="ts">
// Types
import type { IHeading } from "@/types/IHeading";

// Props
defineProps({
  heading: {
    type: Object as () => IHeading,
    required: true,
  },
});
</script>

<template>
  <section class="heading">
    <div v-if="heading.digit" class="heading__col heading__col-digit">
      <h2 class="heading__line">{{ heading.digit }}</h2>
    </div>
    <div class="heading__col">
      <h2 v-for="(line, index) in heading.lines" :key="`line-${index}`" class="heading__line" attr="parallaxed">
        {{ line }}
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: 6rem;

  &__col,
  &__col-digit {
    display: flex;
    flex-direction: column;
  }

  &__col-digit {
    .heading__line {
      margin-top: -0.4vw;
      font-size: 31vw;
      line-height: 26vw;
    }
  }

  &__line {
    text-transform: uppercase;
    font-size: 10vw;
    font-weight: 900;
    letter-spacing: -5px;
    line-height: 8.5vw;

    background: -webkit-gradient(linear, left top, left bottom, from(colors.$black), to(colors.$font-grey));
    background: linear-gradient(colors.$black, colors.$font-grey);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    user-select: none;

    transition: all 0.05s ease-in-out;
  }

  @media screen and (max-width: 640px) {
    flex-direction: column;

    &__line {
      font-size: 12vw;
      line-height: 11vw;
    }
  }
}
</style>
