// 请求接口封装模块
import axios from '@/utils/request'

export const getPinDaoList = async () => {
  return await axios({
    url: '/v1_0/channels'
  })
}

// 登录请求
export const loginTo = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}
