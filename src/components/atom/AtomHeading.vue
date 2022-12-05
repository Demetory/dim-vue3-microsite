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
    <div v-if="heading.digit" class="col">
      <h2 class="headline headline-digit">2</h2>
    </div>
    <div class="col">
      <h2 v-for="(line, index) in heading.lines" :key="`line-${index}`" class="headline" attr="parallaxed">
        {{ line }}
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  align-items: flex-end;
  height: 37.5rem;
  margin-top: auto;
  margin-bottom: 4rem;

  .col {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
  }

  .headline {
    display: flex;
    font-weight: 900;
    color: colors.$font-grey;
    text-transform: uppercase;
    background: -webkit-gradient(linear, left top, left bottom, from(colors.$black), to(colors.$font-grey));
    background: linear-gradient(colors.$black, colors.$font-grey);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    user-select: none;
    letter-spacing: -5px;
    transition: all 0.05s ease-in-out;
    font-size: 15rem;
    line-height: 12.5rem;

    &-digit {
      font-size: 46.5rem;
      line-height: 37.5rem;
    }
  }
}

@media screen and (max-width: 1440px) {
  .heading {
    height: 33rem;
    .headline {
      font-size: 13rem;
      line-height: 11rem;

      &-digit {
        font-size: 41rem;
        line-height: 33rem;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .heading {
    height: 27rem;
    .headline {
      font-size: 11rem;
      line-height: 9rem;

      &-digit {
        font-size: 34rem;
        line-height: 27rem;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .heading {
    height: 22.5rem;
    .headline {
      font-size: 8.5rem;
      line-height: 7.5rem;

      &-digit {
        font-size: 27.5rem;
        line-height: 22.5rem;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .heading {
    height: 18rem;
    .headline {
      font-size: 7rem;
      line-height: 6rem;

      &-digit {
        font-size: 22rem;
        line-height: 18rem;
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .heading {
    flex-direction: column;
    align-items: flex-start;
    margin-top: auto;
    height: 36rem;
  }
}

@media screen and (max-width: 480px) {
  .heading {
    .headline {
      font-size: 5rem;
      line-height: 5rem;

      &-digit {
        font-size: 22rem;
        line-height: 18rem;
      }
    }
  }
}
</style>
