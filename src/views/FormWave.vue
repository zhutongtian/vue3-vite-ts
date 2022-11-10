<template>
  <div class="app">
    <div class="fw-container">
      <AsyncFormComponent></AsyncFormComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
const AsyncFormComponent = defineAsyncComponent(() => {
  return import("@/components/Form/Form.vue");
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgba(71, 102, 245, 0.7) 10%,
    rgba(73, 84, 243, 0.9) 90%
  );
  height: inherit;
  .fw-container {
    background: linear-gradient(
      135deg,
      hsla(40, 80%, 60%, 0.6) 10%,
      hsla(40, 100%, 50%, 0.8) 90%
    );
    position: relative;
    border-radius: 15px;
    // padding: 30px, 40px;
    padding-top: 30px;
    padding-right: 40px;
    padding-bottom: 30px;
    padding-left: 40px;
  }
}
</style>
