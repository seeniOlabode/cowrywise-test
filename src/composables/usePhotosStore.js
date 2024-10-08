// module considered too small to spin up a Pinia Instance;

import { ref } from 'vue'
import PhotoService from '@/api/photos-service'

const photos = ref([])

const photosLoading = ref(false)
let photosLoadingTimeout

async function getPhotos(query = 'African', count = 8) {
  // reset photos
  photos.value = []

  clearTimeout(photosLoadingTimeout)

  // Delay showing the loading state, avoid glitching if it loads too fast
  photosLoadingTimeout = setTimeout(() => {
    photosLoading.value = true
  }, 200)

  const response = await PhotoService.pullPhotos(query, count)

  photos.value = response

  clearTimeout(photosLoadingTimeout)

  photosLoading.value = false
}

export default function usePhotosStore(searchString = 'African') {
  getPhotos(searchString)
  return { photos, getPhotos, photosLoading }
}
