<template>
  <OrganizationTemplateList
    :title="$t('organization.templateSessions.title')"
    @add="add"
    :loading="loading"
  >
    <BTable :data="goingTemplateSessions" striped paginated :per-page="25">
      <template v-slot="{ row }">
        <BTableColumn
          field="name"
          :label="$t('organization.templateSessions.table.name')"
          sortable
          >{{ row.title }}</BTableColumn
        >
        <BTableColumn
          field="day"
          :label="$t('organization.templateSessions.table.day')"
          >{{ $t(`core.daysNumber[${row.day}]`) }}</BTableColumn
        >
        <BTableColumn
          field="startHour"
          :label="$t('organization.templateSessions.table.startHour')"
          >{{ row.startHour | formatTime }}</BTableColumn
        >
        <BTableColumn
          field="endHour"
          :label="$t('organization.templateSessions.table.endHour')"
          >{{ row.endHour | formatTime }}</BTableColumn
        >
        <BTableColumn class="OrganizationMembers-column-manage" :width="200">
          <OrganizationTemplateSessionsDropdown
            @see="see(row)"
            @archive="archive(row.id)"
            @edit="edit(row)"
          />
        </BTableColumn>
      </template>
    </BTable>
  </OrganizationTemplateList>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import { TEMPLATE_SESSION_STATUS } from "@/utils/consts";

import OrganizationTemplateList from "@organization/templates/OrganizationTemplateList";

import OrganizationTemplateSessionsDropdown from "@organization/components/templateSessions/OrganizationTemplateSessionsDropdown";

import OrganizationTemplateSessionsAdd from "@organization/components/templateSessions/OrganizationTemplateSessionsAdd";
import OrganizationTemplateSessionsSee from "@organization/components/templateSessions/OrganizationTemplateSessionsSee";

export default {
  name: "OrganizationTemplateSessions",
  components: {
    OrganizationTemplateList,
    OrganizationTemplateSessionsDropdown
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters({
      templateSessions: "organization/templateSessions"
    }),
    goingTemplateSessions() {
      return this.templateSessions.filter(
        t => t.status === TEMPLATE_SESSION_STATUS.GOING
      );
    }
  },
  methods: {
    add() {
      this.$store.dispatch("core/openSideBar", {
        component: OrganizationTemplateSessionsAdd
      });
    },
    see(row) {
      this.$store.dispatch("core/openSideBar", {
        component: OrganizationTemplateSessionsSee,
        props: { templateSession: row }
      });
    },
    archive(id) {
      this.$buefy.dialog.confirm({
        title: this.$t("organization.templateSessions.archive.title"),
        message: this.$t("organization.templateSessions.archive.message"),
        confirmText: this.$t("core.utils.archive"),
        cancelText: this.$t("core.utils.cancel"),
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch("organization/archiveTemplate", id).then(() => {
            this.$buefy.toast.open({
              message: this.$t("organization.templateSessions.archive.success"),
              type: "is-primary"
            });
          });
        }
      });
    }
  },
  mounted() {
    this.$store
      .dispatch("organization/setTemplateSessions")
      .then(() => {
        this.$store
          .dispatch("organization/setTypeSessions")
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      })
      .catch(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="scss"></style>
