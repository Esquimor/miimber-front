<template>
  <OrganizationTemplateList
    :title="$t('organization.statistic.title')"
    :hasButton="false"
    :loading="loading"
  >
    <template v-slot:buttons>
      <b-field>
        <b-radio-button
          v-model="period"
          :native-value="STATISTIC.ONE_MONTH"
        >{{ $t('organization.statistic.periods.ONE_MONTH') }}</b-radio-button>
        <b-radio-button
          v-model="period"
          :native-value="STATISTIC.THREE_MONTHS"
        >{{ $t('organization.statistic.periods.THREE_MONTHS') }}</b-radio-button>
        <b-radio-button
          v-model="period"
          :native-value="STATISTIC.SIX_MONTHS"
        >{{ $t('organization.statistic.periods.SIX_MONTHS') }}</b-radio-button>
        <b-radio-button
          v-model="period"
          :native-value="STATISTIC.ONE_YEAR"
        >{{ $t('organization.statistic.periods.ONE_YEAR') }}</b-radio-button>
      </b-field>
    </template>
    <div class="OrganizationStatistic">
      <div class="OrganizationStatistic-templates">
        <div class="field">
          <b-checkbox
            v-model="checkTemplateAll"
            @input="checkAllTemplate"
          >{{ $t('organization.statistic.label.all') }}</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox
            v-model="checkTemplates[0]"
            @input="checkTemplate"
          >{{ $t('organization.statistic.label.once') }}</b-checkbox>
        </div>
        <StatisticsCheckbox
          v-for="template in listTemplateSession"
          :key="template.index"
          :template="template"
          @input="checkTemplate"
          v-model="checkTemplates[template.id]"
        />
      </div>
      <LineChart
        :chart-data="datacollection"
        :options="options"
        class="OrganizationStatistic-chart"
      />
    </div>
  </OrganizationTemplateList>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import { STATISTIC } from "@/utils/consts";

import { getRandomColor } from "@/utils/function";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import OrganizationTemplateList from "@organization/templates/OrganizationTemplateList";

import LineChart from "@organization/components/statistics/LineChart";
import StatisticsCheckbox from "@organization/components/statistics/StatisticsCheckbox";

