<template>
  <div class="page-wrapper">
    <HeaderSearch v-model="searchString" :is-search-page="true" :search-string="searchString" :loading="photosLoading" />
    <main class="search-page root-page" :class="{ 'header-collapsed': !scrollTop }">
      <PhotosList :photos="photos" :loading="photosLoading" />
    </main>
  </div>
</template>

<script setup>
import PhotosList from "@/components/PhotosList.vue";
import usePhotosStore from "@/composables/usePhotosStore";
import HeaderSearch from "@/components/HeaderSearch.vue";

import {watch, computed } from "vue";
import { useRoute } from "vue-router";
import useScrollTop from "@/composables/useScrollTop";

const route = useRoute();
const searchString = computed(() => route.query.search)

const { photos, getPhotos, photosLoading } = usePhotosStore(route.query.search);

watch(searchString, (value) => {
    getPhotos(value || 'Africa', 10);
}, {immediate: true})

const scrollTop = useScrollTop();

</script>

<style scoped lang="scss">
@import "@/css/variables.scss";

.page-wrapper {
  --header-offset: 200px;
}

.search-page {
  position: relative;
  z-index: 20;
  transform: translateY(calc(var(--header-offset) - 100px));
}


@media screen and (min-width: $layout-breakpoint-tablet) {
  .page-wrapper {
  --header-offset: 300px;
}
}
</style>