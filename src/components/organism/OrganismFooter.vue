<script setup lang="ts">
// Core
import { ref, computed, onBeforeUnmount } from "vue";

// Modules
import { useContentStore } from "@/stores/contentStore";

// Composables
import { useDateTZ, useDateToRoman } from "@/composables/useDate";

// Data
const contentStore = useContentStore();
const daytimeMsg = contentStore.data.daytime;
const intervalTimerID = setInterval(updateTime, 1000);
const date = ref(new Date());
const dateTZ = ref(new Date());
const dateHour = ref(dateTZ.value.getHours());
const dateClock = ref(new String(dateTZ.value.getHours() + ":" + dateTZ.value.getMinutes()));

// Hooks
onBeforeUnmount(() => {
  clearInterval(intervalTimerID);
});

// Computed Properties
const getYear = computed(() => {
  return new String(useDateToRoman(dateTZ.value.getFullYear()));
});

const getContactState = computed(() => {
  return dateHour.value >= 10 && dateHour.value <= 23 ? daytimeMsg.true : daytimeMsg.false;
});

// Methods
function updateTime() {
  date.value = new Date();
  dateTZ.value = useDateTZ(date.value, "Asia/Jakarta");

  let hour: string | number = dateTZ.value.getHours();
  let minute: string | number = dateTZ.value.getMinutes();

  dateHour.value = hour;

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  dateClock.value = `${hour}:${minute}`;
}
</script>

<template>
  <footer>
    <span>It's {{ dateClock }} by me.</span>
    <span>{{ getContactState }}</span>
    <span>{{ getYear }} &copy; Demetory</span>
  </footer>
</template>

<style scoped lang="scss">
footer {
  span:not(:last-of-type) {
    padding-right: 0.6rem;
  }
  span:last-child {
    margin-left: auto;
  }
}

@media screen and (max-width: 800px) {
  footer {
    flex-wrap: wrap;
    span:first-of-type {
      display: flex;
      padding-bottom: 8px;
      width: 100%;
    }
  }
}

@media screen and (max-width: 480px) {
  footer {
    span {
      font-size: 1.3rem;
    }
  }
}
</style>
