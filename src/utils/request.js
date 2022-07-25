import axios from 'axios'
// import router from '@/router'
import Notify from '@/ui/notify.js'
import { getToken, removeToken, setToken } from './token'
import { getNewToken } from '../api'
import router from '@/router'

const axiosObj = axios.create({
  baseURL: 'http://geek.itheima.net'
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
}, async function (error) {
  // 对响应错误做点什么 401,501
  // console.log(error.response.status)
  // console.log(11111)
  if (error.response.status === 401) {
    // Notify({ type: 'warning', message: '身份认证已经过期，请重新登录' })
    removeToken()
    // 刷新token
    const res = await getNewToken()
    // 更新本地token
    setToken(res.data.data.token)
    error.config.headers.Authorization = `Bearer ${getToken()}`
    // 执行上一次操作
    return axios(error.config)
    // router.replace('/login')
    // console.log(res)
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    Notify({ type: 'warning', message: '身份认证已经过期，请重新登录' })
    router.push(`/login?path=${router.currentRoute.fullPath}`)
  }
  return Promise.reject(error)
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
