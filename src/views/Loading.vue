<template>
  <Background :blur-value="blurValue"></Background>
  <Text :number="numberValue" :count="count"></Text>
</template>

<script setup lang="ts">
import { Ref } from "vue";
// import Background from "@/components/Loading/Background.vue";
// import Text from "@/components/Loading/Text.vue";
import { scale } from "@/utils/util";
const count = ref(0);
const timer: Ref<any> = ref(null);
const blurValue = ref(20);
const numberValue = ref(1);
const runLoad = () => {
  count.value++;
  blurValue.value = scale(count.value, 0, 100, 20, 0);
  numberValue.value = scale(count.value, 0, 100, 1, 0);
  timer.value = setTimeout(runLoad, 20);
  if (count.value > 99) {
    clearTimeout(timer.value);
  }
};
onMounted(() => {
  runLoad();
});
onUnmounted(() => {
  clearTimeout(timer.value);
});
</script>

<style lang="scss" scoped></style>
