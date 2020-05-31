<template>
  <div class="OrganizationAddressItem">
    <div class="OrganizationAddressItem-main">
      <span class="text is-size-5">{{ address.line1 }}</span>
      <span>{{ address.line2 }}</span>
      <span>{{ address.city }}, {{ address.zip }}</span>
      <span>{{ address.country }}</span>
    </div>
    <div class="OrganizationAddressItem-footer">
      <BButton type="is-danger" icon-left="archive">Archiver</BButton>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "OrganizationAddressItem",
  props: {
    address: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.OrganizationAddressItem {
  display: flex;
  flex-direction: column;
  border: 1px solid $grey-lightest;
  width: 400px;
  height: 150px;
  margin: 1.5rem 1rem;
  border-radius: 5px;
  &-main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem;
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    background-color: $grey-lightest;
    padding: 1rem;
  }
}
</style>