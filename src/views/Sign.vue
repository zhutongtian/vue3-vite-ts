<template>
  <div class="body">
    <div class="da-tool">
      <async-button
        native-type="button"
        class="da-decrease"
        @click="onDecreaseHandler"
        >-</async-button
      >
      <async-input
        class="da-size-input"
        v-model="state.size"
        @change="onChangeHandler"
      ></async-input>
      <async-button
        native-type="button"
        class="da-increase"
        @click="onIncreaseHandler"
        >+</async-button
      >
      <async-color-picker
        class="da-color-picker"
        :option="{
          ...colorOption,
          ...{ clear: onClearPickerHandler, sure: onSurePickerHandler },
        }"
      ></async-color-picker>
      <async-button
        native-type="button"
        class="da-clear"
        @click="onClearHandler"
        >&times;</async-button
      >
    </div>
    <canvas
      class="da-board"
      width="800"
      height="600"
      ref="canvasContainer"
      @mousedown="onMouseDownHandler"
      @mousemove="onMouseMoveHandler"
      @mouseup="onMouseUpHandler"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "@vue/runtime-core";
import { onMounted, reactive, ref } from "vue";
import { colorOption } from "@/utils/color-picker-option";
const AsyncColorPicker = defineAsyncComponent(
  () => import("@/components/Sign/ColorPicker.vue")
);
const AsyncButton = defineAsyncComponent(
  () => import("@/components/Sign/Button.vue")
);
const AsyncInput = defineAsyncComponent(
  () => import("@/components/Sign/Input.vue")
);
const canvasContainer = ref<HTMLCanvasElement | null>(null);
type PositionType = {
  x: number;
  y: number;
};
interface StateType {
  size: number;
  color: string;
  position: Partial<PositionType>;
  isPressed: boolean;
  ctx: CanvasRenderingContext2D | null;
}
const state = reactive<Partial<StateType>>({
  size: 5,
  color: "black",
  position: {
    x: undefined,
    y: undefined,
  },
  isPressed: false,
  ctx: null,
});
onMounted(() => {
  state.ctx = (canvasContainer.value as HTMLCanvasElement).getContext("2d");
});
const onClearPickerHandler = () => {
  state.color = "black";
};
const onSurePickerHandler = (value: string) => {
  state.color = value;
};
const onChangeHandler = (e: Event) => {
  let val = (e.target as HTMLInputElement).value;
  const value = Number(val);
  if (Number.isNaN(value)) {
    (e.target as HTMLInputElement).value = "5";
  } else {
    if (value > 50) {
      (e.target as HTMLInputElement).value = "50";
    }
    if (value < 5) {
      (e.target as HTMLInputElement).value = "5";
    }
  }
};
const onDecreaseHandler = () => {
  const size = state.size;
  if (size && size > 5) {
    (state.size as number) -= 5;
  }
};
const onIncreaseHandler = () => {
  const size = state.size;
  if (size && size < 50) {
    (state.size as number) += 5;
  }
};
const onClearHandler = () => {
  if (!state.ctx) {
    return;
  }
  const { width, height } =
    canvasContainer.value?.getBoundingClientRect() as DOMRect;
  state.ctx.clearRect(0, 0, width, height);
};
const onMouseDownHandler = (e: MouseEvent) => {
  state.isPressed = true;
  const { offsetX, offsetY } = e;
  state.position && (state.position.x = offsetX);
  state.position && (state.position.y = offsetY);
};
const drawCircle = (x: number, y: number) => {
  if (!state.ctx) {
    return;
  }
  const { size, color } = state;
  state.ctx.beginPath();
  state.ctx.arc(x, y, size as number, 0, Math.PI);
  state.ctx.fillStyle = color as string;
  state.ctx.fill();
};
const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
  if (!state.ctx) {
    return;
  }
  const { size, color } = state;
  state.ctx.beginPath();
  state.ctx.strokeStyle = color as string;
  state.ctx.lineWidth = (size as number) * 2;
  //If you don't set the `lineCap` to `round`,the line style is a bit range,like gears.
  state.ctx.lineCap = "round";
  state.ctx.moveTo(x1, y1);
  state.ctx.lineTo(x2, y2);
  state.ctx.stroke();
};
const onMouseMoveHandler = (e: MouseEvent) => {
  const { x, y } = state.position
    ? state.position
    : { x: undefined, y: undefined };
  const { offsetX, offsetY } = e;
  if (state.isPressed) {
    drawCircle(offsetX, offsetY);
    drawLine(x as number, y as number, offsetX, offsetY);
    state.position && (state.position.x = offsetX);
    state.position && (state.position.y = offsetY);
  }
};
const onMouseUpHandler = () => {
  state.isPressed = false;
  state.position && (state.position.x = undefined);
  state.position && (state.position.y = undefined);
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/main.scss";
.body {
  margin: 0;
  padding: 0;
  .da-tool,
  .da-board {
    width: percentage(1);
    max-width: 800px;
    @extend .m-auto;
    @extend .el-block;
    &.da-tool {
      position: relative;
      background: linear-gradient(
        90deg,
        #e73434,
        #e6ad45,
        #e6d543,
        #32bb54,
        #47acd4,
        #5b34e7,
        #e734c0,
        #e73434
      );
      display: flex;
      height: 80px;
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 20px;
      box-sizing: border-box;
      .da-color-picker {
        display: inline-block;
        margin-left: 3px;
        margin-right: 3px;
      }
      .da-decrease,
      .da-increase {
        margin-right: 8px;
      }
      .da-size-input {
        // width: 85px;
        margin-right: 8px;
      }
      .da-clear {
        position: absolute;
        right: 15px;
      }
    }
    &.da-board {
      max-height: 700px;
      height: percentage(1);
      border: {
        width: 2px;
        style: solid;
        color: #2396ef;
      }
    }
  }
}
</style>
