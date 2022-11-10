<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import locale from "element-plus/lib/locale/lang/zh-cn";
export default defineComponent({
  name: "App",
  setup() {
    return {
      locale,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh;
  width: 100vw;
}
</style>
