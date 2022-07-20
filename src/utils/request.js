import axios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from './token'

const axiosObj = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
// 添加请求拦截器
axiosObj.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axiosObj.interceptors.response.use(function (response) {
  // 对响应数据做点什么  201,301
  return response
}, function (error) {
  // 对响应错误做点什么 401,501
  // console.log(error.response.status)
  // console.log(11111)
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份认证已经过期，请重新登录' })
    router.replace('/login')
  }
})

export default ({ url, method = 'get', params, headers, data }) => {
  return axiosObj({
    method,
    data,
    url,
    params,
    headers
  })
}
