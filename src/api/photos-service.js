import axios from 'axios'

// accessible throug network tab;
const ACCESS_KEY = 'DkfpJadY0yfdjqNZ6W0VjiCDFsX3N07fXq877EBDMS4'
const API_BASE = 'https://api.unsplash.com/'

const unsplash = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`
  }
})

const errorMessages = {
  defaultPhotos: 'Error fetching default photos'
}

export default class PhotoService {
  static async pullPhotos(query = '', count = 8) {
    try {
      const response = await unsplash.get('/search/photos', {
        params: {
          query,
          per_page: count
        }
      })
      return response.data
    } catch (err) {
      // throw out a toast instead;
      console.log(errorMessages.defaultPhotos)
    }
  }
}
