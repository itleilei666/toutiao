<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search @search="goSearch(kw)" @input="input" v-model.trim="kw" v-autoFocus placeholder="请输入搜索关键词"
        background="#007BFF" shape="round" />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div @click="goSearch(item)" v-html="lightShow(item, kw)" class="sugg-item"
        v-for="(item, index) in suggestionList" :key="index">

      </div>
    </div>
    <!-- 搜索历史 -->
    <div v-else class="search-history">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history=[]" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span @click="goSearch(item)" class="history-item" v-for="(item, index) in history" :key="index">{{ item
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null,
      suggestionList: [],
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  methods: {
    input () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.suggestionList = []
        if (this.kw.length === 0) return
        const res = await getSuggestion({ keywords: this.kw })
        this.suggestionList = res.data.data.options
      }, 300)
    },
    lightShow (str, char) {
      if (str) {
        const reg = new RegExp(`${char}`, 'ig')
        return str.replaceAll(reg, (match) => {
          return `<span style="color:red">${match}</span>`
        })
      }
    },
    goSearch (str) {
      if (str && str.length > 0) {
        if (this.history.findIndex(item => item === str) === -1) {
          this.history.push(str)
        }
        setTimeout(() => {
          this.$router.push({
            path: `/search-res/${str}`
          })
        })
      }
    }
  },
  watch: {
    history: {
      deep: true,
      handler (newV) {
        localStorage.setItem('his', JSON.stringify(newV))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;

  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }

  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;

  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
