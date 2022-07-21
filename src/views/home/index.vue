<!-- 组件结构 -->
<template>
  <div id="app">
    <van-nav-bar left-arrow fixed>
      <template #left>
        <img src="@/assets/logo.png" class="logo" alt="">
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <!-- 编辑频道图标 -->
    <van-icon @click="showPopup" name="plus" size="0.37333334rem" class="moreChannels" />
    <van-popup class="popupDig" v-model="show">
      <channelEditVue ref="channelEditVue" @closeFn="closeFn" @delMyPD="delMyPD" @addPD="addPD" :userPD="channels" v-model="active" :unPD="unCheckChannels"></channelEditVue>
    </van-popup>
    <!-- 内容列表 -->
    <div class="main">
      <van-tabs v-model="active" :sticky="true" offset-top="1.2rem">
        <van-tab v-for="obj in channels" :title="obj.name" :key="obj.id" :name="obj.id">
          <article-list-vue :aid="obj.id"></article-list-vue>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<!-- 组件程序 -->
<script>
import { getUserChannels, getAllChannels, updateUserChannels } from '@/api'
import ArticleListVue from './components/ArticleList.vue'
import channelEditVue from './channelEdit.vue'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      allChannels: [],
      articleList: [],
      show: false
    }
  },
  async created () {
    const res = await getUserChannels()
    const res2 = await getAllChannels()
    this.channels = res.data.data.channels
    this.allChannels = res2.data.data.channels
  },
  components: {
    ArticleListVue, channelEditVue
  },
  methods: {
    showPopup () {
      this.show = true
    },
    async addPD (obj) {
      this.channels.push(obj)
      await updateUserChannels({ channels: this.channels })
    },
    async delMyPD (obj) {
      const index = this.channels.findIndex(item => item.id === obj.id)
      this.channels.splice(index, 1)
      await updateUserChannels({ channels: this.channels })
    },
    closeFn () {
      this.show = false
      this.$refs.channelEditVue.isEdit = false
    }
  },
  computed: {
    unCheckChannels () {
      return this.allChannels.filter(big => {
        const index = this.channels.findIndex(small => {
          return big.id === small.id
        })
        if (index === -1) {
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>
<!-- 组件样式 -->
<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}

.main {
  padding-top: 50px;
}

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

.popupDig {
  width: 100vw;
  height: 100vh;
}
</style>
