<script setup lang="ts">
// Vue Core
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

// Modules
import { initApp } from "@/modules/initApp";
import { useEventListener } from "@vueuse/core";
import { useContentStore } from "@/stores/contentStore";
import { useOverlayStore } from "@/stores/overlayStore";

// Composables
import devtools from "@/composables/useDevTools";

// Components
import AtomHole from "@/components/atom/AtomHole.vue";
import AtomKreuz from "@/components/atom/AtomKreuz.vue";
import AtomNoise from "@/components/atom/AtomNoise.vue";
import AtomSubtitle from "@/components/atom/AtomSubtitle.vue";
import OrganismFooter from "@/components/organism/OrganismFooter.vue";
import MoleculeHeader from "@/components/molecule/MoleculeHeader.vue";
import MoleculeOverlay from "@/components/molecule/MoleculeOverlay.vue";

// Data
const route = useRoute();
const contentStore = useContentStore();
const overlayStore = useOverlayStore();
const slogan = contentStore.data.slogan;
const overlayMessage = ref("");

let devToolsOpened = devtools.isOpen ? true : false;
let devToolsOrientation = devtools.orientation ? devtools.orientation : "";

let deltaX = 0;
let deltaY = 0;
let mouseXOld = 0; // eslint-disable-line
let mouseYOld = 0; // eslint-disable-line

// Hooks
onBeforeMount(() => {
  initApp();
});

// Computed Properties
const getPageName = computed<string>(() => {
  return `page-${String(route.name)}`;
});

// Listeners
useEventListener(document, "keydown", (evt) => {
  if (evt.key !== undefined || evt.keyCode !== undefined) {
    if (evt.ctrlKey && (evt.key === "u" || evt.keyCode === 85)) {
      overlayMessage.value = contentStore.data.overlay.source;
      overlayStore.isOverlayOpened = true;
    }
    if (evt.key === "Escape" || evt.keyCode === 27) {
      if (overlayStore.isOverlayOpened) {
        overlayStore.isOverlayOpened = false;
      }
      if (overlayStore.isMobileMenuOpened) {
        overlayStore.isMobileMenuOpened = false;
      }
    }
  }
});

useEventListener(window, "devtoolschange", (evt) => {
  // @ts-expect-error: property inside custom event
  let eventData = evt.detail;
  devToolsOpened = eventData.isOpen ? true : false;
  devToolsOrientation = eventData.orientation ? eventData.orientation : "";

  if (devToolsOpened && devToolsOrientation) {
    overlayMessage.value = contentStore.data.overlay.devtools;
    overlayStore.isOverlayOpened = true;
  } else {
    overlayMessage.value = "";
    overlayStore.isOverlayOpened = false;
  }
});

useEventListener(window, "resize", () => {
  overlayMessage.value = "";
  overlayStore.isOverlayOpened = false;
  overlayStore.isMobileMenuOpened = false;
});

// Methods
function calculateDelta(event: any) {
  const speed = 100;
  const lines = document.querySelectorAll("[attr='parallaxed']");
  const hole = document.querySelector(".hole");

  let rect = document.body.getBoundingClientRect();
  let centerX = rect.width / 2;
  let centerY = rect.height / 2;

  mouseXOld = event.pageX;
  mouseYOld = event.pageY;
  deltaX = (centerX - event.pageX) / speed;
  deltaY = (centerY - event.pageY) / speed;

  for (let index = 0; index < lines.length; index++) {
    // @ts-expect-error: style not exist for Element
    lines[index].style = `transform: translate(${deltaX}px, ${deltaY * (index + 1)}px)`;
  }

  // @ts-expect-error: style not exist for Element
  hole.style = `transform: translate(${deltaX * 5}px, ${deltaY * 5}px)`;
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <MoleculeOverlay v-if="overlayStore.isOverlayOpened">
        <template #content>
          <h2>{{ overlayMessage }}</h2>
        </template>
      </MoleculeOverlay>
    </transition>

    <MoleculeHeader />
    <AtomKreuz />
    <AtomSubtitle :message="slogan" />
    <AtomNoise />

    <main :class="`page ${getPageName}`" v-on:mousemove="calculateDelta">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </main>

    <AtomHole />
    <OrganismFooter />
  </RouterView>
</template>
