<template>
  <div class="da-input">
    <input
      :type="nativeType"
      :placeholder="placeholder"
      @input="onInputHandler"
      class="da-inner-input"
      :value="modelValue"
      @change="onChangeHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "@vue/runtime-core";
import { toRefs } from "@vue/reactivity";
const props = defineProps({
  placeholder: String as PropType<string>,
  nativeType: {
    type: String as PropType<string>,
    default: "text",
  },
  modelValue: [String, Number] as PropType<string | number>,
});
const emit = defineEmits(["update:modelValue", "change"]);
const { placeholder, nativeType, modelValue } = toRefs(props);
const onInputHandler = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const onChangeHandler = (e: Event) => emit("change", e);
</script>

<style lang="scss" scoped>
.da-input {
  width: 100px;
  height: 40px;
  vertical-align: middle;
  .da-inner-input {
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
    background-color: transparent;
    height: 40px;
    width: 100px;
    color: #fff;
  }
}
</style>
