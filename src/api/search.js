import axios from '@/utils/request'
// 搜索-获取联想建议
export const getSuggestion = async ({ keywords }) => {
  return await axios({
    url: '/v1_0/suggestion',
    params: {
      q: keywords
    }
  })
}

// 搜索-获取搜索结果
export const getSearchResultAPI = async ({
  page = 1, per_page = 10, q
}) => {
  return axios({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
