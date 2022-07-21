<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 文章列表 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item @click.native="goDetial(obj.art_id)" @disLikeArtFn="disLikeArtFn" v-for="obj in articleList" :key="obj.art_id" :artObj="obj" @reportArt="reportArt" ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getArticlesAPI, disLikeArt, reportArt } from '@/api'
import { Toast, Notify } from 'vant'
export default {
  props: {
    aid: Number
  },
  data () {
    return { articleList: [], finished: false, loading: false, timestamp: Date.now(), isLoading: false }
  },
  // async created () {
  //   const res2 = await getArticlesAPI({ channel_id: this.aid })
  //   this.articleList = res2.data.data.results
  //   this.timestamp = res2.data.data.pre_timestamp
  // },
  components: {
    ArticleItem
  },
  methods: {
    onLoad () {
      this.getList({ isRef: false })
    },
    async getList ({ isRef = false }) {
      const res2 = await getArticlesAPI({ channel_id: this.aid, timestamp: this.timestamp })
      this.timestamp = res2.data.data.pre_timestamp
      if (isRef) {
        this.articleList = []
        this.isLoading = false
        Toast('刷新成功')
      }
      this.articleList = [...this.articleList, ...res2.data.data.results]
      this.loading = false
      if (res2.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.timestamp = Date.now()
      this.getList({ isRef: true })
    },
    async disLikeArtFn (art_id) {
      try {
        await disLikeArt(art_id)
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        console.log('执行了')
        Notify({ type: 'danger', message: '反馈失败' })
      }
    },
    async reportArt ({ id, type }) {
      try {
        await reportArt({ id, type })
        Notify({ type: 'success', message: '举报成功' })
      } catch (error) {
        Notify({ type: 'danger', message: '举报失败' })
      }
    },
    goDetial (id) {
      this.$router.push(`/art-detial?article_id=${id}`)
    }
  }
}
</script>
