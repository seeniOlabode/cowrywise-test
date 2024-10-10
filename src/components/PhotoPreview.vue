<template>
  <Teleport to="#modals">
    <div class="modal modal-wrapper" @keydown.esc="handleEscape">
      <Transition name="modal">
        <div
          v-if="open"
          class="modal-content"
          @click="zoomed = true"
          :style="{
            '--photo-width': photo.width + 'px',
            '--photo-height': photo.height + 'px',
            '--aspect': `${photo.width}/${photo.height}`,
            '--color': photo.color
          }"
        >
          <button class="close-modal" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke-width="1"
              stroke="#FFFFFF"
              fill="none"
              stroke-linejoin="arcs"
              stroke-linecap="square"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <rect width="24" height="24" style="stroke: rgba(0, 0, 0, 0)"></rect>
                <path d="M18,6 L6,18 M6,6 L18,18" stroke="#FFFFFF"></path>
              </g>
            </svg>
          </button>

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

const creatorName = computed(() => `${photo?.user?.first_name} ${photo?.user?.last_name || ''}`)

const zoomed = ref(true)
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
  cursor: zoom-out;
}

.modal-content {
  background-color: var(--color);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  z-index: 20;
  pointer-events: all;

  // prioritize full photo preview, without cropping
  width: fit-content;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'image' 'content';

  // blend the color of the modal-content
  // the colors are being pulled from the photo
  // this might mess with the contrast of the preview
  // blend and mix the color to improve the preview and keep the theme
  &::before {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    mix-blend-mode: difference;
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.image {
  // current implementation requires preview photo size to be moderately sized
  width: 100%;
  // worst-case scenario:
  // scale-down to show all parts of photo at all times, especially for safari.
  object-fit: scale-down;
  object-position: 50% 50%;
  grid-area: image;
  aspect-ratio: var(--aspect);

  // defense for very long photos
  max-height: calc(var(--vh, 1vh) * 80); // => 80vh

  &.small-photo {
    z-index: 10;
    @include pulseAnimation(0.7);
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
  background-color: white;
  z-index: 10;

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

// animated in on hover for affordance
// also to encourage user to close modal by clicking outside the preview
.modal-content:hover .close-modal {
  opacity: 1;
}

.close-modal {
  // close button has been positioned within photo for easier reach on full screens;
  // clicking outside the modal content closes it anyway
  position: absolute;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: none;
  right: 20px;
  top: 20px;
  z-index: 30;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition:
    transform 100ms ease-in-out,
    opacity 200ms ease;
  opacity: 0;

  svg {
    position: relative;
    z-index: 10;
  }

  &:hover {
    transform: scale(1.08) translateY(0);
  }

  // always show close button on mobile
  // close button is necessary because of limited screen space.
  // user wouldn't have to find space to clic out of modal
  @media screen and (max-width: $layout-breakpoint-tablet) {
    opacity: 1 !important;
  }
}

@media screen and (max-width: $layout-breakpoint-tablet) {
  .modal-wrapper {
    padding: 0;
    align-items: end;
  }

  // uses bottom sheet on mobile
  .modal-content {
    width: 100vw;
    border-radius: 0;
    bottom: 0;

    .image {
      width: 100vw;
    }

    // button moved to bottom for easier reachability
    .close-modal {
      bottom: 15px;
      top: unset;
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
