<template>
  <span class="input-check-box-basic">
    <input
      :id="id"
      v-bind:checked="value"
      @change="onChangeStatus"
      :element="element"
      :disabled="disabled"
      type="checkbox"
      class="input"
    />
    <label :for="id" :class="disabledState" class="checkbox">
      <span class="text"><slot /></span>
    </label>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
interface ArticleTag {}

@Component
export default class CheckBoxBasic extends Vue {
  @Prop({ default: "" }) public readonly id!: string;
  @Prop({ default: false }) public readonly value!: boolean;
  @Prop({ default: false }) public readonly disabled!: boolean;

  @Prop({}) public element!: ArticleTag[];

  private _status = false;

  get disabledState(): string {
    return this.disabled ? "disabled" : "";
  }

  get status(): boolean {
    return this._status;
  }

  set status(val: boolean) {
    if (val === this._status) {
      return;
    }
    this.$emit("input", val);
    this.$emit("inputTag", val, this.element);
    this._status = val;
  }

  @Watch("value", { immediate: true })
  onChangeValue(): void {
    console.log("onChangeValue:", this.id, this.value);
    this.status = this.value;
  }

  onChangeStatus(event: Event): void {
    const target: any = event.target;
    this.status = target.value;
    console.log("onChangeStatus:", this.id, this.status);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$brand-primary500: rgba(160, 209, 82, 255);
$brand-primary600: rgba(130, 185, 43, 255);
$brand-primary50: rgba(248, 252, 243, 255);
$brand-primary100: rgba(226, 241, 203, 255);
$gray-darkest: rgba(47, 47, 47, 255);
$gray-lightest: rgba(235, 235, 235, 255);
$dark-gray: rgba(112, 112, 112, 255);
$white: rgba(255, 255, 255, 255);

.input-check-box-basic {
  display: inline-block;
  .input {
    display: none;
    &:active {
      & + .checkbox {
        &:before {
          border-color: $brand-primary500;
        }
      }
    }
    &:checked {
      & + .checkbox {
        &:before {
          border-color: $brand-primary600;
          background-color: $brand-primary600;
        }
        &:after {
          position: absolute;
          left: 6px;
          top: 6px;
          content: "";
          display: inline-block;
          width: 8px;
          height: 5px;
          border-top: 2px solid $brand-primary50;
          border-right: 2px solid $brand-primary50;
          transform: rotate(140deg);
        }
      }
    }
  }
  .checkbox {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    // min-width: 150px;
    color: $gray-darkest;
    &:before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 2px solid $brand-primary100;
      border-radius: 4px;
      background-color: $white;
    }
    &.disabled {
      pointer-events: none;
      &:before {
        border-color: $gray-lightest;
      }
    }
    .text {
      margin-left: 10px;
    }
  }
}
</style>
