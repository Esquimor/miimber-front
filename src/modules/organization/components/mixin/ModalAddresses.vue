<template>
  <div class="OrganizationModalAddresses">
    <header class="OrganizationModalAddresses-header">
      <h3 class="title is-5">Choose an address</h3>
    </header>
    <main class="OrganizationModalAddresses-main">
      <template v-if="mode === MODE.SELECT">
        <div
          v-for="addressItem in addresses"
          :key="addressItem.id"
          class="OrganizationModalAddresses-main-item"
          :class="{'is-selected': addressItem.id === address.id}"
          @click="$emit('select', addressItem)"
        >
          <BIcon
            v-if="addressItem.id === address.id"
            class="OrganizationModalAddresses-main-item-icon"
            icon="check-circle-outline"
          />
          <div class="OrganizationModalAddresses-main-item-address">
            <span>{{ addressItem.line1 }}</span>
            <span>{{ addressItem.line2 }}</span>
            <span>{{ addressItem.city }} {{ addressItem.zip }}</span>
            <span>{{ addressItem.country }}</span>
          </div>
        </div>
      </template>
      <div class="OrganizationModalAddresses-main-add" v-else>
        <BField label="Adresse">
          <BInput v-model.trim="form.line1" required></BInput>
        </BField>
        <BField label="Complément">
          <BInput v-model.trim="form.line2" required></BInput>
        </BField>
        <BField label="city">
          <BInput v-model.trim="form.city" required></BInput>
        </BField>
        <BField label="zip">
          <BInput v-model.trim="form.zip" required></BInput>
        </BField>
        <BField label="country">
          <BInput v-model.trim="form.country" required></BInput>
        </BField>
      </div>
    </main>
    <footer class="OrganizationModalAddresses-footer">
      <BButton @click="$emit('close')" type="is-normal" outlined>{{ $t('core.utils.close') }}</BButton>
      <BButton
        v-if="mode === MODE.SELECT"
        @click="mode = MODE.ADD"
        type="is-primary"
      >Nouvelle Adresse</BButton>
      <BButton
        v-if="mode === MODE.ADD"
        @click="mode = MODE.SELECT"
        type="is-primary"
      >Sélectionner une addresse</BButton>
      <BButton v-if="mode === MODE.ADD" @click="add" type="is-primary">Ajouter</BButton>
    </footer>
  </div>
</template>

<script>
"use strict";

const MODE = {
  SELECT: "SELECT",
  ADD: "ADD"
};

export default {
  name: "OrganizationModalAddresses",
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    address: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mode: MODE.SELECT,
      MODE: MODE,
      form: {
        line1: "",
        line2: "",
        city: "",
        zip: "",
        country: ""
      },
      loading: false
    };
  },
  computed: {
    canConfirm() {
      return true;
    }
  },
  methods: {
    add() {}
  }
};
</script>

<style lang="scss">
.OrganizationModalAddresses {
  display: flex;
  flex-direction: column;
  background-color: $white;
  height: 70vh;
  border-radius: 10px;
  overflow: hidden;
  &-header {
    padding: 1rem;
    background-color: $grey-lightest;
    height: 54.5px;
  }
  &-main {
    background-color: $white;
    overflow-y: auto;
    flex-grow: 1;
    &-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 1rem 1rem 1rem 3.5rem;
      &.is-selected {
        padding: 1rem;
      }
      &:hover {
        background-color: $white-ter;
      }
      &-icon {
        color: $primary;
        margin-right: 1rem;
      }
      &-address {
        display: flex;
        flex-direction: column;
      }
    }
    &-add {
      padding: 1rem;
    }
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    background-color: $grey-lightest;
    height: 68px;
    > button {
      margin-left: 1rem;
    }
  }
}
</style>