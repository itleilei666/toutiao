import axios from 'axios'
const axiosObj = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
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
