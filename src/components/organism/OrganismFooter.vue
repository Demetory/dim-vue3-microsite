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
    <div class="col">
      <span>It's {{ dateClock }} by me.</span>
      <span>{{ getContactState }}</span>
    </div>
    <div class="col">
      <span class="shop"><a href="https://shop.demetrey.ru/" rel="noopener noreferrer">shop.demetrey.ru</a></span>
      <span>{{ getYear }} &copy; Demetory</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  .col {
    display: flex;
    flex-direction: row;
    flex: 1;

    &:first-of-type {
      span:not(:last-of-type) {
        margin-right: 0.6rem;
      }
    }

    &:last-of-type {
      justify-content: flex-end;
      span:not(:last-of-type) {
        margin-right: calc(grid.$gap * 2);
      }
    }

    @media screen and (max-width: 800px) {
      flex-direction: column;
      line-height: 2.8rem;

      &:last-of-type {
        align-items: flex-end;
        span:not(:last-of-type) {
          margin-right: 0;
        }
      }
    }

    @media screen and (max-width: 480px) {
      font-size: 1.3rem;
    }
  }
}
/*
footer {
  span:not(:last-of-type) {
    padding-right: 0.6rem;
  }
  span.shop {
    margin-left: auto;
    margin-right: calc(grid.$gap * 2);
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
*/
</style>
