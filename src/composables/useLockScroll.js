import { watch, onBeforeUnmount } from 'vue'

function toggleBodyScroll(shouldLock = false) {
  document.body.style.overflow = shouldLock ? 'hidden' : ''
}

export default function useLockScroll(locked) {
  watch(locked, toggleBodyScroll, { immediate: true })

  // reset
  onBeforeUnmount(toggleBodyScroll)
}
