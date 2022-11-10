<template>
  <div class="body">
    <div class="app">
      <Title class="scroll-ani-title">scroll to see animation</Title>
      <scroll-box
        v-for="(box, index) in state.boxList"
        :key="box.content + index"
        :class="box.active"
      >
        <template v-slot:title>{{ box.content }}</template>
      </scroll-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/Scroll/Title";
import ScrollBox from "@/components/Scroll/ScrollBox";
import { UnwrapNestedRefs } from "vue";
import { throttle } from "@/utils/util";
interface BoxType {
  active: string;
  content: string;
}
const state: UnwrapNestedRefs<{ boxList: Array<BoxType> }> = reactive({
  boxList: [],
});
const triggerBottom = ref(0);
for (let i = 0; i < 30; i++) {
  state.boxList.push({
    active: i === 0 ? "show" : "",
    content: "content",
  });
}
const onScrollHandler = () => {
  const allBox = document.querySelectorAll(".scroll-ani-box");
  allBox.forEach((box, index) => {
    const top = box.getBoundingClientRect().top;
    if (triggerBottom.value >= top) {
      state.boxList[index].active = "show";
    } else {
      state.boxList[index].active = "";
    }
  });
};
onMounted(() => {
  triggerBottom.value = (window.innerHeight * 4) / 5;
  window.addEventListener("scroll", throttle(onScrollHandler, 20));
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/main.scss";
$rotate: 135deg;
.body {
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient($rotate, $bgColor-1 10%, $bgColor-2 90%);
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: svg-gradient(to right, $boxBgColor-1, $boxBgColor-2);
  }
  ::-webkit-scrollbar-thumb {
    width: 10px;
    height: 10px;
    background: svg-gradient(to right, $bgColor-1, $bgColor-2);
  }
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: percentage(1);
    // .flex-center();
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .scroll-ani-title {
      text-align: center;
      color: $titleColor;
      letter-spacing: 2px;
      margin: 1rem;
      font-size: 3rem;
    }
  }
}
</style>
