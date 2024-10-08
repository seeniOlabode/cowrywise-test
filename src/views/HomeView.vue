<template>
  <div class="home-wrapper">
    <HeaderSearch v-model="searchString" @start-search="startSearch" />
    <main class="search-page root-page" :class="{ 'header-collapsed': !scrollTop }">
      <PhotosList :photos="photos" :loading="photosLoading" />
    </main>
  </div>
</template>

<script setup>
import PhotosList from "@/components/PhotosList.vue";
import usePhotosStore from "@/composables/usePhotosStore";
import HeaderSearch from "@/components/HeaderSearch.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import useScrollTop from "@/composables/useScrollTop";

const searchString = ref('');
const { photos, photosLoading } = usePhotosStore();

const router = useRouter();
function startSearch() {
  if (!searchString.value) return;

  router.push(`/search?search=${searchString.value}`)
}

const scrollTop = useScrollTop();

</script>

<style scoped lang="scss">
@import "@/css/variables.scss";

.home-wrapper {
  --header-offset: 200px;
}

.search-page {
  position: relative;
  z-index: 20;
  transform: translateY(calc(var(--header-offset) - 100px));
}


@media screen and (min-width: $layout-breakpoint-tablet) {
  .home-wrapper {
  --header-offset: 300px;
}
}
</style>