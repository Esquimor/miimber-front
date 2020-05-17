<template>
  <TemplateSidePanelRight
    :title="$t('organization.templateSessions.add.title')"
    :loading="loading"
    :disabled="!canConfirm"
    hasPadding
    @confirm="confirm"
  >
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.title')">
          <BInput v-model.trim="session.title" required></BInput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.startHour')">
          <BClockpicker
            v-model="session.startHour"
            icon="clock"
            hourFormat="24"
            trap-focus
            required
            :hoursLabel="$t('core.time.hours')"
            :minutesLabel="$t('core.timeShort.minutes')"
            @blur="verifyStartHour"
          ></BClockpicker>
        </BField>
      </div>
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.endHour')">
          <BClockpicker
            v-model="session.endHour"
            icon="clock"
            hourFormat="24"
            trap-focus
            required
            :hoursLabel="$t('core.time.hours')"
            :minutesLabel="$t('core.timeShort.minutes')"
            @blur="verifyEndHour"
          ></BClockpicker>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.day')">
          <OrganizationSessionsDays @click="changeDays" :day="recurrence.day" />
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column" :class="{ 'is-half': !hasLimit }">
        <BField
          :label="$t('organization.templateSessions.label.hasLimit')"
          style="height: 68px;"
        >
          <BSwitch v-model="hasLimit">
            {{ hasLimit ? $t("core.utils.yes") : $t("core.utils.no") }}
          </BSwitch>
        </BField>
      </div>
      <div class="column" v-if="hasLimit">
        <BField :label="$t('organization.templateSessions.label.limit')">
          <BNumberinput v-model="session.limit" min="1"></BNumberinput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <BField :label="$t('organization.templateSessions.label.typeSession')">
          <BSelect v-model="session.typeSession" expanded>
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
      <div class="column">
        <BField :label="$t('organization.templateSessions.label.description')">
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

import { SESSION_RECURRENCE } from "@/utils/consts";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import TemplateSidePanelRight from "@core/template/TemplateSidePanelRight";
import OrganizationSessionsDays from "@organization/components/sessions/OrganizationSessionsDays";

export default {
  name: "OrganizationTemplateSessionsAdd",
  mixins: [calendar],
  components: {
    TemplateSidePanelRight,
    OrganizationSessionsDays
  },
  data() {
    return {
      loading: false,
      hasLimit: false,
      session: {
        title: "",
        startHour: null,
        endHour: null,
        typeSession: null,
        description: "",
        limit: 0
      },
      recurrence: {
        day: null
      },
      SESSION_RECURRENCE: SESSION_RECURRENCE
    };
  },
  computed: {
    ...mapGetters({
      typeSessions: "organization/typeSessions"
    }),
    canConfirm() {
      return (
        !!this.session.title &&
        !!this.session.startHour &&
        !!this.session.endHour &&
        !!this.session.typeSession &&
        this.recurrence.day !== null
      );
    }
  },
  methods: {
    changeDays(day) {
      if (this.recurrence.day === day) {
        this.recurrence.day = null;
      } else {
        this.recurrence.day = day;
      }
    },
    addPeriod() {
      this.session.periods = [
        ...this.session.periods,
        { start: null, end: null }
      ];
    },
    removePeriod(index) {
      this.session.periods = this.session.periods.filter(
        (_, indexP) => index !== indexP
      );
    },
    confirm() {
      if (this.loading) return;
      if (!this.canConfirm) return;
      this.loading = true;
      this.$store
        .dispatch("organization/addTemplate", {
          title: this.session.title,
          description: this.session.description,
          typeSessionId: this.session.typeSession,
          periodicity: SESSION_RECURRENCE.BY_WEEK,
          day: this.recurrence.day,
          limit: this.session.limit,
          startHour: this.session.startHour,
          endHour: this.session.endHour,
          periods: this.session.periods
        })
        .then(() => {
          this.$buefy.toast.open({
            message: this.$t("organization.templateSessions.add.success"),
            type: "is-primary"
          });
          this.$store.dispatch("core/closeSideBar");
        })
        .catch(() => {
          this.loading = false;
          this.$store.dispatch("core/closeSideBar");
        });
    },
    verifyStartHour() {
      if (!this.session.endHour) return;
      if (!this.session.startHour) return;
      if (dayjs(this.session.startHour).isAfter(dayjs(this.session.endHour))) {
        const temp = this.session.endHour;
        this.session.endHour = this.session.startHour;
        this.session.startHour = temp;
      }
    },
    verifyEndHour() {
      if (!this.session.startHour) return;
      if (!this.session.endHour) return;
      if (dayjs(this.session.endHour).isBefore(dayjs(this.session.startHour))) {
        const temp = this.session.startHour;
        this.session.startHour = this.session.endHour;
        this.session.endHour = temp;
      }
    }
  },
  mounted() {
    this.session.typeSession = this.typeSessions[0].id;
  },
  watch: {
    hasLimit(newVal) {
      if (newVal) {
        this.session.limit = 1;
      } else {
        this.session.limit = 0;
      }
    }
  }
};
</script>

<style lang="scss"></style>
