<template>
  <div class="columns OrganizationSessionsPeriod">
    <div class="column">
      <BField :label="$t('organization.sessions.label.startDate')">
        <BDatepicker
          v-model="dates.start"
          icon="calendar-today"
          trap-focus
          :minDate="minDate"
          :firstDayOfWeek="1"
          :monthNames="monthNames"
          :dayNames="dayNames"
          :nearbyMonthDays="false"
        ></BDatepicker>
      </BField>
    </div>
    <div class="column">
      <BField :label="$t('organization.sessions.label.endDate')">
        <BDatepicker
          v-model="dates.end"
          icon="calendar-today"
          trap-focus
          :minDate="minDate"
          :firstDayOfWeek="1"
          :monthNames="monthNames"
          :dayNames="dayNames"
          :nearbyMonthDays="false"
          position="is-bottom-left"
        ></BDatepicker>
      </BField>
    </div>
    <div class="column is-1 OrganizationSessionsPeriod-delete">
      <BButton
        v-if="!isFirst"
        type="is-danger"
        icon-right="delete"
        class="OrganizationSessionsPeriod-delete-icon"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>

<script>
"use strict";

import calendar from "@core/mixins/calendar";

export default {
  name: "OrganizationSessionsPeriod",
  mixins: [calendar],
  props: {
    dates: {
      type: Object,
      required: true
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      24,
      0,
      0
    );
    return {
      minDate: minDate
    };
  }
};
</script>

<style lang="scss">
.OrganizationSessionsPeriod {
  padding: 0.5rem 0.5rem 0.25rem;
  margin-top: 0;
  margin-bottom: 0 !important;
  > .column {
    padding: 0 0.75rem 0.25rem;
  }
  &-delete {
    height: 45px;
    @media (max-width: $tablet) {
      display: flex;
      justify-content: flex-end;
    }
    &-icon {
      margin-top: 32px;
      cursor: pointer;
      padding: 0.5rem;
      @media (max-width: $tablet) {
        margin-top: 5px;
      }
    }
  }
}
</style>
