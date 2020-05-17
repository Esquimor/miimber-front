<template>
  <TemplateSidePanelRight
    :title="$t('organization.sessions.add.titleMultiple')"
    :loading="loading"
    :disabled="false"
    hasPadding
    @confirm="confirm"
  >
    <div class="columns">
      <div class="column">
        <b-field label="Templates">
          <b-select v-model="template">
            <option
              v-for="templateSession in templateSessions"
              :value="templateSession.id"
              :key="templateSession.id"
              >{{ templateSession.title }} -
              {{ $t(`core.daysNumber[${templateSession.day}]`) }}
              {{ templateSession.startHour | formatTime }}-{{
                templateSession.endHour | formatTime
              }}</option
            >
          </b-select>
        </b-field>
      </div>
    </div>
    <OrganizationSessionsPeriods
      :periods="periods"
      @addPeriod="addPeriod"
      @removePeriod="removePeriod"
    />
  </TemplateSidePanelRight>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import TemplateSidePanelRight from "@core/template/TemplateSidePanelRight";
import OrganizationSessionsPeriods from "@organization/components/sessions/OrganizationSessionsPeriods";

export default {
  name: "OrganizationSessionsAddFromTemplate",
  components: {
    TemplateSidePanelRight,
    OrganizationSessionsPeriods
  },
  data() {
    return {
      loading: false,
      template: 0,
      periods: [{ start: null, end: null }]
    };
  },
  computed: {
    ...mapGetters({
      templateSessions: "organization/templateSessions"
    })
  },
  methods: {
    addPeriod() {
      this.periods = [...this.periods, { start: null, end: null }];
    },
    removePeriod(index) {
      this.periods = this.periods.filter((_, indexP) => index !== indexP);
    },
    confirm() {
      if (this.loading) return;
      this.loading = true;
      this.$store
        .dispatch("organization/addSessionsFromTemplate", {
          templateId: this.template,
          periods: this.periods
        })
        .then(() => {
          this.$buefy.toast.open({
            message: this.$t("organization.sessions.add.successMultiple"),
            type: "is-primary"
          });
          this.$store.dispatch("core/closeSideBar");
        })
        .catch(() => {
          this.loading = false;
          this.$store.dispatch("core/closeSideBar");
        });
    }
  },
  mounted() {
    this.template = this.templateSessions[0].id;
  }
};
</script>

<style></style>
