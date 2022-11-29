<template>
  <div class="body">
    <div class="app">
      <div class="tc-btn-group">
        <async-button native-type="button" @click="onChangeModeHandler">{{
          firstBtnText
        }}</async-button>
        <async-button native-type="button" @click="onChangeLangHandler">{{
          secondBtnText
        }}</async-button>
      </div>
      <async-clock :lang="currentLang"></async-clock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { langText } from "@/utils/const";
import type { CommonLangType } from "@/utils/const";
import { defineAsyncComponent, nextTick } from "@vue/runtime-core";
const AsyncButton = defineAsyncComponent(
  () => import("@/components/Clock/Button.vue")
);
const AsyncClock = defineAsyncComponent(
  () => import("@/components/Clock/Clock.vue")
);
type LangValueType = "en" | "zh";
const currentLang = ref<LangValueType>("zh");
const currentMode = ref("light");
const firstBtnText = computed(() => {
  const mode = currentMode.value === "light" ? "dark" : "light";
  return langText[currentLang.value][
    ("mode-" + mode + "-text") as keyof CommonLangType
  ];
});
const secondBtnText = computed(() => {
  const lang = currentLang.value === "zh" ? "en" : "zh";
  return langText[lang]["lang-text" as keyof CommonLangType];
});
const handleClassName = () => {
  const appInstance = document.querySelector(".app");
  if (currentMode.value === "dark") {
    appInstance?.classList.add("dark");
  } else {
    appInstance?.classList.remove("dark");
  }
};
const onChangeModeHandler = () => {
  currentMode.value = currentMode.value === "light" ? "dark" : "light";
  nextTick(() => {
    handleClassName();
  });
};
const onChangeLangHandler = () => {
  currentLang.value = currentLang.value === "en" ? "zh" : "en";
};
</script>

<style lang="scss" scoped>
.body {
  @include reset;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    @include flex-center;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: #f2f3f4;
    color: #232425;
    height: 100 + vh;
    &.dark {
      background-color: #232425;
      color: #f2f3f4;
      .tc-clock {
        border-color: #f2f3f4;
        background-color: #232425;
      }
      .tc-btn {
        background-color: #232425;
        color: #f2f3f4;
        box-shadow: 2px 3px 5px #f2f3f4;
      }
      .tc-clock-container > .tc-clock > .tc-center-point::after {
        background-color: #f2f3f4;
      }
      .tc-clock-container > .tc-date > .tc-circle {
        background-color: #f2f3f4;
        color: #232425;
      }
    }
    .tc-btn-group {
      @include flex-space;
      width: percentage(1);
      $maxWidth: 250px, 300px, 350px;
      max-width: max($maxWidth...);
    }
  }
}
</style>
