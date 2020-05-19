<template>
  <section class="PresentationHomeFunctionnality">
    <article class="PresentationHomeFunctionnality-session">
      <div class="PresentationHomeFunctionnality-info">
        <h3 class="title is-4">{{ $t('presentation.home.functionnality.session.title') }}</h3>
        <p>{{ $t('presentation.home.functionnality.session.message') }}</p>
      </div>
      <img src="~@/assets/calendar.png" />
    </article>
    <article class="PresentationHomeFunctionnality-forum">
      <div class="PresentationHomeFunctionnality-info">
        <h3 class="title is-5">{{ $t('presentation.home.functionnality.forum.title') }}</h3>
        <p>{{ $t('presentation.home.functionnality.forum.message') }}</p>
      </div>
      <img src="~@/assets/forum.png" />
    </article>
    <article class="PresentationHomeFunctionnality-stat">
      <div class="PresentationHomeFunctionnality-info">
        <h3 class="title is-5">{{ $t('presentation.home.functionnality.stats.title') }}</h3>
        <p>{{ $t('presentation.home.functionnality.stats.message') }}</p>
      </div>
      <img src="~@/assets/stats.png" />
    </article>
  </section>
</template>

<script>
"use strict";

export default {
  name: "PresentationHomeFunctionnality"
};
</script>

<style lang="scss">
.PresentationHomeFunctionnality {
  background-color: $white-bis;
  display: flex;
  flex-direction: column;
  > article {
    max-width: 960px;
    width: 100%;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 650px) {
      flex-direction: column;
    }
    > img {
      max-width: 300px;
    }
  }
  &-forum {
    flex-direction: row-reverse;
  }
  &-info {
    width: 30%;
    @media (max-width: 650px) {
      flex-direction: column-reverse;
      margin: 1rem 0;
      width: 80%;
    }
  }
}
</style>
