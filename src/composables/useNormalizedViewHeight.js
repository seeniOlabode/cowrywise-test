// fixes iOS vh to prevent janky scroll on mobile phones

import { onMounted } from 'vue'

let initialized = false

export default function useNormalizedViewHeight() {
  if (initialized) return

  function setVh() {
    const oneVh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${oneVh}px`)
  }

  onMounted(() => {
    window.addEventListener('resize', setVh)
    setVh()
  })

  // prevent multiple
  initialized = true
}
