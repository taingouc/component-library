import mockRequest from './mockRequest'

export const getSwiperList = () => {
  return mockRequest.get('/swiper')
}
export const getNewsList = (num) => {
  return mockRequest.post('/news', { num })
}
