<template>
    <li class="photo-card" :class="{ open: viewingPhoto }" :style="computedStyle" @click="toggleViewing" role="button">
        <img class="photo-image" :src="photo?.urls?.small" :alt="photo.alt_description" />

        <div class="photo-details">
            <span class="photographer heading">{{ creatorName }}</span>
            <span class="country body">{{ photo.user.location }}</span>
        </div>

        <PhotoPreview :photo="photo" :open="viewingPhoto" @close-view="toggleViewing" />
    </li>
</template>

<script setup>
import PhotoPreview from "@/components/PhotoPreview.vue"

import { computed, ref } from 'vue';

const { photo, index } = defineProps({
    photo: Object,
    index: Number,
})

const creatorName = computed(() => `${photo?.user?.first_name} ${photo?.user?.last_name || ''}`);

const viewingPhoto = ref(false);

function toggleViewing() {
    viewingPhoto.value = !viewingPhoto.value;
}

const computedStyle = computed(() => {
    return {
        '--card-animation-delay': `${index * 0.08}s`,
        '--photo-width': photo.width,
        '--photo-height': photo.height,
        '--photo-color': photo.color
    }
}) 
</script>

<style lang="scss" scoped>
@import "./PhotoCard.scss";

.photo-card {
    aspect-ratio: var(--photo-width) / var(--photo-height);
    background-color: var(--photo-color);
}

.photo-card.open {
    filter: blur(5px);
}
</style>