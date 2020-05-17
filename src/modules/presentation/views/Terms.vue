<template>
  <TemplateInfo>
    <TermsFr v-if="this.$i18n.locale === 'fr'" />
    <TermsEn v-else />
  </TemplateInfo>
</template>

<script>
"use strict0";

import TemplateInfo from "@core/template/TemplateInfo";

import TermsEn from "@presentation/components/terms/TermsEn";
import TermsFr from "@presentation/components/terms/TermsFr";

export default {
  name: "PresentationLegalTerm",
  components: {
    TemplateInfo,
    TermsEn,
    TermsFr
  }
};
</script>

<style lang="scss">
.Terms {
  h1 {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 1rem;
  }
  section {
    margin-bottom: 2rem;
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    p {
      margin-bottom: 0.5rem;
    }
    ul {
      margin-left: 1rem;
    }
    li {
      list-style: initial;
      padding-bottom: 0.3rem;
    }
  }
}
</style>
