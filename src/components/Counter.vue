<script lang="tsx">
import { defineComponent, PropType } from "@vue/runtime-core";
import { toRefs } from "vue";
export default defineComponent({
  props: {
    iconClass: String as PropType<string>,
    value: Number as PropType<number>,
    text: String as PropType<string>,
  },
  setup(props) {
    //toRefs函数，当我们在vue中使用解构获取props时，props会失去响应式，
    //此时我们就需要使用toRefs将props包裹一下，让props不失去响应式
    const { iconClass, value, text } = toRefs(props);
    let newIconClass = "fa fa-3x";
    if (typeof iconClass.value === "string") {
      newIconClass += " " + iconClass.value;
    }
    return () => (
      <div class="ic-counter mt-40 mb-40 ml-50 mr-50">
        <i class={newIconClass}></i>
        {/*<div class="ic-counter-value mt-10 mb-10">{newValue}</div>*/}
        <div class="ic-counter-value mt-10 mb-10">{value.value}</div>
        <div class="ic-counter-text">{text.value}</div>
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/style/main.scss";
.ic-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  .ic-counter-value {
    font-size: 60px;
  }
  .ic-counter-text {
    font-size: 20px;
  }
}
@media screen and (max-width: 780px) {
  .ic-counter {
    margin: 20px 30px;
  }
}
</style>