export default {
  name: "OrganizationStatistic",
  components: {
    OrganizationTemplateList,
    LineChart,
    StatisticsCheckbox
  },
  data() {
    return {
      loading: true,
      period: STATISTIC.THREE_MONTHS,
      STATISTIC: STATISTIC,
      datacollection: {},
      checkTemplateAll: true,
      checkTemplates: { 0: true },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: "auto"
              },
              scaleLabel: {
                display: true,
                labelString: this.$t("organization.statistic.label.weeks"),
                fontColor: "#4a4a4a",
                fontSize: "14",
                fontFamily:
                  'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.$t("organization.statistic.label.attendees"),
                fontColor: "#4a4a4a",
                fontSize: "14",
                fontFamily:
                  'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      statistics: "organization/statistics",
      templateSessions: "organization/templateSessions"
    }),
    listWeeks() {
      const end =
        dayjs().get("day") === 0
          ? dayjs()
          : dayjs()
              .add(1, "week")
              .set("day", 0);
      let start;
      switch (this.period) {
        case STATISTIC.THREE_MONTHS:
          start = dayjs()
            .subtract(3, "month")
            .set("day", 1);
          break;
        case STATISTIC.SIX_MONTHS:
          start = dayjs()
            .subtract(6, "month")
            .set("day", 1);
          break;
        case STATISTIC.ONE_YEAR:
          start = dayjs()
            .subtract(1, "year")
            .set("day", 1);
          break;
        default:
          start = dayjs()
            .subtract(1, "month")
            .set("day", 1);
          break;
      }
      let weeks = [];
      while (start.isBefore(end)) {
        const endPeriod = start
          .clone()
          .add(1, "week")
          .set("day", 0);
        weeks.push({
          start: start.clone(),
          end: endPeriod,
          name: `${
            start.get("date") >= 10
              ? start.get("date")
              : "0" + start.get("date")
          }/${
            start.get("month") >= 9
              ? start.get("month") + 1
              : "0" + (start.get("month") + 1)
          }-${
            endPeriod.get("date") >= 10
              ? endPeriod.get("date")
              : "0" + endPeriod.get("date")
          }/${
            endPeriod.get("month") >= 9
              ? endPeriod.get("month") + 1
              : "0" + (endPeriod.get("month") + 1)
          }`
        });
        start = start.add(1, "week");
      }
      return weeks;
    },
    listTemplateSession() {
      if (this.loading) return [];
      return this.templateSessions.reduce(
        (templateSessions, templateSession) => {
          templateSessions.push({
            id: templateSession.id,
            label: templateSession.title,
            color: getRandomColor(),
            sessions: [],
            startHour: templateSession.startHour,
            endHour: templateSession.endHour,
            day: templateSession.day
          });
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.checkTemplates[templateSession.id] = true;
          return templateSessions;
        },
        []
      );
    },
    listTemplateSessionAndSessions() {
      return this.statistics.reduce(
        (templateSessions, session) => {
          const existingTemplateSession = templateSessions.find(
            t => t.id === session.templateSessionId
          );
          if (existingTemplateSession) {
            existingTemplateSession.sessions.push({
              id: session.id,
              count: session.count,
              date: dayjs(session.date)
            });
          } else {
            const templateInList = this.listTemplateSession.find(
              t => t.id === session.templateSessionId
            );
            if (templateInList) {
              templateSessions.push({
                id: templateInList.id,
                label: templateInList.label,
                color: templateInList.color,
                sessions: [
                  {
                    id: session.id,
                    count: session.count,
                    date: dayjs(session.date)
                  }
                ]
              });
            } else {
              const onceTemplate = templateSessions.find(t => t.id === 0);
              onceTemplate.sessions.push({
                id: session.id,
                count: session.count,
                date: dayjs(session.date)
              });
            }
          }
          return templateSessions;
        },
        [{ id: 0, label: "Once", color: "#0288d1", sessions: [] }]
      );
    },
    reformatStatistics() {
      let reformat = [];
      for (
        let i = 0, lengthT = this.listTemplateSessionAndSessions.length;
        i < lengthT;
        i++
      ) {
        let data = [];
        for (let j = 0, lengthW = this.listWeeks.length; j < lengthW; j++) {
          const session = this.listTemplateSessionAndSessions[
            i
          ].sessions.find(s =>
            s.date.isBetween(
              this.listWeeks[j].start,
              this.listWeeks[j].end,
              "day"
            )
          );
          data.push(session ? session.count : null);
        }
        reformat.push({
          id: this.listTemplateSessionAndSessions[i].id,
          label: this.listTemplateSessionAndSessions[i].label,
          borderColor: this.listTemplateSessionAndSessions[i].color,
          data
        });
      }
      return reformat;
    }
  },
  methods: {
    checkTemplate() {
      this.checkTemplateAll = false;
      this.fillData();
    },
    checkAllTemplate() {
      for (let key of Object.keys(this.checkTemplates)) {
        this.checkTemplates[key] = true;
      }
      this.checkTemplateAll = true;
      this.fillData();
    },
    fillData() {
      const reformatStatistics = this.reformatStatistics.filter(
        t => this.checkTemplates[t.id]
      );
      this.datacollection = {
        labels: this.listWeeks.reduce((labels, week) => {
          return [...labels, week.name];
        }, []),
        datasets: reformatStatistics
      };
    }
  },
  mounted() {
    const today = dayjs();
    this.$store
      .dispatch("organization/setAllStatistic", {
        start: dayjs()
          .subtract(3, "month")
          .set("day", 1),
        end:
          today.get("day") === 0
            ? today
            : dayjs()
                .add(1, "week")
                .set("day", 0)
      })
      .then(() => {
        this.$store.dispatch("organization/setTemplateSessions").then(() => {
          this.loading = false;
          this.fillData();
        });
      });
  },
  watch: {
    period(newVal) {
      const end =
        dayjs().get("day") === 0
          ? dayjs()
          : dayjs()
              .add(1, "week")
              .set("day", 0);
      let start;
      switch (newVal) {
        case STATISTIC.THREE_MONTHS:
          start = dayjs()
            .subtract(3, "month")
            .set("day", 1);
          break;
        case STATISTIC.SIX_MONTHS:
          start = dayjs()
            .subtract(6, "month")
            .set("day", 1);
          break;
        case STATISTIC.ONE_YEAR:
          start = dayjs()
            .subtract(1, "year")
            .set("day", 1);
          break;
        default:
          start = dayjs()
            .subtract(1, "month")
            .set("day", 1);
          break;
      }
      this.$store
        .dispatch("organization/setAllStatistic", {
          start: start,
          end: end
        })
        .then(() => {
          this.loading = false;
          this.fillData();
        });
    }
  }
};
</script>

<style lang="scss">
.OrganizationTemplateList-header {
  align-items: initial;
  @media (max-width: $mobile) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
}

.OrganizationStatistic {
  display: flex;
  @media (max-width: $tablet) {
    flex-direction: column;
  }
  &-templates {
    display: flex;
    flex-direction: column;
    width: 200px;
    @media (max-width: $tablet) {
      order: 1;
      padding: 0rem 2rem;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 1rem;
      > div {
        width: 50%;
        @media (max-width: $mobile) {
          width: 100%;
        }
      }
    }
  }
  &-chart {
    flex-grow: 1;
  }
}
</style>