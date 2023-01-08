import Axios from 'axios'
import { apiConfig } from '@config/api'
import logHelper from './logHelper'

const { baseUrl, isDebug, defaultTimeout } = apiConfig

const apiInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: defaultTimeout,
  baseURL: baseUrl,
})

const setupInterceptor = (store) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      if (isDebug) {
        const { data, headers, url } = config
        logHelper('Api request', { data, headers, url: baseUrl + url })
      }
      return config
    },
    (error) => {
      if (isDebug) {
        logHelper('Api request error', error)
      }
      return Promise.reject(error)
    }
  )

  apiInstance.interceptors.response.use(
    (response) => {
      try {
        return Promise.resolve(response.data)
      } catch (error) {
        if (isDebug) {
          logHelper('It will be problematic if the server data structure changes', error)
        }
        return Promise.reject(error)
      }
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        // TODO change according project requirement
      }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data?.error || error.response.data)
      }
      return Promise.reject(error)
    }
  )
}

export default apiInstance

export { setupInterceptor }
