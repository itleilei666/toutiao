import axios from '@/utils/request'
import { getToken } from '@/utils/token'
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

// 文章-获取文章详情
export const getArtDetailAPI = async (article_id) => {
  return await axios({
    url: `/v1_0/articles/${article_id}`
  })
}

// 文章-关注用户
export const userfollowingsAPI = async (userId) => {
  return await axios({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target: userId }
  })
}

// 文章-取消用户关注
export const unUserfollowingsAPI = async (userId) => {
  return await axios({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}
// 文章-点赞
export const artLiking = async (target) => {
  return await axios({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 文章-取消点赞
export const unArtLiking = async (target) => {
  return await axios({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 文章-获取文章评论
export const getArtCommentsAPI = async ({ offset = null, limit = 10, artId }) => {
  return await axios({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      offset,
      limit,
      source: artId
    }
  })
}
// 文章-评论点赞
export const comLiking = async (target) => {
  return await axios({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 文章-评论取消点赞
export const unComLiking = async (target) => {
  return await axios({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
// 文章-发布评论
export const putCommentAPI = async ({ target, art_id = null, content }) => {
  return await axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id
    }
  })
}
