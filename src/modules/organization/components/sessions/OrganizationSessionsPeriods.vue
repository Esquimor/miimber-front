<template>
  <div class="OrganizationSessionsPeriods">
    <div
      class="OrganizationSessionsPeriods-title text is-size-5"
    >{{ $t('organization.sessions.label.periods') }}:</div>
    <div class="OrganizationSessionsPeriods-periods">
      <OrganizationSessionsPeriod
        v-for="(period, index) in periods"
        :key="period.item"
        :dates="period"
        :isFirst="index === 0"
        @remove="$emit('removePeriod',index)"
      />
    </div>
    <div class="OrganizationSessionsPeriods-add">
      <BButton
        type="is-primary"
        @click="$emit('addPeriod')"
      >{{ $t('organization.sessions.label.addPeriod') }}</BButton>
    </div>
  </div>
</template>

<script>
"use strict";

import OrganizationSessionsPeriod from "@organization/components/sessions/OrganizationSessionsPeriod";

export default {
  name: "OrganizationSessionsPeriods",
  props: {
    periods: {
      type: Array,
      default: () => []
    }
  },
  components: {
    OrganizationSessionsPeriod
  }
};
</script>

<style lang="scss">
.OrganizationSessionsPeriods {
  padding: 0.5rem;
  background-color: $white-ter;
  border-radius: 5px;
  &-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  &-periods {
    background-color: $white;
  }
  &-add {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
}
</style>