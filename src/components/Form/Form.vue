<script lang="tsx">
import { defineAsyncComponent, defineComponent } from "@vue/runtime-core";
export default defineComponent({
  setup() {
    const AsyncTitleComponent = defineAsyncComponent(() => import("./Title"));
    const children = [
      {
        type: "text",
        value: "",
        required: true,
        label: "email",
      },
      {
        type: "password",
        value: "",
        required: true,
        label: "password",
      },
      {
        type: "button",
        text: "login",
        class: "fw-btn",
      },
      {
        type: "link",
        text: "register",
        class: "fw-link",
        defaultText: "Don't have an account?",
      },
    ];
    interface ChildType {
      type: string;
      value?: string;
      required?: boolean;
      label?: string;
      text?: string;
      class?: string;
      defaultText?: string;
    }
    const renderChildByType = (child: ChildType) => {
      if (child.label) {
        return (
          <>
            <input
              type={child.type}
              class="fw-input"
              required={child.required}
              v-model={child.value}
            />
            <label class="fw-label">
              {child.label.split("").map((lab: string, index: number) => (
                <span
                  key={lab + index}
                  class="fw-label-span"
                  style={{ transitionDelay: 50 * index + "ms" }}
                >
                  {lab}
                </span>
              ))}
            </label>
          </>
        );
      } else if (child.defaultText) {
        return (
          <>
            {child.defaultText}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              class={child.class}
            >
              {child.text}
            </a>
          </>
        );
      } else {
        return (
          <button type={child.type as "button"} class={child.class}>
            {child.text}
          </button>
        );
      }
    };
    return () => (
      <form class="fw-form">
        <AsyncTitleComponent class="fw-form-title">
          please login
        </AsyncTitleComponent>
        {children.map((child, index) => (
          <div class="fw-form-control" key={child.type + index}>
            {renderChildByType(child)}
          </div>
        ))}
      </form>
    );
  },
});
</script>
<style lang="scss" scoped>
.fw-form {
  // .tran-btn {
  //   transition: all unit(pi() - 1.2, ms) cubic-bezier(0.075, 0.82, 0.165, 1);
  // }
  .fw-form-title {
    color: #fff;
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
    font-size: 26px;
    letter-spacing: 2px;
  }
  .fw-form-control {
    position: relative;
    width: 350px;
    margin: 28px 0;
    color: #fff;
    font-size: 15px;
    .fw-input {
      width: 100%;
      background-color: transparent;
      padding: 15px 0;
      border: none;
      border-bottom: 4px solid rgba(255, 255, 255, 0.95);
      color: #fff;
      font-size: 18px;
      &:focus-visible {
        outline: none;
      }
      &:focus,
      &:valid {
        border-color: #09f;
        color: #09f;
        & + .fw-label .fw-label-span,
        & + .fw-label .fw-label-span {
          transform: translateY(-34px);
          color: #09f;
        }
      }
    }
    .fw-label {
      color: #fff;
      position: absolute;
      left: 0;
      top: 15px;
      .fw-label-span {
        display: inline-block;
        font-size: 22px;
        min-width: 5px;
        transition: all 0.34159265ms cubic-bezier(0.075, 0.82, 0.165, 1);
        letter-spacing: 2px;
      }
    }
    .fw-btn {
      width: 100%;
      color: #fff;
      text-transform: capitalize;
      padding: 16px 18px;
      border-radius: 5px;
      display: inline-block;
      border: 1px solid rgba(124, 73, 243, 0.9);
      background: linear-gradient(
        135deg,
        rgba(71, 132, 245, 0.7) 10%,
        rgba(124, 73, 243, 0.9) 90%
      );
      cursor: pointer;
      font-size: 18px;
      transition: all 1.94159265ms cubic-bezier(0.075, 0.82, 0.165, 1);
      &:focus-visible {
        outline: none;
      }
      &:hover {
        background: linear-gradient(
          135deg,
          rgba(124, 73, 243, 0.9) 10%,
          rgba(71, 132, 245, 0.7) 90%
        );
        border-color: #4784f5b3;
      }
    }
    .fw-link {
      text-decoration: none;
      font-size: 20px;
      text-transform: capitalize;
      color: #7c49f399;
      margin: range(4px, 8px, 2);
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        color: #4766f533;
      }
    }
  }
}
</style>
