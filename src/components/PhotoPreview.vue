<template>
    <Teleport to="#modals">
        <div class="modal modal-wrapper" @keydown.esc="handleEscape">
            <Transition name="modal">
                <div v-if="open" class="modal-content" @click="zoomed = true" :style="{'--photo-width': photo.width + 'px', '--photo-height': photo.height + 'px', '--aspect': `${photo.width}/${photo.height}`}">
                    <!-- will be placed at a higher index than the small photo -->
                    <img class="image" :src="photo?.urls?.regular" :alt="photo.alt_description" />

                    <!-- already loaded for homepage, allows us to see dimensions, to prevent Content Layout Shift -->
                    <img class="image small-photo" :src="photo?.urls?.small" :alt="photo.alt_description" />

                    <div class="text-content">
                        <span class="photographer">{{ creatorName }}</span>
                        <span class="country">{{ photo.user.location }}</span>
                    </div>
                </div>
            </Transition>

            <div v-if="open" class="modal-backdrop" @click="closeModal"></div>
        </div>
    </Teleport>
</template>

<script setup>
import useLockScroll from '@/composables/useLockScroll'
import { computed, ref } from 'vue'

const { photo, open } = defineProps({
    photo: Object,
    open: Boolean
})
const emit = defineEmits(['closeView'])

useLockScroll(() => open)

function closeModal() {
    emit('closeView')
}

function handleEscape() {
    if (!open) return

    closeModal()
}

const creatorName = computed(() => `${photo?.user?.first_name} ${photo?.user?.last_name || ''}`);

const zoomed = ref(true);
</script>

<style lang="scss" scoped>
@import '@/css/mixins.scss';
@import '@/css/variables.scss';

.modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    pointer-events: none;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: all;
}

.modal-content {
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    z-index: 20;
    pointer-events: all;

    // prioritize full photo preview, without cropping
    width: fit-content;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 'image' 'content';
}

.image {
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    grid-area: image;
    aspect-ratio: var(--aspect);

    // defense for very long photos
    max-height: calc(var(--vh, 1vh) * 80); // => 80vh

    &.small-photo {
        z-index: 10;
    }

    &:not(.small-photo) {
        z-index: 20;
    }
}

.text-content {
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    text-transform: capitalize;
    grid-area: content;

    .photographer {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--app-grey-foreground);
    }

    .country {
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--app-grey-muted);
    }

    @media screen and (min-width: $layout-breakpoint-tablet) {
        height: 100px;
        padding: 0 30px;
        gap: 5px;

        .photographer {
            font-size: 1.5rem;
        }

        .country {
            font-size: 0.9rem;
        }
    }
}

.modal-enter-active {
    transition: all var(--speed-2) var(--ease-out-quad);
}

.modal-leave-active {
    transition: all var(--speed-1) var(--ease-out-quad);
}

.modal-enter-from,
.modal-leave-to {
    transform: translateY(20px);
    opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
    transform: translateY(0px);
    opacity: 1;
}
</style>
