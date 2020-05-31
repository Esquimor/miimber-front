<template>
  <TemplateSidePanelRight
    :title="$t('organization.sessions.add.title')"
    :loading="loading"
    :disabled="!canConfirm"
    hasPadding
    @confirm="confirm"
  >
    <div class="columns">
      <div class="column">
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
    </div>
  </TemplateSidePanelRight>
</template>

<script>
"use strict";

import TemplateSidePanelRight from "@core/template/TemplateSidePanelRight";

export default {
  name: "OrganizationAddressAdd",
  components: {
    TemplateSidePanelRight
  },
  data() {
    return {
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
  methods: {
    confirm() {
      if (this.loading) return;
      this.loading = true;
      this.$store
        .dispatch("organization/addAddress", this.form)
        .then(() => {
          this.$store.dispatch("core/closeSideBar");
        })
        .catch(() => {
          this.loading = false;
          this.$store.dispatch("core/closeSideBar");
        });
    }
  }
};
</script>

<style lang="scss">
</style>