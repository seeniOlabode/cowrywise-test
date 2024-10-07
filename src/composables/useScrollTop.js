import { onMounted, ref } from 'vue'

function checkIfAtTop() {
  return window.scrollY < 30
}

export default function useScrollTop() {
  const scrollTop = ref(false)

  onMounted(() => {
    window.addEventListener('scroll', () => {
      scrollTop.value = checkIfAtTop()
    })

    scrollTop.value = checkIfAtTop()
  })

  return scrollTop
}
