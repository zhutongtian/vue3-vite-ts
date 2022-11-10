import { defineComponent, PropType } from "@vue/runtime-core";
import Title from "./Title";
import "@/assets/style/scroll-box.scss";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
    },
    content: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    const renderTitle = () => (slots.title ? slots.title() : props.title);
    const renderBoxContent = () =>
      slots.default ? slots.default() : props.content;
    return () => (
      <div class="scroll-ani-box">
        <Title level="3" class="scroll-ani-box-title">
          {renderTitle()}
        </Title>
        {renderBoxContent()}
      </div>
    );
  },
});
