<template>
  <div class="OrganizationSessionsDay">
    <div
      v-for="dayItem in DAYS"
      :key="dayItem.value"
      class="OrganizationSessionsDay-item"
      :class="{ 'is-selected': day === dayItem.value }"
      @click="$emit('click', dayItem.value)"
    >
      {{ $t(`core.daysShort.${dayItem.label}`) }}
    </div>
  </div>
</template>

<script>
"use strict";

import { DAYS } from "@/utils/consts";

export default {
  name: "OrganizationSessionsDay",
  props: {
    day: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      DAYS: DAYS
    };
  }
};
</script>

<style lang="scss">
.OrganizationSessionsDay {
  display: flex;
  justify-content: space-around;
  &-item {
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    background-color: $grey-lightest;
    border-radius: 5px;
    &:hover {
      background-color: $grey-lighter;
    }
    &.is-selected {
      background-color: $primary;
      color: $white;
    }
  }
}
</style>
