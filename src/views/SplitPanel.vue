<template>
  <div class="body">
    <div class="app">
      <div class="sp-container" :class="parentClass">
        <div
          class="sp-panel"
          v-for="(item, index) in splitList"
          :key="item.type + index"
          :class="`sp-${item.type}-panel`"
          :style="{ backgroundImage: getPanelBg(item.type) }"
          @mouseenter="onMouseEnterHandler(item.type)"
          @mouseleave="onMouseLeaveHandler"
        >
          <Title class="sp-title" level="3">the {{ item.type }} panel</Title>
          <a
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="sp-link"
            >{{ item.text }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/Title.vue";
const BASE_URL = "https://eveningwater.com/my-web-projects/js/65/images/";
const splitList = [
  {
    text: "Shirahoshi",
    type: "left",
    href: "https://baike.baidu.com/item/%E7%99%BD%E6%98%9F/34180?fromtitle=%E7%99%BD%E6%98%9F%E5%85%AC%E4%B8%BB&fromid=4377673&fr=aladdin",
  },
  {
    text: "Zanilia",
    type: "right",
    href: "https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96/10075976?fr=aladdin",
  },
];
const getPanelBg = computed(
  () => (type: string) => `url(${BASE_URL + type + ".png"})`
);
const parentClass = ref("");
const onMouseEnterHandler = (type: string) => {
  parentClass.value = "hover-" + type;
};
const onMouseLeaveHandler = () => {
  parentClass.value = "";
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/main.scss";
.body {
  margin: 0;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // height: unit(100, vh);
    height: 100vh;
    .sp-container {
      width: 100%;
      height: 100%;
      position: relative;
      &.hover-left {
        .sp-left-panel {
          width: 80%;
        }
        .sp-right-panel {
          width: 20%;
        }
      }
      &.hover-right {
        .sp-left-panel {
          width: 20%;
        }
        .sp-right-panel {
          width: 80%;
        }
      }
      .sp-panel {
        width: 50%;
        height: inherit;
        position: absolute;
        // .flex-center();
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        background-size: cover;
        background-repeat: no-repeat;
        // .all-transition();
        transition: all 1s cubic-bezier(0.55, 0.085, 0.68, 0.53);
        .sp-title {
          // font-size: unit(2, rem);
          font-size: 2rem;
          color: #fff;
          white-space: nowrap;
        }
        .sp-link {
          // width: unit(15, rem);
          width: 15rem;
          padding: 1rem;
          text-decoration: none;
          // border-radius: unit($percent-8 * 10, px);
          border-radius: 8px;
          border: 0.3rem solid #fff;
          font-size: 1.5rem;
          background-color: transparent;
          text-transform: uppercase;
          top: 1px;
          z-index: 2;
          position: relative;
          text-align: center;
          letter-spacing: 2px;
          color: #fff9;
        }
        &.sp-left-panel {
          left: 0;
          &::before {
            background-color: #2396ef66;
          }
          .sp-link:hover {
            color: #2396ef66;
            border-color: #2396ef66;
          }
        }
        &.sp-right-panel {
          right: 0;
          &::before {
            background-color: #f8872a66;
          }
          .sp-link:hover {
            color: #f8872a66;
            border-color: #f8872a66;
          }
        }
        &:before {
          content: "";
          width: 100%;
          height: inherit;
          position: absolute;
          //  .all-transition();
          transition: all 1s cubic-bezier(0.55, 0.085, 0.68, 0.53);
        }
      }
    }
  }
}
</style>
