// 请求接口封装模块
import axios from '@/utils/request'

// 用户-登录请求
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
// 用户-获取用户个人资料
export const getUserInfoAPI = async () => {
  return await axios({
    url: '/v1_0/user/profile'
  })
}
// 用户-获取用户基本信息
export const getUserPersonalInfoAPI = async () => {
  return await axios({
    url: '/v1_0/user'
  })
}
// 用户-更改头像
export const setUserHead = async (fd) => {
  return await axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
// 用户-编辑信息
export const setUserEdit = async (user) => {
  return await axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { ...user }
  })
}
// 用户-刷新用户token
export const getNewToken = async () => {
  return await axios({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.refresh_token}`
    }
  })
}
