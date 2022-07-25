// 请求接口封装模块
import axios from '@/utils/request'
// 频道-获取所有频道数据
export const getPinDaoList = async () => {
  return await axios({
    url: '/v1_0/channels'
  })
}

// 频道-获取用户频道列表
export const getUserChannels = async () => {
  return await axios({
    url: '/v1_0/user/channels'
  })
}
// 频道-获取所有频道列表
export const getAllChannels = async () => {
  return await axios({
    url: '/v1_0/channels'
  })
}
// 频道-更新用户频道
export const updateUserChannels = async ({ channels }) => {
  return await axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }

  })
}
