<template>
  <TemplateSidePanelRight :title="props.templateSession.title" hasPadding>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.title')">{{
          props.templateSession.title
        }}</BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.startHour')">{{
          props.templateSession.startHour | formatTime
        }}</BField>
      </div>
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.endHour')">{{
          props.templateSession.endHour | formatTime
        }}</BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.day')">{{
          $t(`core.daysNumber[${props.templateSession.day}]`)
        }}</BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.limit')">{{
          props.templateSession.limit === 0
            ? $t("core.utils.no")
            : props.templateSession.limit
        }}</BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField
          :label="$t('organization.templateSessions.label.typeSession')"
          >{{ props.templateSession.typeSession.name }}</BField
        >
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField
          :label="$t('organization.templateSessions.label.description')"
          >{{
            props.templateSession.description === ""
              ? $t("core.utils.no")
              : props.templateSession.description === ""
          }}</BField
        >
      </div>
    </div>
    <template v-slot:footer>
      <footer class="TemplateSidePanelRight-content-footer">
        <button
          id="TemplateSidePanelRight-confirm"
          class="button is-primary"
          @click="close"
        >
          {{ $t("core.utils.close") }}
        </button>
      </footer>
    </template>
  </TemplateSidePanelRight>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import TemplateSidePanelRight from "@core/template/TemplateSidePanelRight";

export default {
  name: "OrganizationTemplateSessionsSee",
  components: {
    TemplateSidePanelRight
  },
  computed: {
    ...mapGetters({
      props: "core/sideBarProps"
    })
  },
  methods: {
    close() {
      this.$store.dispatch("core/closeSideBar");
    }
  }
};
</script>

<style lang="scss"></style>
