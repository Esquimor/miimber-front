<template>
  <OrganizationTemplateList :title="$t('organization.address.title')" @add="add" :loading="loading">
    <div class="OrganizationAddress-addresses">
      <OrganizationAddressItem v-for="address in addresses" :key="address.item" :address="address" />
    </div>
  </OrganizationTemplateList>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import OrganizationTemplateList from "@organization/templates/OrganizationTemplateList";

import OrganizationAddressItem from "@organization/components/address/OrganizationAddressItem";

import OrganizationAddressAdd from "@organization/components/address/OrganizationAddressAdd";

export default {
  name: "OrganizationAddress",
  components: {
    OrganizationTemplateList,
    OrganizationAddressItem
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters({
      addresses: "organization/addresses"
    })
  },
  methods: {
    add() {
      this.$store.dispatch("core/openSideBar", {
        component: OrganizationAddressAdd
      });
    }
  },
  mounted() {
    this.$store
      .dispatch("organization/setAddresses")
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="scss">
.OrganizationAddress {
  &-addresses {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>