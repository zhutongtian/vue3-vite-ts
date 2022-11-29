<template>
  <button :type="nativeType" class="da-btn">
    <slot>{{ content }}</slot>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from "@vue/runtime-core";
import { toRefs } from "@vue/reactivity";
type ButtonType = "submit" | "reset" | "button" | undefined;
const props = defineProps({
  nativeType: [String, undefined] as PropType<ButtonType>,
  content: String as PropType<string>,
});
const { nativeType, content } = toRefs(props);
</script>

<style lang="scss" scoped>
$btnBgColor: radial-gradient(
  closest-corner circle at 50% top,
  #98aee9,
  #183ad3
);
.da-btn {
  color: #fff;
  font-size: 25px;
  $borderColor: #dfe0e2;
  border: {
    width: 1px;
    style: solid;
    color: $borderColor;
    radius: 15px;
  }
  cursor: pointer;
  display: inline-block;
  padding: 6px 16px;
  box-sizing: border-box;
  &:focus-visible {
    outline: none;
  }
  border-color: transparent;
  background: $btnBgColor;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.1);
  }
}
</style>
