import api from "@/utils/api";
import * as types from "@/utils/types";
import axios from "axios";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { TEMPLATE_SESSION_STATUS } from "@/utils/consts";

export default {
  namespaced: true,
  state: {
    organization: null,
    typeSessions: [],
    sessions: [],
    categoriesForum: [],
    templateSessions: [],
    statistics: [],
    addresses: [],
  },
  getters: {
    organization: (state) => state.organization,
    organizationMembers: (state) => state.organization.members,
    typeSessions: (state) => state.typeSessions,
    templateSessions: (state) => state.templateSessions,
    sessions: (state) => state.sessions,
    categoriesForum: (state) => state.categoriesForum,
    statistics: (state) => state.statistics,
    addresses: (state) => state.addresses,
  },
  actions: {
    setOrganization({ commit, dispatch }, id) {
      return api
        .get(`organization/${id}/manage`, {}, { errorRedirect: true })
        .then((organization) => {
          dispatch("core/getMember", organization.data.id, { root: true }).then(
            () => {
              commit(types.ORG_SET_ORGANIZATION, organization.data);
            }
          );
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    editOrganization({ commit, state }, name) {
      return api
        .put(
          `organization/${state.organization.id}`,
          { name },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_ORGANIZATION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    archiveOrganization({ state }) {
      return api
        .delete(
          `organization/${state.organization.id}/archive`,
          {},
          { errorMessage: true }
        )
        .then(() => {
          return Promise.resolve();
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    updateCardOrganization({ state }, { token }) {
      return api
        .put(
          `organization/${state.organization.id}/card`,
          {
            token,
          },
          { errorMessage: true }
        )
        .then(() => {
          return Promise.resolve();
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    changeRight({ commit }, { id, role }) {
      return api
        .put(
          `member/${id}`,
          {
            role,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_CHANGE_MEMBER_ROLE, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addMemberAndUser(
      { commit },
      { organizationId, email, firstName, lastName, role, lang }
    ) {
      return api
        .post(
          "member/user",
          {
            idOrganization: organizationId,
            email,
            firstName,
            lastName,
            role,
            lang,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_MEMBER, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addMember({ commit }, { organizationId, userId }) {
      return api
        .post(
          "member/",
          {
            idOrganization: organizationId,
            idUser: userId,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_MEMBER, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    removeMember({ commit }, id) {
      return api
        .delete(`member/${id}`, {}, { errorMessage: true })
        .then(() => {
          commit(types.ORG_REMOVE_MEMBER, id);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setTypeSessions({ commit, state }) {
      return api
        .get(
          `organization/${state.organization.id}/type-session/`,
          {},
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_TYPE_SESSIONS, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addTypeSession({ commit, state }, { name }) {
      return api
        .post(
          "type-session/",
          {
            name,
            organizationId: state.organization.id,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_TYPE_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    editTypeSession({ commit }, { name, id }) {
      return api
        .put(
          `type-session/${id}`,
          {
            name,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_TYPE_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    deleteTypeSession({ commit }, id) {
      return api
        .put(
          `type-session/${id}`,
          {
            name,
          },
          { errorMessage: true }
        )
        .then(() => {
          commit(types.ORG_DELETE_TYPE_SESSION, id);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setSessions({ commit, state }, { minDate, maxDate }) {
      return api
        .get(
          `organization/${state.organization.id}/session/`,
          {
            minDate: dayjs(minDate).format("YYYY-MM-DD"),
            maxDate: dayjs(maxDate).format("YYYY-MM-DD"),
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_SESSIONS, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addSession(
      { commit, state },
      {
        title,
        description,
        typeSessionId,
        periodicity,
        limit,
        startHour,
        endHour,
        date,
      }
    ) {
      return api
        .post(
          "session/",
          {
            title,
            description,
            sessionDate: dayjs(date).format("YYYY-MM-DD"),
            typeSessionId,
            startHour: dayjs(startHour).format("HH:mm:ssZ"),
            endHour: dayjs(endHour).format("HH:mm:ssZ"),
            periodicity,
            organizationId: state.organization.id,
            limit,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_SESSIONS, data.sessions);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addSessionMultiple(
      { commit, state },
      {
        title,
        description,
        typeSessionId,
        periodicity,
        day,
        limit,
        startHour,
        endHour,
        periods,
      }
    ) {
      return api
        .post(
          "session/",
          {
            title,
            description,
            periods,
            typeSessionId,
            startHour: dayjs(startHour).format("HH:mm:ssZ"),
            endHour: dayjs(endHour).format("HH:mm:ssZ"),
            periodicity,
            day,
            organizationId: state.organization.id,
            limit,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_SESSIONS, data.sessions);
          commit(types.ORG_ADD_TEMPLATE_SESSION, data.templateSession);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addSessionsFromTemplate({ state, commit }, { templateId, periods }) {
      return api
        .post(
          "session/fromTemplate",
          {
            periods,
            organizationId: state.organization.id,
            templateId,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_SESSIONS, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    editSession(
      { commit },
      { title, description, start, end, date, typeSessionId, limit, id }
    ) {
      return api
        .put(`session/${id}`, {
          title,
          description,
          start: dayjs(start).format("HH:mm:ssZ"),
          end: dayjs(end).format("HH:mm:ssZ"),
          sessionDate: dayjs(date).format("YYYY-MM-DD"),
          typeSessionId,
          limit,
        })
        .then(({ data }) => {
          commit(types.ORG_EDIT_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    deleteSession({ commit }, id) {
      return api
        .delete(`session/${id}`)
        .then(() => {
          commit(types.ORG_DELETE_SESSION, id);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setForum({ commit, state }) {
      return api
        .get(
          `organization/${state.organization.id}/forum/category/`,
          {},
          { errorRedirect: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_FORUM, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addCategoryForum({ commit, state }, { title }) {
      return api
        .post(
          `organization/${state.organization.id}/forum/category/`,
          {
            title,
          },
          {
            errorMessage: true,
          }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_FORUM_CATEGORY, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    editForumCategory({ commit, state }, { id, title, position }) {
      return api
        .put(
          `organization/${state.organization.id}/forum/category/${id}`,
          {
            id,
            title,
            position,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_FORUM_CATEGORY, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    deleteForumCategory({ commit, state }, id) {
      return api
        .delete(
          `organization/${state.organization.id}/forum/category/${id}`,
          {},
          { errorMessage: true }
        )
        .then(() => {
          commit(types.ORG_DELETE_FORUM_CATEGORY, id);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setPositionForumCategory({ commit, state }, categories) {
      return api
        .put(
          `organization/${state.organization.id}/forum/category/`,
          {
            categories: categories.reduce((list, category, index) => {
              return (list = [
                ...list,
                {
                  id: category.id,
                  title: category.title,
                  position: index,
                },
              ]);
            }, []),
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_FORUM_CATEGORY_POSITION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addSubjectForum({ commit, state }, { title, idCat }) {
      return api
        .post(
          `organization/${state.organization.id}/forum/subject/`,
          {
            title: title,
            idCategory: idCat,
          },
          {
            errorMessage: true,
          }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_FORUM_CATEGORY_SUBJECT, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    editForumSubject({ commit, state }, { title, id, position }) {
      return api
        .put(
          `organization/${state.organization.id}/forum/subject/${id}`,
          {
            id,
            title,
            position,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_FORUM_SUBJECT, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    deleteForumSubject({ commit, state }, { idSubject, idCategory }) {
      return api
        .delete(
          `organization/${state.organization.id}/forum/subject/${idSubject}`,
          {},
          { errorMessage: true }
        )
        .then(() => {
          commit(types.ORG_DELETE_FORUM_SUBJECT, { idSubject, idCategory });
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setPositionForumSubject({ commit, state }, { subjects, idCategory }) {
      return api
        .put(
          `organization/${state.organization.id}/forum/subject/`,
          {
            subjects: subjects.reduce((list, subject, index) => {
              return (list = [
                ...list,
                {
                  id: subject.id,
                  title: subject.title,
                  position: index,
                },
              ]);
            }, []),
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_EDIT_FORUM_SUBJECT_POSITION, {
            subjects: data,
            idCategory,
          });
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setTemplateeSessionsGoing({ commit, state }) {
      return api
        .get(
          `organization/${state.organization.id}/template-session/going`,
          {},
          { errorRedirect: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_TEMPLATE_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setTemplateSessions({ commit, state }) {
      return api
        .get(
          `organization/${state.organization.id}/template-session/`,
          {},
          { errorRedirect: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_TEMPLATE_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addTemplate(
      { commit, state },
      {
        title,
        description,
        typeSessionId,
        periodicity,
        day,
        limit,
        startHour,
        endHour,
      }
    ) {
      return api
        .post(
          "template-session/",
          {
            title,
            description,
            typeSessionId,
            startHour: dayjs(startHour).format("HH:mm:ssZ"),
            endHour: dayjs(endHour).format("HH:mm:ssZ"),
            periodicity,
            day,
            organizationId: state.organization.id,
            limit,
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_ADD_TEMPLATE_SESSION, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    archiveTemplate({ commit }, id) {
      return api
        .put(`template-session/${id}/archive`, {}, { errorMessage: true })
        .then(() => {
          commit(types.ORG_ARCHIVE_TEMPLATE_SESSION, id);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setAllStatistic({ commit, state }, { start, end }) {
      return api
        .post(
          `organization/${state.organization.id}/statistic`,
          {
            start: start.format("YYYY-MM-DD"),
            end: end.format("YYYY-MM-DD"),
          },
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_STATISTIC, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    setAddresses({ commit, state }) {
      return api
        .get(
          `organization/${state.organization.id}/address`,
          {},
          { errorMessage: true }
        )
        .then(({ data }) => {
          commit(types.ORG_SET_ADDRESSES, data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    addAddress(
      { commit, state, dispatch },
      { line1, line2, city, zip, country }
    ) {
      return axios
        .get(
          `https://nominatim.openstreetmap.org/search/${line1}%20${city}%20${zip}%20${country}?format=json&limit=1`
        )
        .then(({ data }) => {
          if (data.length !== 1) {
            dispatch("core.setMessage", "error", { root: true });
            return Promise.reject();
          }
          console.log(data[0]);
          api
            .post(
              `address/`,
              {
                line1,
                line2,
                city,
                zip,
                country,
                latitude: data.lat,
                longitude: data.lon,
                organizationId: state.organization.id,
              },
              { errorMessage: true }
            )
            .then(({ data }) => {
              commit(types.ORG_ADD_ADDRESSE, data);
            })
            .catch((e) => {
              return Promise.reject(e);
            });
        });
    },
  },
  mutations: {
    [types.ORG_SET_ORGANIZATION](state, organization) {
      state.organization = organization;
    },
    [types.ORG_EDIT_ORGANIZATION](state, organization) {
      state.organization.name = organization.name;
    },
    [types.ORG_CHANGE_MEMBER_ROLE](state, { id, role }) {
      const member = state.organization.members.find((m) => m.id === id);
      member.role = role;
    },
    [types.ORG_ADD_MEMBER](state, member) {
      state.organization.members = [...state.organization.members, member];
    },
    [types.ORG_REMOVE_MEMBER](state, id) {
      state.organization.members = state.organization.members.filter(
        (m) => m.id !== id
      );
    },
    [types.ORG_SET_TYPE_SESSIONS](state, typeSessions) {
      state.typeSessions = typeSessions;
    },
    [types.ORG_ADD_TYPE_SESSION](state, typeSession) {
      state.typeSessions.push(typeSession);
    },
    [types.ORG_EDIT_TYPE_SESSION](state, { name, id }) {
      const editedTypeSession = state.typeSessions.find((t) => t.id === id);
      editedTypeSession.name = name;
    },
    [types.ORG_DELETE_TYPE_SESSION](state, id) {
      state.typeSessions = state.typeSessions.filter((t) => t.id !== id);
    },
    [types.ORG_SET_SESSIONS](state, sessions) {
      state.sessions = sessions;
    },
    [types.ORG_ADD_SESSIONS](state, sessions) {
      state.sessions = state.sessions.concat(sessions);
    },
    [types.ORG_EDIT_SESSION](
      state,
      { title, description, start, end, typeSession, id, limit }
    ) {
      const editedSession = state.sessions.find((s) => s.id === id);
      editedSession.title = title;
      editedSession.description = description;
      editedSession.start = start;
      editedSession.end = end;
      editedSession.typeSession = typeSession;
      editedSession.limit = limit;
    },
    [types.ORG_DELETE_SESSION](state, id) {
      state.sessions = state.sessions.filter((s) => s.id !== id);
    },
    [types.ORG_SET_FORUM](state, forum) {
      state.categoriesForum = forum;
    },
    [types.ORG_ADD_FORUM_CATEGORY](state, category) {
      state.categoriesForum.push(category);
    },
    [types.ORG_EDIT_FORUM_CATEGORY](state, { title, position, id }) {
      const categoryForum = state.categoriesForum.find((t) => t.id === id);
      categoryForum.title = title;
      categoryForum.position = position;
    },
    [types.ORG_DELETE_FORUM_CATEGORY](state, id) {
      state.categoriesForum = state.categoriesForum.filter((c) => c.id !== id);
    },
    [types.ORG_EDIT_FORUM_CATEGORY_POSITION](state, catogories) {
      state.categoriesForum = state.categoriesForum.reduce((list, element) => {
        const category = catogories.find((c) => c.id === element.id);
        return (list = [
          ...list,
          {
            subjects: element.subjects || [],
            id: element.id,
            title: category.title,
            position: category.position,
          },
        ]);
      }, []);
    },
    [types.ORG_ADD_FORUM_CATEGORY_SUBJECT](
      state,
      { id, title, position, idCategory }
    ) {
      const categoryForum = state.categoriesForum.find(
        (t) => t.id === idCategory
      );
      categoryForum.subjects.push({ id, title, position });
    },
    [types.ORG_EDIT_FORUM_SUBJECT](state, { title, position, id, idCategory }) {
      const categoryForum = state.categoriesForum.find(
        (t) => t.id === idCategory
      );
      const subject = categoryForum.subjects.find((t) => t.id === id);
      subject.title = title;
      subject.position = position;
    },
    [types.ORG_DELETE_FORUM_SUBJECT](state, { idSubject, idCategory }) {
      const categoryForum = state.categoriesForum.find(
        (t) => t.id === idCategory
      );
      categoryForum.subjects = categoryForum.subjects.filter(
        (c) => c.id !== idSubject
      );
    },
    [types.ORG_EDIT_FORUM_SUBJECT_POSITION](state, { subjects, idCategory }) {
      const categoryForum = state.categoriesForum.find(
        (t) => t.id === idCategory
      );
      categoryForum.subjects = categoryForum.subjects.reduce(
        (list, element) => {
          const subject = subjects.find((c) => c.id === element.id);
          return (list = [
            ...list,
            {
              id: element.id,
              title: subject.title,
              position: subject.position,
            },
          ]);
        },
        []
      );
    },
    [types.ORG_SET_TEMPLATE_SESSION](state, templateSessions) {
      state.templateSessions = templateSessions;
    },
    [types.ORG_ADD_TEMPLATE_SESSION](state, templateSession) {
      state.templateSessions.push(templateSession);
    },
    [types.ORG_ARCHIVE_TEMPLATE_SESSION](state, id) {
      const templateToArchive = state.templateSessions.find((c) => c.id === id);
      templateToArchive.status = TEMPLATE_SESSION_STATUS.ARCHIVE;
    },
    [types.ORG_SET_STATISTIC](state, statistics) {
      state.statistics = statistics;
    },
    [types.ORG_SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [types.ORG_ADD_ADDRESSE](state, address) {
      state.addresses.push(address);
    },
  },
};
