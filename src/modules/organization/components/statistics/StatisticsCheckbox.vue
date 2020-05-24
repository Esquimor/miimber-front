<template>
  <div class="field">
    <b-checkbox v-model="newValue" ref="checkbox">{{ formatSession }}</b-checkbox>
  </div>
</template>

<script>
"use strict";

export default {
  name: "StatisticsCheckbox",
  inheritAttrs: true,
  props: {
    template: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newValue: this.value
    };
  },
  computed: {
    formatSession() {
      const startHour = `${this.template.startHour.slice(
        0,
        2
      )}:${this.template.startHour.slice(3, 5)}`;
      const endHour = `${this.template.endHour.slice(
        0,
        2
      )}:${this.template.endHour.slice(3, 5)}`;
      const day = this.$t(`core.daysNumberShort[${this.template.day}]`);
      return `${this.template.label} ${day}.${startHour}-${endHour}`;
    }
  },
  mounted() {
    this.$refs.checkbox.$el.children[1].style.backgroundColor = this.template.color;
    this.$refs.checkbox.$el.children[1].style.borderColor = this.template.color;
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.$refs.checkbox.$el.children[1].style.borderColor = this.template.color;
        this.$refs.checkbox.$el.children[1].style.backgroundColor = this.template.color;
      } else {
        this.$refs.checkbox.$el.children[1].style.borderColor = "#7a7a7a";
        this.$refs.checkbox.$el.children[1].style.backgroundColor = "white";
      }
      this.newValue = newVal;
    },
    newValue(newVal) {
      this.$emit("input", newVal);
    }
  }
};
</script>

<style lang="scss">
</style>