import { ref } from 'vue'
import PhotoService from '@/api/photos-service'

const photos = ref([])

const photosLoading = ref(false)
let photosLoadingTimeout

async function getPhotos(query = 'African', count = 8) {
  // reset photos
  photos.value = []

  clearTimeout(photosLoadingTimeout)

  // Delay showing the loading state, avoid glitching
  photosLoadingTimeout = setTimeout(() => {
    photosLoading.value = true
  }, 200)

  const response = await PhotoService.pullDefaultPhotos(query, count)

  photos.value = response.results

  clearTimeout(photosLoadingTimeout)

  photosLoading.value = false
}

export default function usePhotosStore(searchString = 'African') {
  getPhotos(searchString)
  return { photos, getPhotos, photosLoading }
}
