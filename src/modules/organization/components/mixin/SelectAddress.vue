<template>
  <div class="OrganizationSelectAddress" @click="openModal">
    <div>{{ address.line1 }}</div>
    <div>{{ address.line2 }}</div>
    <div>{{ address.city }} {{ address.zip }}</div>
    <div>{{ address.country }}</div>
  </div>
</template>

<script>
"use strict";

import ModalAddresses from "@organization/components/mixin/ModalAddresses";

export default {
  name: "OrganizationSelectAddress",
  inheritAttrs: true,
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      address: this.value
    };
  },
  methods: {
    openModal() {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: ModalAddresses,
        width: 450,
        props: {
          address: this.address,
          addresses: this.addresses
        },
        events: {
          select: value => {
            this.$emit("input", value);
            modal.close();
          }
        }
      });
    }
  },
  watch: {
    value(newVal) {
      this.address = newVal;
    }
  }
};
</script>

<style lang="scss">
.OrganizationSelectAddress {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 2px solid $grey-lightest;
  border-radius: 5px;
}
</style>