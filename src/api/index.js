// 请求接口封装模块
import axios from '@/utils/request'
import { getToken } from '@/utils/token'

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

// 文章-获取指定频道的文章列表
export const getArticlesAPI = async ({ channel_id, timestamp = Date.now() }) => {
  return await axios({
    url: '/v1_0/articles',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      channel_id,
      timestamp: timestamp
    }
  })
}
// 文章-反馈不感兴趣的文章
export const disLikeArt = async (art_id) => {
  return await axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}
// 文章-举报文章
export const reportArt = async ({ id, type }) => {
  return await axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    data: {
      target: id,
      type,
      remark: '其他问题'
    }
  })
}
