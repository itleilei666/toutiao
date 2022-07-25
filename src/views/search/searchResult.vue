<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索结果 -->
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <article-item @click.native="goDetial(obj.art_id)" v-for="obj in articleList" :key="obj.art_id" :artObj="obj" :isShow="false"></article-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import ArticleItem from '../../components/ArticleItem.vue'
import { getSearchResultAPI } from '@/api'
export default {
  name: 'SearchResult',
  data () {
    return {
      q: this.$route.params.key,
      page: 1,
      per_page: 10,
      articleList: [],
      loading: false,
      finished: false
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await getSearchResultAPI({
      q: this.q
    })
    this.articleList = res.data.data.results
  },
  methods: {
    async onLoad () {
      if (this.articleList.length > 0) {
        this.page++
        const res = await getSearchResultAPI({
          q: this.q,
          page: this.page
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.articleList = [...this.articleList, ...res.data.data.results]
        this.loading = false
      }
    },
    goDetial (id) {
      this.$router.push(`/art-detial?article_id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
