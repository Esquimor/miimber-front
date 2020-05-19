<template>
  <section class="DashboardSessionContentDescription">
    <h2 class="DashboardSessionContentDescription-title title is-5">
      {{ $t("dashboard.session.label.descriptionTitle") }}
    </h2>
    <p class="DashboardSessionContentDescription-text" v-html="description" />
  </section>
</template>

<script>
"use strict";

export default {
  name: "DashboardSessionContentDescription",
  props: {
    description: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.DashboardSessionContentDescription {
  &-text {
    p {
      min-height: 24px;
    }
  }
}
</style>
