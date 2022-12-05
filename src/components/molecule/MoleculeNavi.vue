<script setup lang="ts">
// Modules
import { useContentStore } from "@/stores/contentStore";
import { useOverlayStore } from "@/stores/overlayStore";

// Components
import AtomFlipper from "@/components/atom/AtomFlipper.vue";
import AtomHamburger from "@/components/atom/AtomHamburger.vue";

// Data
const contentStore = useContentStore();
const overlayStore = useOverlayStore();

const folio = contentStore.data.navi.folio;
const contact = contentStore.data.navi.contact;
const resumee = contentStore.data.navi.resumee;

// Methods
const openMobileNavi = () => {
  overlayStore.isMobileMenuOpened = !overlayStore.isMobileMenuOpened;
};
</script>

<template>
  <section :class="[`navigation`, { 'navigation-mobile': overlayStore.isMobileMenuOpened }]">
    <nav class="navi navi-folio">
      <a
        v-for="(link, index) in folio"
        :href="link.url"
        :key="`link-${index}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.text }}
      </a>
    </nav>

    <nav class="navi navi-contact">
      <template v-for="(link, index) in contact" :key="`link-${index}`">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.text }}
        </a>
        <span v-if="index !== contact.length - 1"> && </span>
      </template>
    </nav>

    <nav class="navi navi-resumee">
      <h2>{{ resumee.label }}</h2>
      <AtomFlipper v-for="flipper in resumee.flippers" :key="`flipper-${flipper.img}`" :flipper="flipper" />
    </nav>

    <AtomHamburger @click.stop="openMobileNavi" :isOpened="overlayStore.isMobileMenuOpened" />
  </section>
</template>

<style scoped lang="scss">
.navigation {
  z-index: grid.$zindex-navi;
  display: flex;
  flex: 1;
}
.navi {
  display: flex;
  align-items: center;
  font-size: 2.2rem;

  &-folio,
  &-contact {
    margin-left: grid.$gap;

    a {
      position: relative;
      margin-left: grid.$gap;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 2px;
        background-color: colors.$white;
        transition: width grid.$transition;
      }

      &:hover {
        &::after {
          width: 0;
        }
      }
    }
  }

  &-contact {
    margin-left: calc(grid.$gap * 2);
    a,
    span {
      margin-left: calc(grid.$gap / 2);
    }
  }

  &-resumee {
    margin-left: auto;

    h2 {
      font-weight: 400;
    }

    .flip-container {
      margin-left: grid.$gap;
    }
  }
}

.navigation-mobile {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: calc(grid.$gap / 2);
  width: 100%;
  height: calc(100vh - grid.$gap);
  background-color: colors.$black;
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: linear;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (min-width: 640px) {
    display: none;
  }

  .navi {
    display: flex;
    margin-left: 0;
    align-items: flex-start;

    a {
      margin-left: 0;
      margin-bottom: 4rem;
      font-size: 4rem;
    }

    &-folio {
      order: 2;
      flex-direction: column;
      margin-top: auto;
    }
    &-contact {
      order: 3;
      flex-direction: column;

      span {
        display: none;
      }
    }
    &-resumee {
      order: 4;
      margin-top: auto;
      align-items: center;
      justify-content: flex-end;

      h2 {
        display: flex;
      }
    }
  }

  .hamburger {
    order: 1;
  }
}

@media screen and (max-width: 1024px) {
  .navi {
    font-size: 2rem;

    &-resumee h2 {
      display: none;
    }
  }
}

@media screen and (max-width: 800px) {
  .navi {
    font-size: 1.8rem;

    &-resumee h2 {
      display: none;
    }
    &-contact {
      margin-left: calc(grid.$gap);
    }
    &-folio {
      margin-left: calc(grid.$gap / 2);
    }
  }
}

@media screen and (max-width: 640px) {
  .navigation:not(.navigation-mobile) {
    .navi {
      display: none;
    }
  }
}
</style>
