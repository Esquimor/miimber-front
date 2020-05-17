<template>
  <TemplateSidePanelRight
    :title="$t('organization.sessions.edit.title')"
    :loading="loading"
    :disabled="!canConfirm"
    hasPadding
    @confirm="confirm"
  >
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.sessions.label.title')">
          <BInput v-model.trim="session.title" required></BInput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.sessions.label.startHour')">
          <BTimepicker
            v-model="session.startHour"
            icon="alarm"
            trap-focus
          ></BTimepicker>
        </BField>
      </div>
      <div class="column">
        <BField :label="$t('organization.sessions.label.endHour')">
          <BTimepicker
            v-model="session.endHour"
            icon="alarm"
            trap-focus
          ></BTimepicker>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.sessions.label.sessionDate')">
          <BDatepicker
            v-model="session.sessionDate"
            placeholder="Click to select..."
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
        <BField :label="$t('organization.sessions.label.typeSession')">
          <BSelect
            placeholder="Select a name"
            v-model="session.typeSession"
            expanded
          >
            <option
              v-for="typeSession in typeSessions"
              :value="typeSession.id"
              :key="typeSession.id"
              >{{ typeSession.name }}</option
            >
          </BSelect>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column" :class="{ 'is-half': !hasLimit }">
        <BField
          :label="$t('organization.sessions.label.hasLimit')"
          style="height: 68px;"
        >
          <BSwitch v-model="hasLimit">{{
            hasLimit ? $t("core.utils.yes") : $t("core.utils.no")
          }}</BSwitch>
        </BField>
      </div>
      <div class="column" v-if="hasLimit">
        <BField :label="$t('organization.sessions.label.limit')">
          <BNumberinput v-model="session.limit" min="1"></BNumberinput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.sessions.label.description')">
          <BInput
            v-model.trim="session.description"
            maxlength="2000"
            type="textarea"
          ></BInput>
        </BField>
      </div>
    </div>
  </TemplateSidePanelRight>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import calendar from "@core/mixins/calendar";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import TemplateSidePanelRight from "@core/template/TemplateSidePanelRight";

export default {
  name: "OrganizationSessionsEdit",
  mixins: [calendar],
  components: {
    TemplateSidePanelRight
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
      loading: false,
      minDate: minDate,
      hasLimit: false,
      session: {
        title: "",
        description: "",
        startHour: null,
        endHour: null,
        typeSession: null,
        sessionDate: null,
        id: 0,
        limit: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      props: "core/sideBarProps",
      typeSessions: "organization/typeSessions"
    }),
    canConfirm() {
      return (
        !!this.session.title &&
        !!this.session.startHour &&
        !!this.session.endHour &&
        !!this.session.typeSession &&
        !!this.session.sessionDate
      );
    }
  },
  methods: {
    confirm() {
      if (this.loading) return;
      if (!this.canConfirm) return;
      this.loading = true;

      this.$buefy.dialog.confirm({
        title: this.$t("organization.sessions.edit.messageTitle"),
        message: this.$t("organization.sessions.edit.messageMsg"),
        confirmText: this.$t("core.utils.confirm"),
        cancelText: this.$t("core.utils.cancel"),
        type: "is-primary",
        hasIcon: true,
        onConfirm: () => {
          this.$store
            .dispatch("organization/editSession", {
              title: this.session.title,
              description: this.session.description,
              start: this.session.startHour,
              end: this.session.endHour,
              date: this.session.sessionDate,
              typeSessionId: this.session.typeSession,
              id: this.session.id,
              limit: this.session.limit
            })
            .then(() => {
              this.$buefy.toast.open({
                message: this.$t("organization.sessions.edit.success"),
                type: "is-primary"
              });
              this.$store.dispatch("core/closeSideBar");
            })
            .catch(() => {
              this.loading = false;
            });
        },
        onCancel: () => {
          this.loading = false;
        }
      });
    }
  },
  watch: {
    hasLimit(newVal) {
      if (newVal) {
        this.session.limit = 1;
      } else {
        this.session.limit = 0;
      }
    },
    "props.session": {
      immediate: true,
      handler(newVal) {
        this.hasLimit = newVal.limit > 0;
        this.session = {
          title: newVal.title,
          description: newVal.description,
          startHour: dayjs(newVal.start).toDate(),
          endHour: dayjs(newVal.end).toDate(),
          typeSession: newVal.typeSession.id,
          sessionDate: dayjs(newVal.start).toDate(),
          id: newVal.id,
          limit: newVal.limit
        };
      }
    }
  }
};
</script>

<style lang="scss"></style>
