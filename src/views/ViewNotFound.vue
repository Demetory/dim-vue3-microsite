<script setup lang="ts">
// Modules
import { useContentStore } from "@/stores/contentStore";

// Components
import AtomHeading from "@/components/atom/AtomHeading.vue";

// Data
const contentStore = useContentStore();
const heading = contentStore.data.heading.notfound;
</script>

<template>
  <article>
    <AtomHeading :heading="heading" />
  </article>
</template>
