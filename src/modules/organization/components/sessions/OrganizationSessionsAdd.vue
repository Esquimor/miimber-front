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
        <BField :label="$t('organization.sessions.label.title')">
          <BInput v-model.trim="session.title" required></BInput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BField :label="$t('organization.sessions.label.startHour')">
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
        <BField :label="$t('organization.sessions.label.endHour')">
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
      <div class="column is-half">
        <BField :label="$t('organization.sessions.label.sessionDate')">
          <BDatepicker
            v-model="session.date"
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
    </div>
    <div class="columns">
      <div class="column" :class="{ 'is-half': !hasLimit }">
        <BField
          :label="$t('organization.sessions.label.hasLimit')"
          style="height: 68px;"
        >
          <BSwitch v-model="hasLimit">
            {{ hasLimit ? $t("core.utils.yes") : $t("core.utils.no") }}
          </BSwitch>
        </BField>
      </div>
      <div class="column" v-if="hasLimit">
        <BField :label="$t('organization.sessions.label.limit')">
          <BNumberinput v-model="session.limit" min="0"></BNumberinput>
        </BField>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <BField :label="$t('organization.sessions.label.typeSession')">
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
        <BField :label="$t('organization.sessions.label.description')">
          <InputTipTap ref="description" />
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

import InputTipTap from "@organization/components/mixin/InputTipTap";

export default {
  name: "OrganizationSessionsAdd",
  mixins: [calendar],
  components: {
    TemplateSidePanelRight,
    InputTipTap
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
        startHour: null,
        endHour: null,
        typeSession: null,
        date: null,
        limit: 0
      },
      recurrence: {
        days: -1
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
        !!this.session.date
      );
    }
  },
  methods: {
    confirm() {
      if (this.loading) return;
      if (!this.canConfirm) return;
      this.loading = true;
      this.$store
        .dispatch("organization/addSession", {
          title: this.session.title,
          description: this.$refs.description.getContent(),
          typeSessionId: this.session.typeSession,
          periodicity: SESSION_RECURRENCE.ONCE,
          day: this.recurrence.day,
          limit: this.session.limit,
          startHour: this.session.startHour,
          endHour: this.session.endHour,
          date: this.session.date
        })
        .then(() => {
          this.$buefy.toast.open({
            message: this.$t("organization.sessions.add.success"),
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
  }
};
</script>

<style lang="scss"></style>
