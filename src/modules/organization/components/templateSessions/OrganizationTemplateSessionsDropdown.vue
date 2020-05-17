<template>
  <BDropdown aria-role="list" positio="is-bottom-left">
    <button class="button is-primary" slot="trigger">
      <span>{{ $t("core.utils.manage") }}</span>
      <BIcon icon="settings" size="is-small" />
    </button>
    <BDropdownItem
      class="CoreDropdownItem is-primary"
      aria-role="listitem"
      @click="$emit('see')"
    >
      <BIcon icon="eye" />
      <span class="is-size-6">{{ $t("core.utils.see") }}</span>
    </BDropdownItem>
    <BDropdownItem
      class="CoreDropdownItem is-danger"
      aria-role="listitem"
      @click="$emit('archive')"
    >
      <BIcon icon="archive" />
      <span class="is-size-6">{{ $t("core.utils.archive") }}</span>
    </BDropdownItem>
  </BDropdown>
</template>

<script>
"use strict";

export default {
  name: "OrganizationTemplateSessionsDropdown"
};
</script>

<style lang="scss"></style>
