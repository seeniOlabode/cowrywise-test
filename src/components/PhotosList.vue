<template>
    <ul v-if="!loading" class="photos-list" :style="{ '--photos-count': photos.length }" ref="PhotosList">
        <PhotoCard  v-for="(photo, i) in photos" :key="photo.id" :photo="photo" :index="i" />
    </ul>

    <ul v-else class="photos-list loading" style="--photos-count: 8">
      <PhotoCardLoading v-for="i in 10" :key="i" />
    </ul>
</template>

<script setup>
import PhotoCard from "@/components/PhotoCard/PhotoCard.vue";
import PhotoCardLoading from "@/components/PhotoCard/PhotoCardLoading.vue" ;

import { ref } from "vue";
import useLockScroll from "@/composables/useLockScroll";

const { photos, loading } = defineProps({
  photos: Array,
  loading: Boolean,
})

const PhotosList = ref(null);

useLockScroll(() => loading);
</script>

<style lang="scss">
@import "@/css/variables.scss";

.photos-list {
  overflow: hidden;
  width: 100%;
  padding: 0 15px;
}

.photos-list .photo-card:not(:first-child) {
    margin-top: 20px;
}

@media screen and (min-width: $layout-breakpoint-tablet) {
  .photos-list {
    column-count: 2;
  }

  .photos-list .photo-card:not(:first-child, :nth-child(6)) {
    margin-top: 20px;
  }
}

@media screen and (min-width: $layout-breakpoint-desktop) {
  .photos-list {
    column-count: 3;
  }

  .photos-list .photo-card:not(:first-child, :nth-child(6)) {
    margin-top: 20px;
  }
}
</style>