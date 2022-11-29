<template>
  <div class="app">
    <async-counter
      v-for="(counter, index) in state.counterList"
      :key="counter.text + index"
      :icon-class="counter.class"
      :text="counter.text"
      :value="counter.initValue"
    ></async-counter>
  </div>
</template>
<script setup lang="ts">
import {
  defineAsyncComponent,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import { reactive } from "vue";
const AsyncCounter = defineAsyncComponent(
  () => import("@/components/Counter.vue")
);
const state = reactive({
  counterList: [
    {
      class: "fa-youtube",
      value: 5000,
      initValue: 0,
      text: "YouTube Subscribers",
      timer: 0,
    },
    {
      class: "fa-facebook",
      value: 7500,
      initValue: 0,
      text: "Facebook Fans",
      timer: 0,
    },
    {
      class: "fa-twitter",
      value: 12000,
      initValue: 0,
      text: "Twitter Followers",
      timer: 0,
    },
  ],
});
const startCounter = () => {
  state.counterList.forEach((counter) => {
    const updateCounter = () => {
      const value = counter.value;
      const increament = value / 100;
      if (counter.initValue < value) {
        counter.initValue += increament;
        counter.timer = window.setTimeout(updateCounter, 60);
      } else {
        counter.initValue = value;
        clearTimeout(counter.timer);
      }
    };
    updateCounter();
  });
};
onMounted(() => {
  startCounter();
});
onUnmounted(() => {});
</script>
<style lang="scss" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  background: linear-gradient(135deg, #ebaf72 10%, #eb831b 90%);
  height: 100vh;
}
</style>
