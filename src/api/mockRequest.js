import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
const mockRequest = axios.create({
  baseURL: '/mock',
  timeout: 5000
})
mockRequest.interceptors.request.use((config) => {
  nProgress.start()
  return config
})
mockRequest.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default mockRequest
